/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { FunctionComponent, useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import { IMarkers } from '../types';

interface ITwoLocationMarkersProps {
  callback: (latlng: IMarkers) => void;
  markers: IMarkers;
}

export const TwoLocationMarkers: FunctionComponent<
  ITwoLocationMarkersProps
> = ({ callback, markers }) => {
  const [marker, setMarker] = useState(markers);

  const IconFirst = new Icon({
    iconUrl: '/marker1.png',
    iconSize: [52, 52],
    iconAnchor: [27, 52],
    popupAnchor: [0, -52],
  });

  const IconSecond = new Icon({
    iconUrl: '/marker2.png',
    iconSize: [52, 52],
    iconAnchor: [27, 52],
    popupAnchor: [0, -52],
  });

  const map = useMapEvents({
    click(e) {
      if (marker.lat1 && marker.lng1 && marker.lat2 && marker.lng2) {
        setMarker({
          lat1: e.latlng.lat,
          lng1: e.latlng.lng,
          lat2: null,
          lng2: null,
        });
      } else if (marker.lat1 && marker.lng1 && !marker.lat2 && !marker.lng2) {
        setMarker((prev) => ({
          ...prev,
          lat2: e.latlng.lat,
          lng2: e.latlng.lng,
        }));
      } else {
        setMarker((prev) => ({
          ...prev,
          lat1: e.latlng.lat,
          lng1: e.latlng.lng,
        }));
      }
    },
  });

  useEffect(() => {
    callback(marker);
  }, [marker]);

  return (
    <React.Fragment>
      {marker.lat1 && marker.lng1 && (
        <Marker position={{ lat: marker.lat1, lng: marker.lng1 }} icon={IconFirst}>
          <Popup>
            Твоя позиція {marker.lat1} : {marker.lng1}
          </Popup>
        </Marker>
      )}
      {marker.lat2 && marker.lng2 && (
        <Marker position={{ lat: marker.lat2, lng: marker.lng2 }} icon={IconSecond}>
          <Popup>
            Твоя позиція {marker.lat2} : {marker.lng2}
          </Popup>
        </Marker>
      )}
      {marker.lat1 && marker.lng1 && marker.lat2 && marker.lng2 && (
        <Polyline
          positions={[
            { lat: marker.lat1, lng: marker.lng1 },
            { lat: marker.lat2, lng: marker.lng2 },
          ]}
        />
      )}
    </React.Fragment>
  );
};
