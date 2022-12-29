
import { Product } from 'src/app/core/models/product/product.model';
const ACTION_PREFIX = "[APP]"

export class MenuToggle {
  static readonly type = `${ACTION_PREFIX} Menu toggle`
}

export class ChangeAmountInCart {
  static readonly type = `${ACTION_PREFIX} Add to cart`
  constructor(public payload: { product: Product; quantity: number }) {}
}

export class DeleteFromCart {
  static readonly type = `${ACTION_PREFIX} Delete from cart`
  constructor(public payload: Product) {}
}

export class EmptyCart {
  static readonly type = `${ACTION_PREFIX} Empty cart`
}

export class RestoreCart {
  static readonly type = `${ACTION_PREFIX} Restore cart`
}
