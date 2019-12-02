import userSagas from './userSagas';
import clientSagas from './clientSagas';
import productSagas from './productSagas';
import { all } from '@redux-saga/core/effects';

export default function*() {
  while (true) {
    yield all([userSagas(), clientSagas(), productSagas()]);
  }
}
