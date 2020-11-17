import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/alert/alertActions';
import { register } from '../../redux/register/registerActions';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register }) => {
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const { name, email, password, confirmpassword } = registerData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword)
      setAlert('Passwords dont match', 'danger');
    else register({ name, email, password });
  };
  const onChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1>Register Form</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='text'
          placeholder='name'
          name='name'
          value={name}
          onChange={(e) => onChange(e)}
          required
        />
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
        <input
          type='password'
          placeholder='confirm password'
          name='confirmpassword'
          value={confirmpassword}
          onChange={(e) => onChange(e)}
          required
        />
        <input type='submit' value='submit' />
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};
export default connect(null, { setAlert, register })(Register);
