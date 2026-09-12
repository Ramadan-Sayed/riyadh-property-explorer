import { CoordinateService } from './coordinate.service.js';
describe('CoordinateService', () => {
    describe('Validation', () => {
        it('should validate correct latitude and longitude ranges', () => {
            expect(CoordinateService.isValidLatitude(24.7136)).toBe(true);
            expect(CoordinateService.isValidLongitude(46.6753)).toBe(true);
        });
        it('should reject invalid coordinates out of bounds', () => {
            expect(CoordinateService.isValidLatitude(95.0)).toBe(false);
            expect(CoordinateService.isValidLatitude(-91.0)).toBe(false);
            expect(CoordinateService.isValidLongitude(185.0)).toBe(false);
        });
        it('should correctly handle boundary values', () => {
            expect(CoordinateService.isValidLatitude(90)).toBe(true);
            expect(CoordinateService.isValidLatitude(-90)).toBe(true);
            expect(CoordinateService.isValidLongitude(180)).toBe(true);
            expect(CoordinateService.isValidLongitude(-180)).toBe(true);
        });
    });
    describe('Conversions', () => {
        it('should accurately convert Decimal Degrees to DMS format', () => {
            const dms = CoordinateService.decimalToDMS(24.7136, true);
            expect(dms).toEqual({
                degrees: 24,
                minutes: 42,
                seconds: 48.96,
                direction: 'N'
            });
        });
        it('should accurately convert DMS to Decimal Degrees', () => {
            const dmsInput = {
                degrees: 24,
                minutes: 42,
                seconds: 48.96,
                direction: 'N'
            };
            const decimal = CoordinateService.dmsToDecimal(dmsInput);
            expect(decimal).toBeCloseTo(24.7136, 4);
        });
    });
    describe('GeoJSON Helpers', () => {
        it('should format coordinates correctly to GeoJSON position [lon, lat]', () => {
            const position = CoordinateService.toGeoJSONPosition({ latitude: 24.7136, longitude: 46.6753 });
            expect(position).toEqual([46.6753, 24.7136]);
        });
    });
});
//# sourceMappingURL=coordinate.service.spec.js.map