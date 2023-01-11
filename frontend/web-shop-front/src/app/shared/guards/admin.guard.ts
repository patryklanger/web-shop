import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/core/state/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(UserState.roles).pipe(
      map(roles => {
        const isAdmin = roles?.includes("admin")
        if (!isAdmin) {
          this.router.navigateByUrl('/404')
        }
        return isAdmin;
      }),
    )
  }

}
