import { AUTH_USER, AUTH_ERROR } from './authTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function authReducers(state = initialState, actions) {
  const { type, payload } = actions;

  switch (type) {
    case AUTH_USER:
    //  localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case AUTH_ERROR:
    //  localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user:null
      };
    default:
      return state;
  }
}
