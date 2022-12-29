import { Product } from "./product.model";

export interface Category {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  products?: Product[]
}
