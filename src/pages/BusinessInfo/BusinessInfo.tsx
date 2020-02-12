import React from 'react';
import Layout from 'components/Layout/Layout';
import { useSetNavigation } from 'hooks/useSetNavigation';
import BusinessInfoForm from 'components/BusinessInfoForm/BusinessInfoForm';
import useFormBuilder from 'hooks/useFormBuilder';
import { useSelector } from 'react-redux';
import { InitialState } from 'store';
import { UserState } from 'store/reducers/userReducer';

export default function BusinessInfo() {
  const user: UserState = useSelector((state: InitialState) => state.userInfo);
  const { register, handleSubmit, errors } = useFormBuilder({
    key: 'businessInfoFields',
  });

  const myHandleSubmit = data => {};

  useSetNavigation('business-info');
  return (
    <Layout
      main={
        <BusinessInfoForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={myHandleSubmit}
          apiError={null}
          user={user}
          showSkipStep={false}
        />
      }
    ></Layout>
  );
}
