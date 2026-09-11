import { CoordinateService } from './coordinate.service.js';
describe('CoordinateService', () => {
    let service;
    beforeEach(() => {
        service = new CoordinateService();
    });
    describe('Validation', () => {
        it('should validate correct latitude and longitude ranges', () => {
            expect(service.isValidLatitude(24.7136)).toBe(true);
            expect(service.isValidLongitude(46.6753)).toBe(true);
        });
        it('should reject invalid coordinates out of bounds', () => {
            expect(service.isValidLatitude(95.0)).toBe(false);
            expect(service.isValidLatitude(-91.0)).toBe(false);
            expect(service.isValidLongitude(185.0)).toBe(false);
        });
        it('should correctly handle boundary values', () => {
            expect(service.isValidLatitude(90)).toBe(true);
            expect(service.isValidLatitude(-90)).toBe(true);
            expect(service.isValidLongitude(180)).toBe(true);
            expect(service.isValidLongitude(-180)).toBe(true);
        });
    });
    describe('Conversions', () => {
        it('should accurately convert Decimal Degrees to DMS format', () => {
            const dms = service.decimalToDMS(24.7136);
            expect(dms).toEqual({ degrees: 24, minutes: 42, seconds: 48.96 });
        });
        it('should accurately convert DMS to Decimal Degrees', () => {
            const decimal = service.dmsToDecimal(24, 42, 48.96);
            expect(decimal).toBeCloseTo(24.7136, 4);
        });
    });
});
//# sourceMappingURL=coordinate.service.spec.js.map