import { Injectable } from '@angular/core';
import { AbstractGatewayService } from '../abstract-gateway.service';
import { environment } from '../../../../environments/environment.prod';
import { LoginResponse } from '../../models/auth/login-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGatewayService extends AbstractGatewayService {

  login$(username: string, password: string): Observable<LoginResponse> {
    return this.post$("login", { username: username, password: password })
  }

  refreshToken$(refreshToken: string): Observable<LoginResponse> {
    return this.post$(`refresh-token/${refreshToken}`)
  }

  protected getBaseUrl(): string {
    return `${environment.apiEndpoint}/${this.getResourceName()}`
  }
  protected getResourceName(): string {
    return 'auth';
  }
}
