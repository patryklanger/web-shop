import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, tap, takeUntil } from 'rxjs';
import { OrderBasketElement } from 'src/app/core/models/order/order-basket-element.model';
import { AppActions } from 'src/app/core/state/app';
import { AppState, CartElement } from 'src/app/core/state/app/app.store';
import { OrderActions } from 'src/app/core/state/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItems: CartElement[];
  totalAmount: number;

  private readonly _destroy$ = new Subject<void>();

  constructor(private store: Store, private router: Router) {}

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete()
  }

  ngOnInit() {
    this.store.dispatch(new AppActions.RefreshCart)
    this.store.select(AppState.cart).pipe(
      tap((cart) => this.cartItems = cart),
      tap((cart) => {
        this.totalAmount = cart.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
      }),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  order() {
    const basket: OrderBasketElement[] = this.cartItems.map(e => {
      return {
        productId: e.product.id,
        amount: e.quantity
      }
    })

    this.store.dispatch(new OrderActions.SaveOrder(basket)).pipe(
      tap(() => this.router.navigateByUrl('/orders/new')),
      takeUntil(this._destroy$)
    ).subscribe()
  }

}
