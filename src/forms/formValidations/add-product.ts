import * as yup from 'yup';

export const createProductsFields = {
  reference: yup.string().required(),
  price: yup.number().required(),
};

export type ICreateProduct = typeof createProductsFields;
