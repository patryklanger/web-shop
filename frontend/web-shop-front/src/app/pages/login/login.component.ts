import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, takeUntil, tap } from 'rxjs';

import { UserActions, UserState } from 'src/app/core/state/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  isLoggedIn: boolean = false;

  private readonly _destroy$ = new Subject<void>();

  constructor(private store: Store, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.store.select(UserState.isLoggedIn).pipe(
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn),
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

  onFormSubmit() {
    if (!this.formGroup.valid) {
      return;
    }
    this.store.dispatch(new UserActions.LoginInit({ username: this.username?.value, password: this.password?.value }))
  }

  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get("password");
  }

}
