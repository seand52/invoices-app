import React from 'react';

import useFormBuilder from 'hooks/useFormBuilder';

import { IRegisterFields } from 'forms/formValidations/authentication';

import styles from './RegisterContainer.module.scss';
import RegisterForm from './RegisterForm/RegisterForm';

interface Props {
  path: string;
}
export default function RegisterContainer({ path }: Props) {
  const { register, handleSubmit, errors } = useFormBuilder({
    key: 'registerValidationFields',
  });

  const onSubmit = (data: IRegisterFields) => {
    console.log(data);
  };

  return (
    <div className={styles.form_wrapper}>
      <RegisterForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </div>
  );
}
