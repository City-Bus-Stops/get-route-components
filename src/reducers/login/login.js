import { combineReducers } from 'redux';

import { createWrapperReducer } from '../../utils';
import field from '../formField';
import errors from '../errors';

export const LOGIN_FORM = 'loginForm';

export default combineReducers({
  email: createWrapperReducer(field, action => action.field === 'email' && action.formName === LOGIN_FORM),
  password: createWrapperReducer(field, action => action.field === 'password' && action.formName === LOGIN_FORM),
  errors: createWrapperReducer(errors, action => action.formName === LOGIN_FORM),
});

export const getEmail = state => state.email;

export const getPassword = state => state.password;

export const getErrors = state => state.errors;

