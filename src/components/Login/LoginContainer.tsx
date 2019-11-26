import React from 'react';

import useFormBuilder from 'hooks/useFormBuilder';

import LoginForm from 'components/Login/LoginForm/LoginForm';
import { ILoginFields } from 'forms/formValidations/authentication';

import styles from './LoginContainer.module.scss';

interface Props {
  path: string;
}
export default function LoginContainer({ path }: Props) {
  const { register, handleSubmit, errors } = useFormBuilder({
    key: 'loginValidationFields',
  });

  const onSubmit = (data: ILoginFields) => {
    console.log(data);
  };
  return (
    <div className={styles.form_wrapper}>
      <LoginForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </div>
  );
}
