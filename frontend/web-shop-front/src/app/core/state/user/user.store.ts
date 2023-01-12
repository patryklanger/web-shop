import jwt_decode from 'jwt-decode';
import { Injectable, NgZone, OnDestroy } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, mergeMap, of, Subject, takeUntil, tap } from "rxjs";

import * as UserActions from "./user.actions";
import { NotificationService } from "../../../shared/notification/notification.service";
import { AuthGatewayService } from "../../gateways/auth/auth-gateway.service";
import { DecodedJwt } from '../../models/auth/decode-jwt.model';
import { CacheService } from '../../../shared/cache/cache.service';
import { AuthUser } from '../../models/auth/auth-user.model';
import { Router } from '@angular/router';

const USER_LOCAL_STORAGE_KEY = "user"

const INITIAL_STATE = {
  username: null,
  roles: null,
  loading: false,
  accessToken: null,
  refreshToken: null,
  error: null
}

export interface UserStateModel extends AuthUser {
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
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  @Selector()
  static isLoggedIn(state: UserStateModel): boolean {
    return !!state.accessToken;
  }

  @Selector()
  static accessToken(state: UserStateModel): string | null {
    return state.accessToken;
  }

  @Selector()
  static state(state: UserStateModel): UserStateModel {
    return state;
  }

  @Selector()
  static roles(state: UserStateModel): string[] | undefined {
    return state.roles?.map(r => r.toLowerCase())
  }

  @Action(UserActions.LoginInit)
  loginInit(ctx: StateContext<UserStateModel>, { payload }: UserActions.LoginInit) {

    ctx.patchState({ loading: true })

    this.authGateway.login$(payload.username, payload.password).pipe(
      mergeMap((e) => ctx.dispatch(new UserActions.LoginSuccess(e))),
      takeUntil(this._destroy$),
      catchError((e: HttpErrorResponse) => of(ctx.dispatch(new UserActions.LoginError(e.error)))),
    ).subscribe()

  }

  @Action(UserActions.LoginSuccess)
  loginSuccess({ setState }: StateContext<UserStateModel>, { payload }: UserActions.LoginSuccess) {
    const user = jwt_decode(payload.access_token) as DecodedJwt
    const newState: AuthUser = {
      username: user.preferred_username,
      roles: user.realm_access.roles,
      refreshToken: payload.refresh_token,
      accessToken: payload.access_token
    }

    setState({
      ...newState,
      loading: false,
      error: null,
    })

    this.cacheService.saveItemToLocalStorage(USER_LOCAL_STORAGE_KEY, newState);
    this.zone.run(() => {
      this.notificationService.showSuccessNotification("Login successful")
    });

  }

  @Action(UserActions.LoginError)
  loginError({ patchState }: StateContext<UserStateModel>, { payload }: UserActions.LoginError) {

    patchState({ username: undefined, roles: undefined, loading: false, error: payload })
    this.zone.run(() => {
      this.notificationService.showSuccessNotification(`${payload}`)
    });

  }

  @Action(UserActions.Logout)
  logout({ setState }: StateContext<UserStateModel>) {

    setState({ ...INITIAL_STATE });
    this.cacheService.deleteItemFromLocalStorage(USER_LOCAL_STORAGE_KEY)

    this.zone.run(() => {
      this.router.navigateByUrl('auth')
    });
    this.zone.run(() => {
      this.notificationService.showSuccessNotification(`Logout successful`)
    });

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
      catchError((e: HttpErrorResponse) => of(ctx.dispatch(new UserActions.Logout()))),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  @Action(UserActions.Restore)
  restore({ setState }: StateContext<UserStateModel>) {

    const user = this.cacheService.getItemFromLocalStorage(USER_LOCAL_STORAGE_KEY) as AuthUser;

    if (!user) {
      return;
    }

    setState({ ...user, error: null, loading: false })

  }
}
