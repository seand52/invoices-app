import { all, takeLatest, put } from '@redux-saga/core/effects';
import * as ClientActions from 'store/actions/clientActions';
import * as api from 'api/clients';

function* searchClients({ payload }: any) {
  try {
    const res = yield api.searchClients(payload);
    yield put(ClientActions.searchAllOk(res));
  } catch (err) {
    yield put(ClientActions.searchAllFailed());
  }
}

function* sagas() {
  return all([yield takeLatest(ClientActions.SEARCH_ALL, searchClients)]);
}

export default sagas;
