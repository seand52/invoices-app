import { all, takeLatest, put, call } from '@redux-saga/core/effects';
import * as UserActions from 'store/actions/userActions';
import * as api from 'api/user';
import { BusinessInfoAPI } from 'api/responses/businessInfo.type';
import { navigate } from '@reach/router';

const setToken = token => {
  window.sessionStorage.setItem('token', token);
};

const clearToken = () => {
  window.sessionStorage.removeItem('token');
};

function* authenticate({ payload }: any) {
  try {
    const res = yield api.authenticateUser(payload);
    yield put(UserActions.loginOk(res.token));
    yield call(setToken, res.token);
  } catch (err) {
    yield put(UserActions.loginFailed(err.message));
  }
}

function* registerUser({ payload }: any) {
  try {
    const res = yield api.registerUser(payload);
    yield put(UserActions.registerOk(res.token));
    yield call(setToken, res.token);
  } catch (err) {
    yield put(UserActions.registrationField(err.message));
  }
}

function* submitBusinessDetails({ payload }: any) {
  try {
    const res: BusinessInfoAPI = yield api.saveBusinessInfo(payload);
    yield put(UserActions.submitBusinessDetailsOk(res));
  } catch (err) {
    yield put(UserActions.submitBusinessDetailsFailed(err.message));
  }
}

function* logout({ payload }: any) {
  clearToken();
  yield navigate('/');
}

function* sagas() {
  return all([
    yield takeLatest(UserActions.LOGIN, authenticate),
    yield takeLatest(UserActions.REGISTER, registerUser),
    yield takeLatest(UserActions.LOGOUT, logout),
    yield takeLatest(
      UserActions.SUBMIT_BUSINESS_DETAILS,
      submitBusinessDetails,
    ),
  ]);
}

export default sagas;
