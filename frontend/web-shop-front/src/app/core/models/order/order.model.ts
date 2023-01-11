import { OrderBasketElement } from "./order-basket-element.model";
import { OrderState } from "./order-state.enum";

export interface Order {
  id?: number;
  createdAt?: Date;
  paid?: boolean
  userId?: string;
  city: string;
  street: string;
  buildingNumber: number;
  apartmentNumber?: number;
  orderState?: OrderState;
  country: string;
  phoneNumber: number;
  basket: OrderBasketElement[];
}
