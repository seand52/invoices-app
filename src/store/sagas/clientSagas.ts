import { all, takeLatest, put, call, select } from '@redux-saga/core/effects';
import * as ClientActions from 'store/actions/clientActions';
import * as api from 'api/clients';
import { getClientsState } from 'selectors/clients';

function* searchClients({ payload }: any) {
  try {
    debugger;
    const res = yield api.searchClients(payload);
    yield put(ClientActions.searchAllOk(res));
  } catch (err) {
    yield put(ClientActions.searchAllFailed());
  }
}

function* deleteClient({ payload }: any) {
  const state = yield select();
  const clientState = getClientsState(state);
  try {
    const res = yield api.deleteClient(payload);
    yield call(searchClients, {
      payload: `http://localhost:3000/api/clients?page=${clientState.clients.currentPage}&limit=3`,
    });
    // yield put(ClientActions.)
  } catch (err) {
    yield put(ClientActions.deleteClientFailed('fail'));
  }
}

function* sagas() {
  return all([
    yield takeLatest(ClientActions.SEARCH_ALL, searchClients),
    yield takeLatest(ClientActions.DELETE, deleteClient),
  ]);
}

export default sagas;
