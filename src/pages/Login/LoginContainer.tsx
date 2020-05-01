import React, { useEffect } from 'react';

import useFormBuilder from 'hooks/useFormBuilder';

import LoginForm from 'components/Login/LoginForm/LoginForm';
import { ILoginFields } from 'forms/formValidations/authentication';

import styles from './LoginContainer.module.scss';
import { login, clearError } from 'store/actions/userActions';
import { connect } from 'react-redux';
import { getUserState } from 'selectors/userSelectors';
import { UserState } from 'store/reducers/userReducer';
import { navigate } from '@reach/router';
import useClearError from 'hooks/useClearError';

interface Props {
  path: string;
  login: (data: ILoginFields) => void;
  clearError: () => void;
  user: UserState;
}
const LoginContainer = ({ path, login, user, clearError }: Props) => {
  useClearError();
  const { register, handleSubmit, errors } = useFormBuilder({
    key: 'loginValidationFields',
  });

  const onSubmit = (data: ILoginFields) => {
    login(data);
  };

  if (user.token) {
    navigate('/clients');
  }

  return (
    <div className={styles.form_wrapper}>
      <LoginForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        user={user}
        apiError={user.error}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: getUserState(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (data: ILoginFields) => dispatch(login(data)),
    clearError: () => dispatch(clearError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
