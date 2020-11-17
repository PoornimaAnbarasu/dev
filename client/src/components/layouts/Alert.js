import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//destructuring props ---> props.alerts ---->{alerts}
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div>
      {alert.alertType} here is me{alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

//getting root reducer --- alert in props.alerts
const mapStateToProps = (state) => ({
  alerts: state.alertReducers,
});

export default connect(mapStateToProps)(Alert);

//racfp
