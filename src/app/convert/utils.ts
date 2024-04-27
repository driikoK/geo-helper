const utmLatlng = require('utm-latlng');
const mgrs = require('mgrs');

export function convertToWGS84(lat: number, lng: number) {
  try {
    // Convert latitude to WGS84 format
    const latDegrees = Math.floor(Math.abs(lat));
    const latMinutes = Math.floor((Math.abs(lat) - latDegrees) * 60);
    const latSeconds = ((Math.abs(lat) - latDegrees) * 60 - latMinutes) * 60;
    const latDirection = lat >= 0 ? 'N' : 'S';
    const wgs84Lat = `${latDegrees}°${latMinutes}'${latSeconds.toFixed(
      3
    )}"${latDirection}`;

    // Convert longitude to WGS84 format
    const lngDegrees = Math.floor(Math.abs(lng));
    const lngMinutes = Math.floor((Math.abs(lng) - lngDegrees) * 60);
    const lngSeconds = ((Math.abs(lng) - lngDegrees) * 60 - lngMinutes) * 60;
    const lngDirection = lng >= 0 ? 'E' : 'W';
    const wgs84Lng = `${lngDegrees}°${lngMinutes}'${lngSeconds.toFixed(
      3
    )}"${lngDirection}`;

    return `${wgs84Lat}, ${wgs84Lng}`;
  } catch (e) {
    console.log(e);
  }
}

export function convertToUTM(lat: number, lng: number) {
  try {
    const utmObj = new utmLatlng();
    const utm = utmObj.convertLatLngToUtm(lat, lng, 3);
    if (typeof utm !== 'string') {
      return `${utm.ZoneNumber}${utm.ZoneLetter} ${utm.Easting}E ${utm.Northing}N`;
    } else {
      return utm;
    }
  } catch (e) {
    console.log(e);
  }
}

export function convertToMGRS(lat: number, lng: number) {
  try {
    const mgrsResult = mgrs.forward([lng, lat]);
    return mgrsResult;
  } catch (e) {
    console.log(e);
  }
}

export function convertMGRSToLatLng(mgrsS: string) {
  try {
    if (mgrsS.length > 1) {
      const latLngResult = mgrs.toPoint(mgrsS);
      return latLngResult;
    }
  } catch (e) {
    console.log(e);
  }
}

export function convertUTMToLatLng(utmS: string) {
  if (utmS.length > 1) {
    const regex = /(\d+)([A-Z])\s+(\d+\.\d+)([EW])\s+(\d+\.\d+)([NS])/;
    const match = utmS.match(regex);

    if (match) {
      try {
        const zoneNum = parseInt(match[1]);
        const zoneLetter = match[2];
        const easting = parseFloat(match[3]);
        const northing = parseFloat(match[5]);
        const utmObj = new utmLatlng();
        const latLng = utmObj.convertUtmToLatLng(
          easting,
          northing,
          zoneNum,
          zoneLetter
        );
        return latLng;
      } catch (e) {
        console.log(e);
      }
    }
  }
}

export function convertWGS84ToLatLng(wgs84String: string) {
  try {
    if(wgs84String.length > 1) {
      const [latString, lngString] = wgs84String.split(', ');

    // Parse latitude
    const [latDegrees, latMinutes, latSecondsWithDirection] = latString.split(/[°'"]/);
    const latSeconds = parseFloat(latSecondsWithDirection.slice(0, -1));
    const latDirection = latString.slice(-1);
    const latitude = parseFloat(latDegrees) + parseFloat(latMinutes) / 60 + latSeconds / 3600;
    const latitudeSign = latDirection === 'N' ? 1 : -1;

    // Parse longitude
    const [lngDegrees, lngMinutes, lngSecondsWithDirection] = lngString.split(/[°'"]/);
    const lngSeconds = parseFloat(lngSecondsWithDirection.slice(0, -1));
    const lngDirection = lngString.slice(-1);
    const longitude = parseFloat(lngDegrees) + parseFloat(lngMinutes) / 60 + lngSeconds / 3600;
    const longitudeSign = lngDirection === 'E' ? 1 : -1;

    return {
      lat: latitude * latitudeSign,
      lng: longitude * longitudeSign
    };
    }
  } catch (e) {
    console.log(e);
  }
}
