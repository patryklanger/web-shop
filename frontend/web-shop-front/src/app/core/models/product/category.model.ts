import { Product } from "./product.model";

export interface Category {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  products?: Product[]
}

export interface CategoryShort {
  id: number;
  name: string;
}
