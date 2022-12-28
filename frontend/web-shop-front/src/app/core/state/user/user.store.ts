import jwt_decode from 'jwt-decode';
import { Injectable, OnDestroy } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, mergeMap, of, Subject, takeUntil } from "rxjs";

import * as UserActions from "./user.actions";
import { NotificationService } from "../../../shared/notification/notification.service";
import { AuthGatewayService } from "../../gateways/auth/auth-gateway.service";
import { DecodedJwt } from '../../models/auth/decode-jwt.model';
import { CacheService } from '../../../shared/cache/cache.service';


const INITIAL_STATE = {
  username: null,
  roles: null,
  loading: false,
  accessToken: null,
  refreshToken: null,
  error: null
}

export interface User {
  username: string | null,
  roles: string[] | null,
  accessToken: string | null,
  refreshToken: string | null,
}

export interface UserStateModel extends User {
  loading: boolean,
  error: string | null
}

@State<UserStateModel>({
  name: "user",
  defaults: INITIAL_STATE
})
@Injectable()
export class UserState implements OnDestroy {

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private authGateway: AuthGatewayService,
    private notificationService: NotificationService,
    private cacheService: CacheService,
  ) {}

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  @Selector()
  static isLoggedIn(state: UserStateModel) {
    return !!state.accessToken;
  }

  @Action(UserActions.LoginInit)
  loginInit(ctx: StateContext<UserStateModel>, { payload }: UserActions.LoginInit) {

    ctx.patchState({ loading: true })

    this.authGateway.login$(payload.username, payload.password).pipe(
      mergeMap((e) => ctx.dispatch(new UserActions.LoginSuccess(e))),
      takeUntil(this._destroy$),
      catchError((e: HttpErrorResponse) => of(ctx.dispatch(new UserActions.LoginError(e.error.message)))),
    ).subscribe()

  }

  @Action(UserActions.LoginSuccess)
  loginSuccess({ patchState }: StateContext<UserStateModel>, { payload }: UserActions.LoginSuccess) {

    const user = jwt_decode(payload.access_token) as DecodedJwt

    const newState: Partial<UserStateModel> = {
      username: user.preferred_username,
      roles: user.resource_access['auth-service'].roles,
      refreshToken: payload.refresh_token,
      accessToken: payload.access_token
    }

    patchState({
      ...newState,
      loading: false,
      error: null,
    })

    this.cacheService.saveItemToLocalStorage('user', newState);
    this.notificationService.showSuccessNotification("Login successful")

  }

  @Action(UserActions.LoginError)
  loginError({ patchState }: StateContext<UserStateModel>, { payload }: UserActions.LoginError) {

    patchState({ username: undefined, roles: undefined, loading: false, error: payload })
    this.notificationService.showSuccessNotification(`Login unsuccessful. \n${payload}`)
  }

  @Action(UserActions.Logout)
  logout({ setState }: StateContext<UserStateModel>) {

    setState({ ...INITIAL_STATE });
    this.notificationService.showSuccessNotification(`Logout successful`)
  }

  @Action(UserActions.RefreshInit)
  refreshInit(ctx: StateContext<UserStateModel>) {

    ctx.patchState({ loading: true })

    if (ctx.getState().refreshToken === null) {
      ctx.patchState({ ...INITIAL_STATE, error: "No refresh token!" })
      return;
    }

    this.authGateway.refreshToken$(ctx.getState().refreshToken!).pipe(
      mergeMap((e) => ctx.dispatch(new UserActions.LoginSuccess(e))),
      catchError((e: HttpErrorResponse) => of(ctx.dispatch(new UserActions.LoginError(e.error.message)))),
      takeUntil(this._destroy$)
    ).subscribe()

  }

  @Action(UserActions.Restore)
  restore({ setState }: StateContext<UserStateModel>) {

    const user = this.cacheService.getItemFromLocalStorage('user') as User;

    if (!user) {
      return;
    }

    setState({ ...user, error: null, loading: false })

  }
}
