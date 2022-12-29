import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, tap, takeUntil } from 'rxjs';
import { AppState, CartElement } from 'src/app/core/state/app/app.store';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItems?: CartElement[];
  totalAmount?: number;

  private readonly _destroy$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete()
  }

  ngOnInit() {
    this.store.select(AppState.cart).pipe(
      tap((cart) => this.cartItems = cart),
      tap(() => {
        this.totalAmount = this.cartItems?.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
      }),
      takeUntil(this._destroy$)
    ).subscribe()
  }

}
