// import axios from "axios";

// const setAuthToken =token =>{
//     if(token)
//         axios.defaults.headers.common["x-auth-token"] = token;
//     else
//         delete axios.defaults.headers.common["x-auth-token"];
// }

// export default setAuthToken;

import api from './api';

const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
    console.log("token alloted")
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
    console.log("remove token")
  }
};

export default setAuthToken;
