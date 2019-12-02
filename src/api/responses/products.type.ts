export interface Product {
  id: number;
  description: string;
  price: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsPaginated {
  items: Product[];
  itemCount: number;
  totalItems: number;
  pageCount: number;
  next: string;
  previous: string;
  currentPage: number;
}
