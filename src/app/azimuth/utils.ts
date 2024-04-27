interface ILatLng {
  lat: number;
  lng: number;
}

export function getAzimuth(origin: ILatLng, destination: ILatLng) {
  const lon1 = origin.lng,
    lat1 = origin.lat,
    lon2 = destination.lng,
    lat2 = destination.lat;

  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
  const y = Math.sin(deltaLambda) * Math.cos(phi2);

  const azimuth = (Math.atan2(y, x) * 180) / Math.PI;
  return ((azimuth + 360) % 360).toFixed(2);
}
