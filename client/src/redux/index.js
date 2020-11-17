import { combineReducers } from 'redux';
import alertReducers from './alert/alertReducers';
import registerReducers from './register/registerReducers';
import authReducers from "./auth/authReducers";
import loginReducers from "./login/loginReducers"

export default combineReducers({
  alertReducers,
  registerReducers,
  authReducers,
  loginReducers
});
