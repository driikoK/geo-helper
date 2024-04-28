interface ILatLng {
  lat: number;
  lng: number;
}

export function getMidpoint(origin: ILatLng, destination: ILatLng) {
  const lng1 = origin.lng,
    lat1 = origin.lat,
    lng2 = destination.lng,
    lat2 = destination.lat;

  const lat = (lat1 + lat2) / 2;
  const lng = (lng1 + lng2) / 2;

  return { lat, lng };
}
