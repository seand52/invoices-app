import * as yup from 'yup';

export const createInvoiceFields = {
  clientId: yup.string().required(),
  date: yup.string().required(),
  re: yup
    .number()
    .required()
    .min(0)
    .max(1),
  transport: yup.number().required(),
  paymentType: yup.string().oneOf(['Efectivo', 'Transferencia', 'Tarjeta']),
  tax: yup
    .number()
    .required()
    .min(0)
    .max(1),
};

export type ICreateInvoice = typeof createInvoiceFields;
