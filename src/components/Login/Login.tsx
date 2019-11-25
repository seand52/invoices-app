import React from 'react';
import * as yup from 'yup';
import useForm from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types';

import AuthenticationForm from 'components/AuthenticationForm';
import { authentication } from 'formValidations/authentication';

import styles from './Login.module.scss';

const LoginSchema = yup.object().shape(authentication);

export type LoginFields = { [key in keyof typeof authentication]: string };

export type LoginFormErrors = FieldErrors<LoginFields>;

interface Props {
  path: string;
}
export default function Login({ path }: Props) {
  const { register, handleSubmit, errors } = useForm<LoginFields>({
    validationSchema: LoginSchema,
  });

  const onSubmit = (data: LoginFields) => {
    console.log(data);
  };

  return (
    <div className={styles.form_wrapper}>
      <AuthenticationForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </div>
  );
}
