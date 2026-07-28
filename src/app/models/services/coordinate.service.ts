import proj4 from 'proj4';
import { CRSType, WGS84Coords, ConversionResult } from '../coordinate.model.js';
// import { Coordinate } from '../coordinate.model.js';
export class CoordinateService {
  private utm38nProj = '+proj=utm +zone=38 +datum=WGS84 +units=m +no_defs';
  private wgs84Proj = '+proj=longlat +datum=WGS84 +no_defs';

  convertWGS84ToUTM(coords: WGS84Coords): ConversionResult {
    const [easting, northing] = proj4(this.wgs84Proj, this.utm38nProj, [coords.lng, coords.lat]);

    return {
      sourceCRS: CRSType.WGS84,
      targetCRS: CRSType.UTM38N,
      wgs84: coords,
      utm: { 
        easting: Math.round(easting), 
        northing: Math.round(northing), 
        zone: '38N' 
      },
      isValid: true,
      formattedString: `38N E:${Math.round(easting)} N:${Math.round(northing)}`
    };
  }
  isWithinRiyadh(coords: WGS84Coords): boolean {
    const minLat = 24.4000, maxLat = 25.1000;
    const minLng = 46.3000, maxLng = 47.0000;
    return coords.lat >= minLat && coords.lat <= maxLat && coords.lng >= minLng && coords.lng <= maxLng;
  }
}

