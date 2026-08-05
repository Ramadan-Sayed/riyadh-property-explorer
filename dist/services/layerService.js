export class LayerService {
    layers = new Map();
    addLayer(config) {
        this.layers.set(config.id, config);
    }
    toggleLayerVisibility(id) {
        const layer = this.layers.get(id);
        if (layer) {
            layer.visible = !layer.visible;
            return layer.visible;
        }
        return false;
    }
    getLayer(id) {
        return this.layers.get(id);
    }
}
//# sourceMappingURL=layerService.js.map