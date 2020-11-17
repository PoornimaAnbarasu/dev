import api from '../../utils/api';
import { AUTH_USER, AUTH_ERROR } from './authTypes';
import setAuthToken from '../../utils/setAuthToken';
//import { setAlert } from '../alert/alertActions';
//import axios from "axios"

export const authorizeUser = () => async (dispatch) => {
  // if (localStorage.token) {
  //   console.log("auth actions token setting")
  //   setAuthToken(localStorage.token);}
  try {
    const res = await api.get('/login');
    dispatch({
      type: AUTH_USER,
      payload: res.data,
    });
  } catch (err) {
    //response.data.errors must match with /api/login errors in the backend
    // const errors = err.response.data.error;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    // }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
