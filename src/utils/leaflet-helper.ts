export function toggleMapLayer<T extends { addTo: Function; remove: Function }>(
  layer: T,
  map: any,
  show: boolean,
): void {
  show ? layer.addTo(map) : layer.remove();
}


export function highlightMatchedFeatures(layerGroup: any, matchedIds: Set<string>): void {
  layerGroup.eachLayer((layer: any) => {
    if (matchedIds.has(layer.feature?.properties?.id)) {
      if (layer.setStyle) layer.setStyle({ color: '#00b4d8', weight: 3, fillOpacity: 0.7 });
    }
  });
}