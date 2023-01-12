import { Injectable } from "@angular/core"
import { Action, Selector, State, StateContext } from "@ngxs/store"
import { OrderActions } from "."
import { OrderBasketElement } from "../../models/order/order-basket-element.model"

const ORDER_LOCAL_STORAGE_KEY = "order"

const INITIAL_STATE = {
  basket: []
}

export interface OrderStateModel {
  basket: OrderBasketElement[]
}

@State<OrderStateModel>({
  name: ORDER_LOCAL_STORAGE_KEY,
  defaults: INITIAL_STATE
})
@Injectable()
export class OrderState {

  @Selector()
  static basket(state: OrderStateModel): OrderBasketElement[] {
    return state.basket
  }

  @Action(OrderActions.SaveOrder)
  saveOrder({ setState }: StateContext<OrderStateModel>, { payload }: OrderActions.SaveOrder) {
    setState({ basket: payload })
  }

  @Action(OrderActions.RemoveOrder)
  removeOrder({ setState }: StateContext<OrderStateModel>) {
    setState({ basket: [] })
  }
}
