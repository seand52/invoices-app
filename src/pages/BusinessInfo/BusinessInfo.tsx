import React, { useEffect } from 'react';
import Layout from 'components/Layout/Layout';
import { useSetNavigation } from 'hooks/useSetNavigation';
import BusinessInfoForm from 'components/BusinessInfoForm/BusinessInfoForm';
import useFormBuilder from 'hooks/useFormBuilder';
import { useSelector, connect } from 'react-redux';
import { InitialState } from 'store';
import { UserState } from 'store/reducers/userReducer';
import {
  updateBusinessDetails,
  submitBusinessDetails,
} from 'store/actions/userActions';
import { getUserState } from 'selectors/userSelectors';

interface Props {
  updateInfo: (data) => void;
  createInfo: (data) => void;
  userState: UserState;
}
const BusinessInfo = ({ updateInfo, createInfo, userState }: Props) => {
  const user: UserState = useSelector((state: InitialState) => state.userInfo);
  const { register, handleSubmit, errors } = useFormBuilder({
    key: 'businessInfoFields',
  });

  const myHandleSubmit = data => {
    if (userState.businessInfo && Object.keys(userState.businessInfo).length) {
      updateInfo(data);
    } else {
      createInfo(data);
    }
  };

  useSetNavigation('business-info');
  return (
    <Layout
      main={
        <BusinessInfoForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={myHandleSubmit}
          apiError={userState.error}
          user={user}
          showSkipStep={false}
        />
      }
    ></Layout>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    userState: getUserState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateInfo: data => dispatch(updateBusinessDetails(data)),
    createInfo: data => dispatch(submitBusinessDetails(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BusinessInfo);
