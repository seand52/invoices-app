import { InitialState } from 'store';
import { createSelector } from 'reselect';

export const getUserState = (state: InitialState) => state.userInfo;

export const isLoggedIn = () => !!window.sessionStorage.getItem('token');
