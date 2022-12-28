import { LoginModel } from "../../../pages/login/login.model"
import { LoginResponse } from "../../models/auth/login-response.model"

const ACTION_PREFIX = "[USER]"

export class LoginInit {
  static readonly type = `${ACTION_PREFIX} Login Init`
  constructor(public payload: LoginModel) {}
}

export class LoginSuccess {
  static readonly type = `${ACTION_PREFIX} Login Success`
  constructor(public payload: LoginResponse) {}
}

export class LoginError {
  static readonly type = `${ACTION_PREFIX} Login Error`
  constructor(public payload: string) {}
}

export class Logout {
  static readonly type = `${ACTION_PREFIX} Logout`
}

export class RefreshInit {
  static readonly type = `${ACTION_PREFIX} Refresh Init`
}

export class Restore {
  static readonly type = `${ACTION_PREFIX} Try to restore from local storage`;
}
