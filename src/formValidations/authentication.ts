import * as yup from 'yup';

export const authentication = {
  userName: yup.string().required(),
  password: yup
    .string()
    .required()
    .min(6),
};
