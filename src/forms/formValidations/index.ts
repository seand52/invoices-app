import {
  loginValidationFields,
  registerValidationFields,
} from './authentication';
import { businessInfoFields } from './business-info';

interface Schemas<T> {
  loginValidationFields: T;
  registerValidationFields: T;
  businessInfoFields: T;
}
export const schemas: Schemas<any> = {
  loginValidationFields,
  registerValidationFields,
  businessInfoFields,
};
