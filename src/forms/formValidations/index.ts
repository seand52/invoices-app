import {
  loginValidationFields,
  registerValidationFields,
} from './authentication';

interface Schemas<T> {
  loginValidationFields: T;
  registerValidationFields: T;
}
export const schemas: Schemas<any> = {
  loginValidationFields,
  registerValidationFields,
};
