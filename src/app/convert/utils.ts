const utmLatlng = require("utm-latlng");
const mgrs = require("mgrs")

export function convertToWGS84(lat: number, lng: number) {

  // Convert latitude to WGS84 format
  const latDegrees = Math.floor(Math.abs(lat));
  const latMinutes = Math.floor((Math.abs(lat) - latDegrees) * 60);
  const latSeconds = ((Math.abs(lat) - latDegrees) * 60 - latMinutes) * 60;
  const latDirection = lat >= 0 ? 'N' : 'S';
  const wgs84Lat = `${latDegrees}°${latMinutes}'${latSeconds.toFixed(3)}"${latDirection}`;

  // Convert longitude to WGS84 format
  const lngDegrees = Math.floor(Math.abs(lng));
  const lngMinutes = Math.floor((Math.abs(lng) - lngDegrees) * 60);
  const lngSeconds = ((Math.abs(lng) - lngDegrees) * 60 - lngMinutes) * 60;
  const lngDirection = lng >= 0 ? 'E' : 'W';
  const wgs84Lng = `${lngDegrees}°${lngMinutes}'${lngSeconds.toFixed(3)}"${lngDirection}`;

  return `${wgs84Lat}, ${wgs84Lng}`;
}

export function convertToUTM(lat: number, lng: number) {
  const utmObj = new utmLatlng();
  const utm = utmObj.convertLatLngToUtm(lat, lng, 3);
  if (typeof utm !== 'string') {
  return `${utm.ZoneNumber}${utm.ZoneLetter} ${utm.Easting}E ${utm.Northing}N`
  } else {
    return utm;
  }
}

export function convertToMGRS(lat: number, lng: number) {
  const mgrsResult = mgrs.forward([lng, lat]);
  return mgrsResult;
}
