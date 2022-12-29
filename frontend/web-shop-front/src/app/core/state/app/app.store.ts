import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Product } from "../../models/product/product.model";

import * as AppActions from "./app.actions";

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
export class AppState {
  @Selector()
  static menuState(state: AppStateModel): boolean {
    return state.menuState
  }

  @Action(AppActions.MenuToggle)
  toggleMenu({ patchState, getState }: StateContext<AppStateModel>) {
    const currentState = getState().menuState;
    patchState({ menuState: !currentState })
  }

  @Action(AppActions.AddToCart)
  addToCart({ patchState, getState }: StateContext<AppStateModel>, { payload }: AppActions.AddToCart) {
    let currentCart = getState().cart;
    let currentProductState = currentCart.find(e => e.product.id === payload.product.id)
    currentCart = currentCart.filter(p => p.product.id !== currentProductState?.product.id)
    if (currentProductState) {
      currentProductState.quantity = currentProductState.quantity + payload.quantity
    } else {
      currentProductState = { ...payload }
    }
    patchState({
      cart: [
        ...currentCart,
        currentProductState
      ]
    })

  }
}
