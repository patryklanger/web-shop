import { Injectable, OnDestroy } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Product } from "../../models/product/product.model";

import * as AppActions from "./app.actions";
import { CacheService } from '../../../shared/cache/cache.service';
import { NotificationService } from '../../../shared/notification/notification.service';
import { ProductGatewayService } from 'src/app/core/gateways/products/product-gateway.service';
import { Subject, tap, takeUntil } from 'rxjs';

export interface CartElement {
  product: Product;
  quantity: number;
}
export interface AppStateModel {
  menuState: boolean;
  cart: CartElement[];
}

@State<AppStateModel>({
  name: "app",
  defaults: {
    menuState: false,
    cart: []
  }
})
@Injectable()
export class AppState implements OnDestroy {
  private readonly _destroy$ = new Subject<void>()

  constructor(private cacheService: CacheService, private notificationService: NotificationService, private productGateway: ProductGatewayService) {}

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  @Selector()
  static menuState(state: AppStateModel): boolean {
    return state.menuState
  }

  @Selector()
  static cartUniqueItemsAmount(state: AppStateModel): number {
    return state.cart.length;
  }

  @Selector()
  static cartItemsAmount(state: AppStateModel): number {
    return state.cart.reduce((acc, item) => acc + item.quantity, 0)
  }

  @Selector()
  static cartItemsValue(state: AppStateModel): number {
    return state.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }

  @Selector()
  static cart(state: AppStateModel): CartElement[] {
    return state.cart;
  }

  @Action(AppActions.MenuToggle)
  toggleMenu({ patchState, getState }: StateContext<AppStateModel>) {
    const currentState = getState().menuState;
    patchState({ menuState: !currentState })
  }

  @Action(AppActions.ChangeAmountInCart)
  addToCart({ patchState, getState }: StateContext<AppStateModel>, { payload }: AppActions.ChangeAmountInCart) {
    let currentCart = getState().cart;
    let index = currentCart.findIndex(e => e.product.id === payload.product.id)
    if (index !== -1) {
      if (currentCart[index].quantity + payload.quantity > currentCart[index].product.stockAmount || currentCart[index].quantity + payload.quantity < 0) {
        const message = payload.quantity > 0 ? "You cannot add more :(" : "Amount cannot be negative :("
        this.notificationService.showSuccessNotification(message)
        return;
      }
      currentCart[index].quantity = currentCart[index].quantity + payload.quantity
    } else {
      if (payload.product.stockAmount > 0) {
        currentCart.unshift({ product: payload.product, quantity: payload.quantity });
      } else {
        this.notificationService.showSuccessNotification("This product isn't available");
        return;
      }
    }
    const newCart = currentCart;
    patchState({
      cart: [...newCart]
    })
    this.cacheService.saveItemToLocalStorage('cart', newCart);
  }

  @Action(AppActions.DeleteFromCart)
  deleteFromCart({ patchState, getState }: StateContext<AppStateModel>, { payload }: AppActions.DeleteFromCart) {
    let cart = getState().cart;
    cart = cart.filter(p => p.product.id !== payload.id)
    patchState({ cart: cart })
    this.cacheService.saveItemToLocalStorage('cart', cart);
  }

  @Action(AppActions.RestoreCart)
  restoreCart({ patchState }: StateContext<AppStateModel>) {
    const cart = this.cacheService.getItemFromLocalStorage('cart') as CartElement[];
    if (cart) {
      patchState({ cart: [...cart] })
    }
  }

  @Action(AppActions.EmptyCart)
  emptyCart({ patchState }: StateContext<AppStateModel>) {
    patchState({ cart: [] })

    this.notificationService.showSuccessNotification("Cart is now empty")
  }

  @Action(AppActions.RefreshCart)
  refreshCart({ getState, patchState }: StateContext<AppStateModel>) {
    const { cart } = getState();
    const productIds = cart.map(e => e.product.id);
    this.productGateway.getProductList$(productIds).pipe(
      tap((products) => {
        const newCart: CartElement[] = [];
        cart.forEach((element) => {
          const product = products.find(p => p.id === element.product.id);
          if (!!product) {
            let quantity = element.quantity;
            if (quantity > product.stockAmount) {
              quantity = product.stockAmount;
            }
            newCart.push({ product, quantity })
          }
        })
        patchState({ cart: newCart })
      }),
      takeUntil(this._destroy$)
    ).subscribe()
  }
}
