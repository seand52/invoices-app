import { InvoiceSettings } from 'store/reducers/invoiceFormReducer';

export interface ICreateInvoice {
  settings: InvoiceSettings;
  products: { id: number | null; quantity: number }[];
}
