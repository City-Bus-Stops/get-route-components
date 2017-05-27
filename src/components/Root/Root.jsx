import React from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-collapse';

import Menu from '../Menu/Menu';
import Notification from '../Notification/Notification';
import Spinner from '../Spinner/Spinner';
import Footer from '../Footer/Footer';

const Root = ({ children, location, notifications, IsSpinnerActive, actions: { logout } }) => (
  <div className="wrapper">
    <Notification
      notifications={notifications}
    />
    <Spinner IsSpinnerActive={IsSpinnerActive} />
    <Menu
      pathname={location.pathname}
      userName="Denis Krivichanin"
      onLogout={logout}
    />
    <div className="content">
      {children}
    </div>
    <Collapse isOpened={!location.pathname.includes('map')}>
      <Footer className="footer" />
    </Collapse>
  </div>
);

Root.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  location: PropTypes.shape().isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  IsSpinnerActive: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    logout: PropTypes.func.isRequired,
  }).isRequired,
};
Root.defaultProps = {
  children: [],
};

export default Root;
