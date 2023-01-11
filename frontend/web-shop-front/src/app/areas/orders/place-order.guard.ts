import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, Observable, tap } from 'rxjs';
import { OrderState } from 'src/app/core/state/order';

@Injectable({
  providedIn: 'root'
})
export class PlaceOrderGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(OrderState.basket).pipe(
      map(basket => {
        const canResolve = basket.length === 0;
        if (canResolve) {
          this.router.navigateByUrl('/404');
        }
        return !canResolve;
      })
    )
  }

}
