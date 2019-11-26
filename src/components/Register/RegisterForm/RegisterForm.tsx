import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import styles from './RegisterForm.module.scss';

interface Props {
  onSubmit: (data: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => void;
  register: any;
  handleSubmit: any;
  errors: any;
}

export default function RegisterForm({
  onSubmit,
  handleSubmit,
  errors,
  register,
}: Props) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
      <h1>Register your account</h1>
      <TextField
        error={errors['username'] ? true : false}
        helperText={errors['username'] ? errors['username'].message : null}
        inputRef={register}
        name='username'
        label='username'
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
      <TextField
        inputRef={register}
        error={errors['confirmPassword'] ? true : false}
        helperText={
          errors['confirmPassword'] ? errors['confirmPassword'].message : null
        }
        name='confirmPassword'
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
