import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import 'leaflet/dist/leaflet.css';
import '../public/css/index.css';
import '../node_modules/semantic-ui-css/semantic.min.css';
import '../public/mapkey-icons/MapkeyIcons.css';
import '../public/mapkey-icons/L.Icon.Mapkey.css';

import RootContainer from './containers/Root/Root';
import UserManagementContainer from './containers/UserManagement/UserManagement';
import Dashboard from './components/Dashboard/Dashboard';
import SearchRouteContainer from './containers/SearchRoute/SearchRoute';
import LoginContainer from './containers/Login/Login';
import SignupContainer from './containers/Signup/Signup';
import MapContainer from './containers/Map/Map';
import FavoritesContainer from './containers/Favorites/Favorites';
import UsersAdministrationContainer from './containers/UsersAdministration/UsersAdministration';
import DashboardContainer from './containers/Dashboard/Dashboard';
import BusesContainer from './containers/Schedule/Buses/Buses';
import BusRoutesContainer from './containers/Schedule/BusRoutes/BusRoutes';
import RouteBusStopContainer from './containers/Schedule/RouteBusStop/RouteBusStop';
import NotFound from './components/NotFound/NotFound';

import configureStore from './configureStore';
import Auth from './auth';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={RootContainer}>
        <IndexRedirect to="/dashboard" />
        <Route path="dashboard" component={Dashboard} />
        <Route path="search-route" component={SearchRouteContainer} />
        <Route path="map" component={MapContainer} />
        <Route
          path="favorites"
          component={FavoritesContainer}
          onEnter={Auth.checkIsRegisteredAndRedirect}
        />
        <Route
          path="administration"
          onEnter={Auth.checkIsAdminAndRedirect}
          onChange={Auth.checkIsAdminAndRedirect}
        >
          <IndexRedirect to="users" />
          <Route path="users" component={UsersAdministrationContainer} />
          <Route path="dashboard" component={DashboardContainer} />
        </Route>
        <Route path="schedule">
          <Route path="buses" component={BusesContainer} />
          <Route path="buses/:id" component={BusRoutesContainer} />
          <Route path="buses/:id/bus-stops/:busStopId" component={RouteBusStopContainer} />
          <Route path="bus-stops" component={BusesContainer} />
        </Route>
      </Route>
      <Route path="/" component={UserManagementContainer}>
        <Route path="/login" component={LoginContainer} />
        <Route path="/signup" component={SignupContainer} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
