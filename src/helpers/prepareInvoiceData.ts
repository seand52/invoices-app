import {
  InvoiceProducts,
  InvoiceSettings,
} from 'components/Invoices/InvoiceDetailsForm/invoiceDetailsReducer';

export const prepareInvoiceData = (
  products: InvoiceProducts[],
  settings: InvoiceSettings,
) => {
  return {
    settings,
    products: products.map(item => ({
      id: item.id,
      quantity: item.quantity,
    })),
  };
};
