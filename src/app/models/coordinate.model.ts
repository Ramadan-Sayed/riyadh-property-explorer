export enum CRSType {
  WGS84 = 'EPSG:4326',
  UTM38N = 'EPSG:32638'
}

export interface WGS84Coords {
  lat: number;
  lng: number;
}

export interface UTMCoords {
  easting: number;
  northing: number;
  zone: string;
}