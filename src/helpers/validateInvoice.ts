import {
  InvoiceProducts,
  InvoiceSettings,
} from 'store/reducers/invoiceFormReducer';

export const validateInvoice = (
  products: InvoiceProducts[],
  settings: InvoiceSettings,
) => {
  if (!settings.client || !settings.paymentType) {
    return {
      type: 'error',
      message:
        'You must complete the required fields before saving your invoice. Check that you have selected a client and payment type',
    };
  }
  const filteredProducts = products.filter(item => item.id !== null);
  if (!filteredProducts.length) {
    return {
      type: 'error',
      message: 'You cannot create an invoice without any products!',
    };
  }
  return {
    message: 'ok',
    type: 'success',
  };
};
