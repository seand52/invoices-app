export const initialState = {
  name: null as string | null,
};

export const key = 'clients';

export type ClientState = typeof initialState;

export const reducer = (state = initialState, action: any) => {
  return state;
};
