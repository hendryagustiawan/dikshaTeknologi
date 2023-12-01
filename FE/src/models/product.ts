export interface Product {
  id: number;
  plu: string;
  product_category_id: number;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  ProductCategory: {
    id: number;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface AddProduct {
  plu: string;
  product_category_id: number;
  name: string;
  active: boolean;
}

export interface EditProduct {
  id: number;
  plu: string;
  product_category_id: number;
  name: string;
  active: boolean;
}

export type ProductStatus = true | false;
