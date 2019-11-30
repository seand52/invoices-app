import { all, takeLatest, put } from '@redux-saga/core/effects';
import * as UserActions from 'store/actions/userActions';
import * as api from 'api/user';
import { BusinessInfoAPI } from 'api/responses/businessInfo.type';

function* tryLogin({ payload }: any) {
  try {
    const res = yield api.authenticateUser(payload);
    yield put(UserActions.loginOk(res.token));
    debugger;
    window.sessionStorage.setItem('token', res.token);
    debugger;
  } catch (err) {
    if (err.data.statusCode === 401) {
      yield put(UserActions.loginFailed('Wrong credentials'));
      return;
    }
    yield put(UserActions.loginFailed());
  }
}

function* registerUser({ payload }: any) {
  try {
    const res = yield api.registerUser(payload);
    yield put(UserActions.registerOk(res.token));
    window.sessionStorage.setItem('token', res.token);
  } catch (err) {
    yield put(UserActions.registrationField(err.data.message));
  }
}

function* submitBusinessDetails({ payload }: any) {
  try {
    const res: BusinessInfoAPI = yield api.saveBusinessInfo(payload);
    yield put(UserActions.submitBusinessDetailsOk(res));
  } catch (err) {
    yield put(UserActions.submitBusinessDetailsFailed(err.data.message));
  }
}

function* sagas() {
  return all([
    yield takeLatest(UserActions.LOGIN, tryLogin),
    yield takeLatest(UserActions.REGISTER, registerUser),
    yield takeLatest(
      UserActions.SUBMIT_BUSINESS_DETAILS,
      submitBusinessDetails,
    ),
  ]);
}

export default sagas;
