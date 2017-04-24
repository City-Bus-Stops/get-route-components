import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';

import searchRoute from './searchRoute/searchRoute';
import login from './login/login';
import signup from './signup/signup';

export default combineReducers({
  searchRoute,
  notifications,
  login,
  signup,
});
