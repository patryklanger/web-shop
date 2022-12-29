import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Store } from "@ngxs/store";
import { catchError, filter, Observable, of, Subject, switchMap, takeUntil, tap, throwError } from "rxjs";

import { UserState } from "../state/user";
import { environment } from '../../../environments/environment.prod';
import { UserActions } from 'src/app/core/state/user';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor, OnDestroy {

  private accessToken?: string;
  private isRefreshing = false;

  private readonly _destroy$ = new Subject<void>()

  constructor(private store: Store) {
    this.store.select(UserState.accessToken).pipe(tap(token => this.accessToken = token === null ? undefined : token), takeUntil(this._destroy$)).subscribe()
  }
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(`${environment.apiEndpoint}/auth/login`) || req.url.includes(`${environment.apiEndpoint}/auth/refresh-token`)) {
      return next.handle(req)
    } else {
      const authReq = this.addAuthorizationHeaders(req);
      return next.handle(authReq).pipe(catchError(error => {
        console.log(error);
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error)
      }))
    }
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      return this.store.dispatch(UserActions.RefreshInit).pipe(
        switchMap(() => {
          this.isRefreshing = false;

          return next.handle(this.addAuthorizationHeaders(request));
        }),
        catchError((err) => {
          this.isRefreshing = false;

          return of(err);
        })
      );
    }
    return throwError(() => new Error("Already refreshing!"))
  }

  private addAuthorizationHeaders<T>(request: HttpRequest<T>): HttpRequest<T> {
    if (!this.accessToken) {
      return request;
    }
    else {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.accessToken}`,
        }
      })
    }
  }
}
