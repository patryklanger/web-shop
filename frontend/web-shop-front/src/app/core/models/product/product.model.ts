import { Category } from "./category.model";

export interface Product {
  id: number,
  name: string,
  description: string,
  price: number,
  stockAmount: number,
  imgUrl: string,
  tags: string[],
  categories?: Category[]
}
