
import { Product } from 'src/app/core/models/product/product.model';
const ACTION_PREFIX = "[APP]"

export class MenuToggle {
  static readonly type = `${ACTION_PREFIX} Menu toggle`
}

export class AddToCart {
  static readonly type = `${ACTION_PREFIX} Add to cart`
  constructor(public payload: { product: Product; quantity: number }) {}
}

export class DeleteFromCart {
  static readonly type = `${ACTION_PREFIX} Delere from cart`
  constructor(public payload: { product: Product; quantity?: number }) {}
}
