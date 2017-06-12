import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DashboardContainer from './Dashboard';
import configureStore from '../../configureStore';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={configureStore()}>
      <DashboardContainer />
    </Provider>, div);
});
