import { all, takeLatest, put, call, select } from '@redux-saga/core/effects';
import * as SalesOrderActions from 'store/actions/SalesOrderActions';
import * as InvoiceFormActions from 'store/actions/invoiceFormActions';
import * as api from 'api/salesOrder';
import { getSalesOrderState } from 'selectors/salesOrders';
import { prepareSalesOrderDefaultValues } from 'helpers/prepareSalesOrderDefaultValues';

function* searchSalesOrders({ payload }: any) {
  try {
    const res = yield api.searchSalesOrders(payload);
    yield put(SalesOrderActions.searchAllOk(res));
  } catch (err) {
    yield put(SalesOrderActions.searchAllFailed());
  }
}

function* searchSalesOrderDetails({
  payload,
}: ReturnType<typeof SalesOrderActions.searchOne>) {
  try {
    const res = yield api.searchSalesOrderDetails(payload);
    const { settings, products } = prepareSalesOrderDefaultValues(res);
    yield put(InvoiceFormActions.insertDefaultValues(settings, products));
    yield put(SalesOrderActions.searchOneOk(res));
  } catch (err) {
    yield put(
      SalesOrderActions.searchOneFailed(
        'There was an error loading your sales order',
      ),
    );
  }
}

function* deleteSalesOrder({ payload }: any) {
  const state = yield select();
  const salesOrderState = getSalesOrderState(state);
  try {
    const res = yield api.deleteSalesOrder(payload);
    yield put(SalesOrderActions.deleteSalesOrderOk(res));
    yield call(searchSalesOrders, {
      payload: `http://localhost:3000/api/sales-orders?page=${salesOrderState.salesOrders.currentPage}&limit=${salesOrderState.salesOrders.itemCount}`,
    });
  } catch (err) {
    yield put(SalesOrderActions.deleteSalesOrderFailed('fail'));
  }
}

function* createSalesOrder({ payload }: any) {
  try {
    const res = yield api.createSalesOrder(payload);
    yield put(SalesOrderActions.newSalesOrderOk(res));
  } catch (err) {
    yield put(SalesOrderActions.newSalesOrderFailed('fail'));
  }
}

function* updateSalesOrder({ payload }: any) {
  try {
    const res = yield api.updateSalesOrder(payload.data, payload.id);
    yield put(SalesOrderActions.updateSalesOrderOk(res));
  } catch (err) {
    yield put(SalesOrderActions.updateSalesOrderFailed('fail'));
  }
}

function* sagas() {
  return all([
    yield takeLatest(SalesOrderActions.SEARCH_ALL, searchSalesOrders),
    yield takeLatest(SalesOrderActions.SEARCH_ONE, searchSalesOrderDetails),
    yield takeLatest(SalesOrderActions.DELETE, deleteSalesOrder),
    yield takeLatest(SalesOrderActions.NEW_SALES_ORDER, createSalesOrder),
    yield takeLatest(SalesOrderActions.UPDATE_SALES_ORDER, updateSalesOrder),
  ]);
}

export default sagas;
