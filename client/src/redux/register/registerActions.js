//import axios from 'axios';
import api from '../../utils/api';
import { setAlert } from '../alert/alertActions';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './registerTypes';
import { authorizeUser } from '../auth/authActions';

//register user
export const register = ({ name, email, password }) => async (dispatch) => {
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };
  const body = { name, email, password };
  try {
    const res = await api.post('/register', body);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(authorizeUser());
  } catch (err) {
    //response.data.errors must match with /api/register errors in the backend
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
