import { PaymentType } from 'store/reducers/invoiceFormReducer';

interface CreateInvoiceSettings {
  clientId: number | null;
  date: string | Date;
  re: number;
  transportPrice: number;
  paymentType: PaymentType;
  tax: number;
}

export interface ICreateInvoice {
  settings: CreateInvoiceSettings;
  products: {
    quantity: number;
    discount: number;
    price: number;
    description: string;
  }[];
}
