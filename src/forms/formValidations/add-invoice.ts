import { InvoiceSettings } from 'components/Invoices/InvoiceDetailsForm/invoiceDetailsReducer';

export interface ICreateInvoice {
  settings: InvoiceSettings;
  products: { id: number | null; quantity: number }[];
}
