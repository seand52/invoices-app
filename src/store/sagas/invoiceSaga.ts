import { all, takeLatest, put, call, select } from '@redux-saga/core/effects';
import * as InvoiceActions from 'store/actions/invoiceActions';
import * as InvoiceFormActions from 'store/actions/invoiceFormActions';
import * as api from 'api/invoice';
import { getInvoiceState } from 'selectors/invoices';
import { FullInvoiceDetails } from 'api/responses/invoices.type';
import { navigate } from '@reach/router';
import { prepareInvoiceDefaultValues } from 'helpers/prepareInvoiceDefaultValues';

function* searchInvoices({ payload }: any) {
  try {
    const res = yield api.searchInvoices(payload);
    yield put(InvoiceActions.searchAllOk(res));
  } catch (err) {
    yield put(InvoiceActions.searchAllFailed());
  }
}

function* searchInvoiceDetails({
  payload,
}: ReturnType<typeof InvoiceActions.searchOne>) {
  try {
    const res = yield api.searchInvoiceDetails(payload);
    const { settings, products } = prepareInvoiceDefaultValues(res);
    yield put(InvoiceFormActions.insertDefaultValues(settings, products));
    yield put(InvoiceActions.searchOneOk(res));
  } catch (err) {
    yield put(
      InvoiceActions.searchOneFailed('There was an error loading your invoice'),
    );
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
    yield takeLatest(InvoiceActions.SEARCH_ONE, searchInvoiceDetails),
    yield takeLatest(InvoiceActions.DELETE, deleteInvoice),
    yield takeLatest(InvoiceActions.NEW_INVOICE, createInvoice),
    yield takeLatest(InvoiceActions.UPDATE_INVOICE, updateInvoice),
  ]);
}

export default sagas;
