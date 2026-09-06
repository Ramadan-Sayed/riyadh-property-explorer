// src/app/core/services/spatial-math.service.ts
import { Coordinates } from './coordinate.service.js';

export class SpatialMathService {
  private static readonly EARTH_RADIUS_METERS = 6371000; // R = 6371 km

  /**
   * الجزء الأول — حساب المسافة بين نقطتين A و B عبر معادلة Haversine
   */
  public static haversineDistance(pointA: Coordinates, pointB: Coordinates): number {
    const lat1Rad = (pointA.latitude * Math.PI) / 180;
    const lat2Rad = (pointB.latitude * Math.PI) / 180;
    
    const deltaLatRad = ((pointB.latitude - pointA.latitude) * Math.PI) / 180;
    const deltaLonRad = ((pointB.longitude - pointA.longitude) * Math.PI) / 180;

    const a =
      Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) *
      Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Number((this.EARTH_RADIUS_METERS * c).toFixed(2)); // النتيجة بالمتر
  }
}