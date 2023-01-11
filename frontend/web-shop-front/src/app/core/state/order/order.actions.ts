import { OrderBasketElement } from "../../models/order/order-basket-element.model"

const ACTION_PREFIX = "[ORDER]"

export class SaveOrder {
  static readonly type = `${ACTION_PREFIX} Save order`
  constructor(public payload: OrderBasketElement[]) {}
}

export class RemoveOrder {
  static readonly type = `${ACTION_PREFIX} Remove order`
}
