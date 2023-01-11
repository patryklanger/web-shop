export interface ProductFormData {
  id?: number;
  name: string | null;
  description?: string | null;
  price: number | null;
  stockAmount: number | null;
}

export const InitialProductFormData: ProductFormData = {
  name: null,
  description: null,
  price: null,
  stockAmount: null
}

export enum FormType {
  CREATE, EDIT
}
