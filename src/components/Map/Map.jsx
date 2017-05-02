import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Button } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import Collapse from 'react-collapse';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { isEmpty } from 'lodash';

import '../../../public/mapkey-icons/L.Icon.Mapkey';

import { generateIcon, pointToLayer } from '../../utils';

import MapSidebar from '../MapSidebar/MapSidebar';
import PointInfo from '../PointInfo/PointInfo';
import GeoLayer from '../GeoLayer/GeoLayer';

const styleForGeoLayer = { color: 'black', weight: 5, opacity: 0.65 };

class MapComponent extends Component {
  componentWillMount() {
    const { findUserLocation } = this.props.actions;

    findUserLocation();
  }

  render() {
    const { data, defaultCenter, zoom, maxZoom, minZoom, zoomControl, isSidebarOpen,
      pointInfo, actions, userCoordinates, mapCenter } = this.props;

    return (
      <div className="leaflet-pushable">
        <PointInfo
          pointInfo={pointInfo}
          closePointInfo={actions.closeMapPointInfo}
          loadRouteBetweenPoints={point => actions.loadRouteBetweenPoints({
            coords: userCoordinates,
            type: 'user',
          }, point)}
        />
        <Sidebar.Pushable>
          <Collapse isOpened={!isSidebarOpen}>
            <Button
              circular
              color="blue"
              icon="list"
              size="huge"
              className="sidebar-trigger-button"
              onClick={actions.toggleSideBar}
            />
          </Collapse>
          <MapSidebar
            isSidebarOpen={isSidebarOpen}
            toggleSideBar={actions.toggleSideBar}
          />
          <Sidebar.Pusher id="map">
            <div className="leaflet-container-main">
              <Map
                center={isEmpty(mapCenter) ? defaultCenter : mapCenter}
                zoom={zoom}
                maxZoom={maxZoom}
                minZoom={minZoom}
                zoomControl={zoomControl}
              >
                <TileLayer
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <GeoLayer
                  data={data}
                  pointToLayer={pointToLayer(actions.getMapPointInfo)}
                  style={styleForGeoLayer}
                />
                {
                  !isEmpty(userCoordinates) &&
                  <Marker
                    position={userCoordinates}
                    icon={generateIcon('user')}
                    onClick={actions.getUserPointInfo}
                  />
                }
              </Map>
              <Button
                circular
                color="blue"
                icon="search"
                size="huge"
                className="map-revert-button"
                onClick={() => browserHistory.goBack()}
              />
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

MapComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape),
  pointInfo: PropTypes.shape().isRequired,
  mapCenter: PropTypes.arrayOf(PropTypes.number),
  defaultCenter: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  zoomControl: PropTypes.bool,
  isSidebarOpen: PropTypes.bool.isRequired,
  userCoordinates: PropTypes.arrayOf(PropTypes.number),
  actions: PropTypes.shape({
    getMapPointInfo: PropTypes.func.isRequired,
    toggleSideBar: PropTypes.func.isRequired,
    closeMapPointInfo: PropTypes.func.isRequired,
    getUserPointInfo: PropTypes.func.isRequired,
    findUserLocation: PropTypes.func.isRequired,
    loadRouteBetweenPoints: PropTypes.func.isRequired,
  }).isRequired,
};

MapComponent.defaultProps = {
  data: [],
  mapCenter: [],
  defaultCenter: [53.66946, 23.824368],
  zoom: 16,
  maxZoom: 16,
  minZoom: 11,
  zoomControl: false,
  userCoordinates: [],
};

export default MapComponent;
