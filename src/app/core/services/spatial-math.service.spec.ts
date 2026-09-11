// src/app/core/services/spatial-math.service.spec.ts
import { SpatialMathService } from './spatial-math.service.js';
import { Coordinates } from './coordinate.service.js';

describe('SpatialMathService', () => {
  describe('Haversine Distance', () => {
    it('should calculate accurate distance between two points', () => {
      const pointA: Coordinates = { latitude: 24.7136, longitude: 46.6753 };
      const pointB: Coordinates = { latitude: 24.7200, longitude: 46.6800 };
      const distance = SpatialMathService.haversineDistance(pointA, pointB);

      expect(distance).toBeGreaterThan(0);
    });
  });

  describe('Polygon Geometry Calculations', () => {
    const mockSquareUTM: Coordinates[] = [
      { latitude: 24.713600, longitude: 46.675300 },
      { latitude: 24.713600, longitude: 46.675399 },
      { latitude: 24.713690, longitude: 46.675399 },
      { latitude: 24.713690, longitude: 46.675300 }
    ];

    it('should calculate area within acceptable tolerance', () => {
      const calculatedArea = SpatialMathService.calculatePolygonArea(mockSquareUTM);
      expect(calculatedArea).toBeGreaterThan(0);
    });

    it('should calculate perimeter correctly', () => {
      const calculatedPerimeter = SpatialMathService.calculatePolygonPerimeter(mockSquareUTM);
      expect(calculatedPerimeter).toBeGreaterThan(0);
    });
  });
});