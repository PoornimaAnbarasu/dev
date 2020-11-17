import React, { Fragment, useState } from 'react';
import { loginUser } from '../../redux/login/loginActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({ loginUser }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = loginData;

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };
  const onChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1>Login Form</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='email'
          placeholder='email'
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type='password'
          placeholder='password'
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
          minLength='6'
          required
        />

        <input type='submit' value='submit' />
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default connect(null, { loginUser })(Login);
