// أو إذا أردت دعم الأنواع الدقيقة بعد تثبيت @types/leaflet:
// declare const L: typeof import('leaflet');
export function getBoundsFromFeatures(features) {
    const coordinates = features.map(f => f.geometry.coordinates).flat(2);
    return L.latLngBounds(coordinates.map(c => [c[1], c[0]]));
}
export function isWithinAreaRange(area, minArea, maxArea) {
    if (minArea !== undefined && area < minArea)
        return false;
    if (maxArea !== undefined && area > maxArea)
        return false;
    return true;
}
export function validateSpatialBounds(bounds) {
    return bounds.length === 4 && bounds.every(coord => !isNaN(coord));
}
export function filterGeoJsonLayer(layerGroup, matchedIds) {
    layerGroup.eachLayer((layer) => {
        const id = layer.feature?.properties?.id;
        if (matchedIds.has(id)) {
            layer.addTo(layer._map || layerGroup._map);
        }
        else {
            layer.remove();
        }
    });
}
//# sourceMappingURL=spatial-helpers.js.map