export interface CategoryFormData {
  id?: number;
  name: string | null;
  description?: string | null;
}

export const InitialCategoryFormData: CategoryFormData = {
  name: null,
  description: null,
}

export enum FormType {
  CREATE, EDIT
}
