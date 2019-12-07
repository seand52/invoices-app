import { FullSalesOrderDetails } from 'api/responses/sales-orders.type';
import {
  InvoiceProducts,
  InvoiceSettings,
} from 'store/reducers/invoiceFormReducer';
import uuidv4 from 'uuid/v4';

export const prepareSalesOrderDefaultValues = (data: FullSalesOrderDetails) => {
  const settings: InvoiceSettings = {
    client: { name: data.client.name, id: data.clientId },
    date: data.date,
    transportPrice: data.transportPrice,
    paymentType: { label: data.paymentType, value: data.paymentType },
    tax: [
      { label: 'IVA (21%)', value: data.tax, category: 'tax' },
      { label: 'RE (5.2%)', value: 0.052, category: 're' },
    ],
  };
  const products: InvoiceProducts[] = data.salesOrderToProducts.map(
    product => ({
      uuid: uuidv4(),
      quantity: product.quantity,
      id: product.product.id,
      price: product.product.price,
      description: product.product.description,
    }),
  );
  return { settings, products };
};
