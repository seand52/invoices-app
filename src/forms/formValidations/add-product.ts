import * as yup from 'yup';

export const createProductsFields = {
  description: yup.string().required(),
  price: yup.number().required(),
};

export type ICreateProduct = typeof createProductsFields;
