export const initialState = {
  token: null as string | null,
  isLoggedIn: false as boolean,
};

export const key = 'userInfo';

export type UserState = typeof initialState;

export const reducer = (state = initialState, action: any) => {
  return state;
};
