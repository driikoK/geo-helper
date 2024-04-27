'use client'

import React, { FunctionComponent, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';

interface ILocationMarkerProps {
  callback: (latlng: LatLng) => void;
  initialMarker: { lat: number; lng: number };
}

export const LocationMarker: FunctionComponent<ILocationMarkerProps> = ({callback, initialMarker}) => {
  const myIcon = new Icon({
    iconUrl: '/marker.png',
    iconSize: [52, 52],
    iconAnchor: [27, 52],
    popupAnchor: [0, -52]
  });
  const [marker, setMarker] = useState(initialMarker);

  const map = useMapEvents({
    click(e) {
      setMarker(e.latlng);
      callback(e.latlng);
    },
  });

  return (
    <React.Fragment>
      <Marker position={marker} icon={myIcon}>
        <Popup>Твоя позиція {marker.lat} : {marker.lng}</Popup>
      </Marker>
    </React.Fragment>
  );
};
