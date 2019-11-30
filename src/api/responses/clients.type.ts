export interface Client {
  name: string;
  shopName: string;
  address: string;
  city: string;
  province: string;
  postcode: string;
  telephone1: string;
  telephone2: string;
  email: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  numNif: string;
  numCif: string;
}

export interface ClientsPaginated {
  items: Client[];
  itemCount: number;
  totalItems: number;
  pageCount: number;
  next: string;
  previous: string;
}
