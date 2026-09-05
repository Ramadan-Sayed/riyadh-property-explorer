export class CoordinateService {
    /**
     * الخطوة 2 — تحويل الإحداثي العشري إلى DMS
     * 24.7136 -> 24° 42' 48.96" N
     */
    static decimalToDMS(decimal, isLatitude) {
        const direction = isLatitude
            ? (decimal >= 0 ? 'N' : 'S')
            : (decimal >= 0 ? 'E' : 'W');
        const absDecimal = Math.abs(decimal);
        const degrees = Math.floor(absDecimal);
        const minutesDecimal = (absDecimal - degrees) * 60;
        const minutes = Math.floor(minutesDecimal);
        const seconds = Number(((minutesDecimal - minutes) * 60).toFixed(2));
        return {
            degrees,
            minutes,
            seconds,
            direction
        };
    }
    /**
     * الخطوة 4 — التحقق من حدود الإحداثيات الجغرافية (Validation)
     * Latitude: -90 <= lat <= 90
     * Longitude: -180 <= lon <= 180
     */
    static isValidLatitude(lat) {
        return typeof lat === 'number' && !isNaN(lat) && lat >= -90 && lat <= 90;
    }
    static isValidLongitude(lon) {
        return typeof lon === 'number' && !isNaN(lon) && lon >= -180 && lon <= 180;
    }
    static isValidCoordinates(coords) {
        return this.isValidLatitude(coords.latitude) && this.isValidLongitude(coords.longitude);
    }
    /**
     * الخطوة 3 — تحويل DMS إلى Decimal
     * Formula: Decimal = Degrees + (Minutes / 60) + (Seconds / 3600)
     */
    static dmsToDecimal(dms) {
        const { degrees, minutes, seconds, direction } = dms;
        let decimal = degrees + minutes / 60 + seconds / 3600;
        // التعامل مع اتجاهات النصف الجنوبي والغربي
        if (direction === 'S' || direction === 'W') {
            decimal = -decimal;
        }
        return Number(decimal.toFixed(6));
    }
    /**
     * الخطوة 5 — معيار التعامل مع GeoJSON Standard Position
     * يُحدد صراحة أن ترتيب مصفوفة GeoJSON هو دائماً [lon, lat]
     */
    static toGeoJSONPosition(coords) {
        if (!this.isValidCoordinates(coords)) {
            throw new Error('إحداثيات غير صالحة للتحويل إلى GeoJSON Position');
        }
        // GeoJSON Position = [longitude, latitude]
        return [coords.longitude, coords.latitude];
    }
    /**
     * استخراج Coordinates من مصفوفة GeoJSON [lon, lat]
     */
    static fromGeoJSONPosition(position) {
        const [longitude, latitude] = position;
        return { latitude, longitude };
    }
}
//# sourceMappingURL=coordinate.service.js.map