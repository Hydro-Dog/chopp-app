import { Category } from "../product-category-slice";

export type ProductImage = {
  id: number;
  hash: string;
  path: string;
  originalName: string;
  size: number;
  productId: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: ProductImage[];
  category: Category;
};
