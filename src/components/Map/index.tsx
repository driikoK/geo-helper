'use client';

import { FunctionComponent } from 'react';
import { TileLayer } from 'react-leaflet';
import { LocationMarker } from './LocationMarker';
import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet';
import { MapContainerStyled } from './styles';
import { IMarkers } from './types';
import { TwoLocationMarkers } from './TwoLocationMarkers';

interface IMapProps {
  callback: (latlng: LatLng | IMarkers) => void;
  marker: { lat: number; lng: number };
  multiple?: boolean;
  markers?: IMarkers;
}

const Map: FunctionComponent<IMapProps> = ({
  callback,
  marker,
  multiple,
  markers = {
    lat1: null,
    lng1: null,
    lat2: null,
    lng2: null,
  },
}) => {
  return (
    <>
      <MapContainerStyled
        center={
          markers.lat1 && markers.lng1
            ? { lat: markers.lat1, lng: markers.lng1 }
            : marker
        }
        zoom={15}
      >
        <TileLayer
          attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />
        {multiple ? (
          <TwoLocationMarkers
            callback={(latlng: IMarkers) => {
              callback(latlng);
            }}
            markers={markers}
          />
        ) : (
          <LocationMarker
            initialMarker={marker}
            callback={(latlng) => {
              callback(latlng);
            }}
          />
        )}
      </MapContainerStyled>
    </>
  );
};

export default Map;
