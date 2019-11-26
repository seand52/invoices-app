import { createSelector } from 'reselect';
import { InitialState } from 'store';

export const getUserState = (state: InitialState) => state.userInfo;
