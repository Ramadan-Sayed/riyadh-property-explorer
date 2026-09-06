import { Coordinates } from './coordinate.service.js';
import proj4 from 'proj4'; // التأكد من الاعتماد على proj4 المعرف بالمشروع



// تعريف مسقط UTM Zone 38N المخصص لمنطقة الرياض (EPSG:32638)
proj4.defs("EPSG:32638", "+proj=utm +zone=38 +datum=WGS84 +units=m +no_defs");

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



  /**
   * التحويل من WGS84 [lon, lat] إلى UTM Zone 38N [X, Y] بالمتر
   */
  public static projectToUTM38N(coords: Coordinates): [number, number] {
    return proj4("EPSG:4326", "EPSG:32638", [coords.longitude, coords.latitude]);
  }

  /**
   * الجزء الثاني — حساب المساحة (Polygon Area) باستخدام Shoelace Formula على الإحداثيات المسقطة
   */
  public static calculatePolygonArea(polygonCoords: Coordinates[]): number {
    if (polygonCoords.length < 3) return 0;

    // 1. إسقاط الإحداثيات إلى UTM Zone 38N للحصول على أمتار حقيقية (X, Y)
    const utmPoints = polygonCoords.map(coord => this.projectToUTM38N(coord));

    // 2. تطبيق معادلة Shoelace Formula
    let areaSum = 0;
    const n = utmPoints.length;

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const [x1, y1] = utmPoints[i];
      const [x2, y2] = utmPoints[j];
      areaSum += x1 * y2 - y1 * x2;
    }

    return Number((Math.abs(areaSum) / 2).toFixed(2)); // النتيجة بالمتر المربع m²
  }

  /**
   * الجزء الثالث — حساب المحيط (Perimeter) كـ مجموع المسافات الجيوديسية بين النقاط
   */
  public static calculatePolygonPerimeter(polygonCoords: Coordinates[]): number {
    if (polygonCoords.length < 2) return 0;

    let totalPerimeter = 0;
    const n = polygonCoords.length;

    for (let i = 0; i < n; i++) {
      const nextIndex = (i + 1) % n;
      totalPerimeter += this.haversineDistance(polygonCoords[i], polygonCoords[nextIndex]);
    }

    return Number(totalPerimeter.toFixed(2)); // النتيجة بالمتر الطولي
  }
}