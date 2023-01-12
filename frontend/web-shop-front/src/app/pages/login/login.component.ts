import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';

import { UserActions, UserState } from 'src/app/core/state/user';
import { UserGatewayService } from 'src/app/core/gateways/user/user-gateway.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  loginFailed: string | null = null;

  private readonly _destroy$ = new Subject<void>();

  constructor(private store: Store, private fb: FormBuilder, private userGateway: UserGatewayService, private router: Router) {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.store.select(UserState.state).pipe(
      tap(state => this.loginFailed = state.error),
      takeUntil(this._destroy$)
    ).subscribe()

    this.store.select(UserState.isLoggedIn).pipe(
      filter((loggedIn) => loggedIn),
      tap(() => this.router.navigateByUrl("")),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }


  refreshToken() {
    this.store.dispatch(new UserActions.RefreshInit())
  }

  logout() {
    this.store.dispatch(new UserActions.Logout())
  }

  getUsers() {
    this.userGateway.getUsers$().pipe().subscribe()
  }

  onFormSubmit() {
    if (!this.formGroup.valid) {
      return;
    }
    this.store.dispatch(new UserActions.LoginInit({ username: this.username?.value, password: this.password?.value }));
  }

  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get("password");
  }

}
