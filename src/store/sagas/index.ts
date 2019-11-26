import userSagas from './userSagas';
import clientSagas from './clientSagas';
import { all } from '@redux-saga/core/effects';

export default function*() {
  while (true) {
    yield all([userSagas(), clientSagas()]);
  }
}
