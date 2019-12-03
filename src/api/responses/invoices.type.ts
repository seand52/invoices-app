export interface Invoice {
  id: number;
  totalPrice: number;
  re: number;
  tax: number;
  transportPrice: number;
  paymentType: 'Transferencia' | 'Efectivo' | 'Tarjeta';
  userId: number;
  clientId: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  client: {
    name: string;
    telephone1: string;
    email: string;
  };
}

export interface InvoicesPaginated {
  items: Invoice[];
  itemCount: number;
  totalItems: number;
  pageCount: number;
  next: string;
  previous: string;
  currentPage: number;
}