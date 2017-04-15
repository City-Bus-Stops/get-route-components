import React, { PropTypes } from 'react';
import { Sidebar, Button } from 'semantic-ui-react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import Collapse from 'react-collapse';

import '../../../public/mapkey-icons/L.Icon.Mapkey';

import { pointToLayer } from '../../utils';

import MapSidebar from '../MapSidebar/MapSidebar';

const MapComponent = ({ data, center, zoom, maxZoom, minZoom, zoomControl, isSidebarOpen }) => (
  <div className="leaflet-pushable">
    <Sidebar.Pushable>
      <Collapse isOpened={!isSidebarOpen}>
        <Button
          circular
          color="grey"
          icon="list"
          size="huge"
          className="sidebar-trigger-button"
        />
      </Collapse>
      <MapSidebar isSidebarOpen={isSidebarOpen} />
      <Sidebar.Pusher id="map">
        <div className="leaflet-container-main">
          <Map
            center={center}
            zoom={zoom}
            maxZoom={maxZoom}
            minZoom={minZoom}
            zoomControl={zoomControl}
          >
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
              data={data}
              pointToLayer={pointToLayer}
              style={{ color: 'black', weight: 5, opacity: 0.65 }}
            />
          </Map>
        </div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
);

MapComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape),
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  zoomControl: PropTypes.bool,
  isSidebarOpen: PropTypes.bool,
};

MapComponent.defaultProps = {
  data: [],
  center: [53.66946, 23.824368],
  zoom: 13,
  maxZoom: 16,
  minZoom: 11,
  zoomControl: false,
  isSidebarOpen: false,
};

export default MapComponent;
