export function toggleMapLayer(layer, map, show) {
    show ? layer.addTo(map) : layer.remove();
}
export function highlightMatchedFeatures(layerGroup, matchedIds) {
    layerGroup.eachLayer((layer) => {
        if (matchedIds.has(layer.feature?.properties?.id)) {
            if (layer.setStyle)
                layer.setStyle({ color: '#00b4d8', weight: 3, fillOpacity: 0.7 });
        }
    });
}
//# sourceMappingURL=leaflet-helper.js.map