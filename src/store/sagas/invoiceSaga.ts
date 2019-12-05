import { all, takeLatest, put, call, select } from '@redux-saga/core/effects';
import * as InvoiceActions from 'store/actions/invoiceActions';
import * as api from 'api/invoice';
import { getInvoiceState } from 'selectors/invoices';

function* searchInvoices({ payload }: any) {
  try {
    const res = yield api.searchInvoices(payload);
    yield put(InvoiceActions.searchAllOk(res));
  } catch (err) {
    yield put(InvoiceActions.searchAllFailed());
  }
}

function* deleteInvoice({ payload }: any) {
  const state = yield select();
  const invoiceState = getInvoiceState(state);
  try {
    const res = yield api.deleteInvoice(payload);
    yield put(InvoiceActions.deleteInvoiceOk(res));
    yield call(searchInvoices, {
      payload: `http://localhost:3000/api/invoices?page=${invoiceState.invoices.currentPage}&limit=${invoiceState.invoices.itemCount}`,
    });
    // yield put(InvoiceActions.)
  } catch (err) {
    yield put(InvoiceActions.deleteInvoiceFailed('fail'));
  }
}

function* createInvoice({ payload }: any) {
  try {
    const res = yield api.createInvoice(payload);
    yield put(InvoiceActions.newInvoiceOk(res));
  } catch (err) {
    yield put(InvoiceActions.newInvoiceFailed('fail'));
  }
}

function* updateInvoice({ payload }: any) {
  try {
    const res = yield api.updateInvoice(payload.data, payload.id);
    yield put(InvoiceActions.updateInvoiceOk(res));
  } catch (err) {
    yield put(InvoiceActions.updateInvoiceFailed('fail'));
  }
}

function* sagas() {
  return all([
    yield takeLatest(InvoiceActions.SEARCH_ALL, searchInvoices),
    yield takeLatest(InvoiceActions.DELETE, deleteInvoice),
    yield takeLatest(InvoiceActions.NEW_INVOICE, createInvoice),
    yield takeLatest(InvoiceActions.UPDATE_INVOICE, updateInvoice),
  ]);
}

export default sagas;
