import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UserActions } from 'src/app/core/state/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }
  refreshToken() {
    this.store.dispatch(new UserActions.RefreshInit())
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
