import * as L from 'leaflet';
// الدالة تضمن تفادي القسمة على صفر أو القيم غير المحددة
export function calculatePricePerSqm(price, area) {
    if (!price || !area || area <= 0) {
        return null;
    }
    return Number((price / area).toFixed(2));
}
export function getBoundsFromFeatures(features) {
    if (!features || !Array.isArray(features) || features.length === 0) {
        return null;
    }
    // استخدام L.geoJSON لاستخراج الحدود بأمان تام مهما كان نوع Geometry (Point, Polygon, MultiPolygon)
    try {
        const tempGeoJson = L.geoJSON(features);
        const bounds = tempGeoJson.getBounds();
        if (bounds && bounds.isValid()) {
            return bounds;
        }
    }
    catch (err) {
        console.warn('Failed to calculate bounds for features:', err);
    }
    return null;
}
//# sourceMappingURL=spatial-helpers.js.map