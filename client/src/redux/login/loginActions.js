//import axios from 'axios';
import { authorizeUser } from '../auth/authActions';
import api from '../../utils/api';

//import setAuthToken from '../../utils/setAuthToken';
import { LOGIN_SUCCESS, LOGIN_FAIL } from './loginTypes';
import { setAlert } from '../alert/alertActions';

export const loginUser = (email, password) => async (dispatch) => {
  const body = { email, password };
  //if (localStorage.token) setAuthToken(localStorage.token);
  try {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };
    //const body = JSON.stringify({ email, password });
    const res = await api.post('/login', body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    //dispatch(authorizeUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
