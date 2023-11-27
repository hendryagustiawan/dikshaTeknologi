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

export type ProductStatus = true | false;
