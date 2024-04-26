'use client';

import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import React from 'react';

// function toRadian(degree) {
//   return degree*Math.PI/180;
// }

// function getDistance(origin, destination) {
//   // return distance in meters
//   var lon1 = toRadian(origin[1]),
//       lat1 = toRadian(origin[0]),
//       lon2 = toRadian(destination[1]),
//       lat2 = toRadian(destination[0]);

//   var deltaLat = lat2 - lat1;
//   var deltaLon = lon2 - lon1;

//   var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
//   var c = 2 * Math.asin(Math.sqrt(a));
//   var EARTH_RADIUS = 6371;
//   return c * EARTH_RADIUS * 1000;
// }

// function calculateAzimuth(point1, point2) {
//   const [lat1, lon1] = point1;
//   const [lat2, lon2] = point2;

//   const phi1 = lat1 * Math.PI / 180;
//   const phi2 = lat2 * Math.PI / 180;
//   const deltaPhi = (lat2 - lat1) * Math.PI / 180;
//   const deltaLambda = (lon2 - lon1) * Math.PI / 180;

//   const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
//   const y = Math.sin(deltaLambda) * Math.cos(phi2);

//   const azimuth = Math.atan2(y, x) * 180 / Math.PI;
//   return (azimuth + 360) % 360;
// }

// function LocationMarker() {
//   const myIcon = new Icon({
//     iconUrl: 'https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png',
//     iconSize: [52, 52]
//   })
//   const initialMarkers: LatLng = new LatLng(48.922048, 24.710999);
//   const [markers, setMarkers] = useState(initialMarkers);

//   const map = useMapEvents({
//     click(e) {
//       setMarkers(e.latlng);
//     }
//   });

//   return (
//     <React.Fragment>
//       <Marker position={markers} icon={myIcon}><Popup>Твоя позиція {markers.toString()}</Popup></Marker>
//     </React.Fragment>
//   );
// }

export default function Home() {
  // const [markerPosition, setMarkerPosition] = useState([48.922048, 24.710999]);

  // const myIcon = new Icon({
  //   iconUrl: 'https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png',
  //   iconSize: [52, 52]
  // })

  // const handleClick = (e) => {
  //   setMarkerPosition([e.latlng.lat, e.latlng.lng]);
  //   console.log(markerPosition)
  // };

  return (
    <div style={{display: 'flex', flexDirection: 'row', gap: '30px'}}>
      {/* <MapContainer
        center={[48.922048, 24.710999]}
        zoom={13}
        style={{ height: '400px', width: '600px' }}
        onClick={handleClick}
      >
        <TileLayer
          attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <button onClick={() => console.log(calculateAzimuth([48.922048, 24.710999], [48.921921, 24.710398]))}>Моє місце перебування</button>
        <input placeholder='СК 42'/>
        <input placeholder='WGS84'/>
        <input placeholder='UTM'/>
        <input placeholder='MGRS'/>
      </div> */}
      Тут буде головна сторінка
    </div>
  );
}
