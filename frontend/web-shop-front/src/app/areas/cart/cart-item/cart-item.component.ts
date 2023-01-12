import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { tap, takeUntil, Subject, take } from 'rxjs';
import { AppActions, AppState } from 'src/app/core/state/app';
import { CartElement } from 'src/app/core/state/app/app.store';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent implements OnInit {
  @Input() cartElementId?: number;
  cartElement?: CartElement

  private readonly _destroy$ = new Subject<void>();

  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  ngOnInit() {

    const getCartElement$ = this.store.select(AppState.cart).pipe(
      tap(cart => this.cartElement = cart.find(c => c.product.id === this.cartElementId)),
      tap(() => this.cdr.markForCheck()),
      takeUntil(this._destroy$)
    )
    getCartElement$.subscribe();

  }

  getSubprice(): number {
    if (!this.cartElement) {
      return 0;
    }
    return this.cartElement?.quantity * this.cartElement?.product.price
  }

  removeItemFromCart() {
    this.store.dispatch(new AppActions.DeleteFromCart(this.cartElement!.product)).pipe(
      tap(() => this.cdr.markForCheck()),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  minusFromCart() {
    this.store.dispatch(new AppActions.ChangeAmountInCart({ product: this.cartElement!.product, quantity: -1 })).pipe(
      tap(() => this.cdr.markForCheck()),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  addMoreToCart() {
    this.store.dispatch(new AppActions.ChangeAmountInCart({ product: this.cartElement!.product, quantity: 1 })).pipe(
      tap(() => this.cdr.markForCheck()),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  getProductImg(): string {
    if (this.cartElement?.product.imgUrl === null) {
      return "/assets/no-image.jpeg";
    }
    return `${environment.apiEndpoint}/products/${this.cartElement?.product.imgUrl}`
  }
}
