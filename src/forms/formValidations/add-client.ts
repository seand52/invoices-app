import * as yup from 'yup';

export const createClientFields = {
  name: yup.string().required(),
  shopName: yup.string(),
  address: yup.string().required(),
  city: yup.string().required(),
  province: yup.string(),
  postcode: yup
    .string()
    .required()
    .max(7),
  numNif: yup.string().max(12),
  numCif: yup.string().max(12),
  telephone1: yup.string(),
  telephone2: yup.string(),
  email: yup
    .string()
    .email()
    .required(),
};

export type ICreateClient = typeof createClientFields;
