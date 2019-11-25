import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import styles from './AuthenticationForm.module.scss';
import { LoginFormErrors } from 'components/Login/Login';

interface FormProps {
  onSubmit: (data: { userName: string; password: string }) => void;
  register: any;
  handleSubmit: any;
  errors: LoginFormErrors;
}

export default function AuthenticationForm({
  onSubmit,
  handleSubmit,
  errors,
  register,
}: FormProps) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
      <h1>Log in to your account</h1>
      <TextField
        error={errors['userName'] ? true : false}
        helperText={errors['userName'] ? errors['userName'].message : null}
        inputRef={register}
        name='userName'
        label='Username'
        margin='normal'
        variant='outlined'
      />
      <TextField
        inputRef={register}
        error={errors['password'] ? true : false}
        helperText={errors['password'] ? errors['password'].message : null}
        name='password'
        label='Password'
        type='password'
        margin='normal'
        variant='outlined'
      />
      <Button
        type='submit'
        style={{ marginTop: '20px' }}
        variant='contained'
        color='primary'
        className={styles.submit_button}
      >
        Log in
      </Button>
    </form>
  );
}
