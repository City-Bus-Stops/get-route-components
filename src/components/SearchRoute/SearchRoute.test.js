import React from 'react';
import ReactDOM from 'react-dom';
import SearchRoute from './SearchRoute';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <SearchRoute
      from=""
      to=""
      routes={[]}
      errors={{}}
      routeInfo={{}}
      findUserAddress={() => {}}
      searchRoute={() => {}}
      setFormField={() => {}}
      actions={{
        formSubmitFailed: () => {},
        getRouteInfo: () => {},
        clearRouteInfo: () => {},
        getRouteGeoData: () => {},
      }}
    />, div);
});
