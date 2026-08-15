export function isWithinAreaRange(area: number, minArea?: number, maxArea?: number): boolean {
  if (minArea !== undefined && area < minArea) return false;
  if (maxArea !== undefined && area > maxArea) return false;
  return true;
}



export function validateSpatialBounds(bounds: number[]): boolean {
  return bounds.length === 4 && bounds.every(coord => !isNaN(coord));
}



export function filterGeoJsonLayer(layerGroup: any, matchedIds: Set<string>): void {
  layerGroup.eachLayer((layer: any) => {
    const id = layer.feature?.properties?.id;
    if (matchedIds.has(id)) {
      layer.addTo(layer._map || layerGroup._map);
    } else {
      layer.remove();
    }
  });
}