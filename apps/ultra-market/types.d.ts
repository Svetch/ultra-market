export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categories: ProductCategory[];
  images: string[];

  /*   discountPercentage: number;
  rating: number;
  stock: number;
  brand: string; */

  quantity?: number;
}

export interface ProductCategory {
  id: number;
  name: string;
}
