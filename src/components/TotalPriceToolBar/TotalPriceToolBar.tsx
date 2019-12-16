import React from 'react';
import {
  InvoiceProducts,
  InvoiceSettings,
} from 'store/reducers/invoiceFormReducer';
import styles from './TotalPriceToolbar.module.scss';
import NumberFormatter from 'helpers/numberFormat';

interface Props {
  products: InvoiceProducts;
  settings: InvoiceSettings;
}

const makeZero = number => (isNaN(number) ? 0 : number);

const roundedNumber = number => Math.round(number * 100) / 100;

const calculateTotalprice = (
  products: InvoiceProducts[],
  settings: InvoiceSettings,
) => {
  const ivaSettings = settings.tax.find(item => item.category === 'tax');
  const reSettings = settings.tax.find(item => item.category === 're');

  const subTotal = products
    .filter(item => item.reference !== '')
    .reduce(
      (accum, curr) =>
        accum + curr.price * curr.quantity * (1 - makeZero(curr.discount)),
      0,
    );
  const iva = ivaSettings ? subTotal * ivaSettings.value : 0;
  const re = reSettings ? subTotal * reSettings.value : 0;
  const transport = settings.transportPrice || 0;
  const invoiceTotal = subTotal + iva + re + transport;
  return {
    subTotal: roundedNumber(subTotal),
    iva: roundedNumber(iva),
    re: roundedNumber(re),
    transport: roundedNumber(transport),
    invoiceTotal: roundedNumber(invoiceTotal),
  };
};

export default function TotalPriceToolBar({ products, settings }) {
  const { subTotal, iva, re, transport, invoiceTotal } = calculateTotalprice(
    products,
    settings,
  );
  return (
    <div className={styles.price_bar}>
      <p>SubTotal: {NumberFormatter.format(subTotal)}</p>
      <p>IVA: {NumberFormatter.format(roundedNumber(iva + re))}</p>
      <p>Transport: {NumberFormatter.format(transport)}</p>
      <p>Total: {NumberFormatter.format(invoiceTotal)}</p>
    </div>
  );
}
