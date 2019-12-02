import { all, takeLatest, put, call, select } from '@redux-saga/core/effects';
import * as ProductActions from 'store/actions/productsActions';
import * as api from 'api/products';
import { getProductState } from 'selectors/products';

function* searchProducts({ payload }: any) {
  try {
    const res = yield api.searchProducts(payload);
    yield put(ProductActions.searchAllOk(res));
  } catch (err) {
    yield put(ProductActions.searchAllFailed());
  }
}

function* deleteProduct({ payload }: any) {
  const state = yield select();
  const productState = getProductState(state);
  try {
    const res = yield api.deleteProduct(payload);
    yield put(ProductActions.deleteProductOk(res));
    yield call(searchProducts, {
      payload: `http://localhost:3000/api/products?page=${productState.products.currentPage}&limit=${productState.products.itemCount}`,
    });
    // yield put(ProductActions.)
  } catch (err) {
    yield put(ProductActions.deleteProductFailed('fail'));
  }
}

function* createProduct({ payload }: any) {
  const state = yield select();
  const productState = getProductState(state);
  try {
    const res = yield api.createProduct(payload);
    yield put(ProductActions.newProductOk(res));
    yield call(searchProducts, {
      payload: `http://localhost:3000/api/products?page=${productState.products.currentPage}&limit=${productState.products.itemCount}`,
    });
  } catch (err) {
    yield put(ProductActions.newProductFailed('fail'));
  }
}

function* updateProduct({ payload }: any) {
  const state = yield select();
  const productState = getProductState(state);
  try {
    const res = yield api.updateProduct(payload.data, payload.id);
    yield put(ProductActions.updateProductOk(res));
    yield call(searchProducts, {
      payload: `http://localhost:3000/api/products?page=${productState.products.currentPage}&limit=${productState.products.itemCount}`,
    });
  } catch (err) {
    yield put(ProductActions.updateProductFailed('fail'));
  }
}

function* sagas() {
  return all([
    yield takeLatest(ProductActions.SEARCH_ALL, searchProducts),
    yield takeLatest(ProductActions.DELETE, deleteProduct),
    yield takeLatest(ProductActions.NEW_PRODUCT, createProduct),
    yield takeLatest(ProductActions.UPDATE_PRODUCT, updateProduct),
  ]);
}

export default sagas;
