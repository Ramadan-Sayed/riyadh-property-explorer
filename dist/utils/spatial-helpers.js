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
//# sourceMappingURL=spatial-helpers.js.map