import {
  InvoiceProducts,
  InvoiceSettings,
} from 'store/reducers/invoiceFormReducer';

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
