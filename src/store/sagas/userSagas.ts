import { all, takeLatest, select, put } from '@redux-saga/core/effects';
import * as UserActions from 'store/actions/userActions';
import * as api from 'api/user';

function* tryLogin({ payload }: any) {
  try {
    const res = yield api.authenticateUser(payload);
    yield put(UserActions.loginOk(res.token));
  } catch (err) {
    if (err.data.statusCode === 401) {
      yield put(UserActions.loginFailed('Wrong credentials'));
      return;
    }
    yield put(UserActions.loginFailed());
  }
}

function* sagas() {
  return all([yield takeLatest(UserActions.LOGIN, tryLogin)]);
}

export default sagas;
