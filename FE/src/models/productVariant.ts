export interface ProductVariant {
  id: number;
  product_id: number;
  name: string;
  active: boolean;
  code: string;
  image: string;
  qty: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  ProductCategory: {
    id: number;
    plu: string;
    product_category_id: number;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export type ProductStatus = true | false;
