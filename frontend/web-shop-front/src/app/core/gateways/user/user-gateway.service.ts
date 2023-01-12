import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import { AbstractGatewayService } from '../abstract-gateway.service';
import { PaginatedResult } from '../../models/paginatedResult.model';
import { User } from '../../models/user/user.model';
import { RegisterPageFormData } from 'src/app/pages/register/register-page/register-page-form-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserGatewayService extends AbstractGatewayService {

  getUsers$(page = 0, limit = 10): Observable<PaginatedResult<User>> {
    const params = new HttpParams({
      fromObject: {
        page: page,
        limit: limit
      }
    })
    return this.get$("user", params);
  }

  getUser$(id: string): Observable<User> {
    return this.get$(`user/${id}`)
  }

  createUser$(form: RegisterPageFormData): Observable<User> {
    return this.post$('user', form);
  }

  toggleAdmin$(id: string): Observable<User> {
    return this.post$(`user/${id}/toggleAdmin`)
  }

  protected getBaseUrl(): string {
    return `${environment.apiEndpoint}/${this.getResourceName()}`
  }

  protected getResourceName(): string {
    return 'auth';
  }

}
