import React from 'react';
import {
  InvoiceProducts,
  InvoiceSettings,
} from 'store/reducers/invoiceFormReducer';

interface Props {
  products: InvoiceProducts;
  settings: InvoiceSettings;
}

const roundedNumber = number => Math.round(number * 100) / 100;

const calculateTotalprice = (
  products: InvoiceProducts[],
  settings: InvoiceSettings,
) => {
  const subTotal = products
    .filter(item => item.id !== null)
    .reduce((accum, curr) => accum + curr.price * curr.quantity, 0);
  const iva = subTotal * settings.tax;
  const re = subTotal * settings.re;
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
    <div>
      <p>SubTotal: {subTotal}</p>
      <p>IVA: {roundedNumber(iva + re)}</p>
      <p>Transport: {transport}</p>
      <p>Total: {invoiceTotal}</p>
    </div>
  );
}
