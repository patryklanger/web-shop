import { Subject } from "rxjs";
import { Product } from "src/app/core/models/product/product.model";

export interface CategoriesDialogData {
  id: number;
  current: number[],
  product$: Subject<Product>
}
