'use client';

import { FunctionComponent } from 'react';
import { TileLayer } from 'react-leaflet';
import { LocationMarker } from './LocationMarker';
import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet';
import { MapContainerStyled } from './styles';

interface IMapProps {
  callback: (latlng: LatLng) => void;
  marker: { lat: number; lng: number };
}

const Map: FunctionComponent<IMapProps> = ({ callback, marker }) => {
  return (
    <>
      <MapContainerStyled
        center={marker}
        zoom={15}
      >
        <TileLayer
          attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          initialMarker={marker}
          callback={(latlng) => {
            callback(latlng);
          }}
        />
      </MapContainerStyled>
    </>
  );
};

export default Map;
