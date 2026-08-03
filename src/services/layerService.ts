import { LayerConfig } from '../types/layer';

export class LayerService {
  private layers: Map<string, LayerConfig> = new Map();

  addLayer(config: LayerConfig): void {
    this.layers.set(config.id, config);
  }

  public toggleLayerVisibility(id: string): boolean {
    const layer = this.layers.get(id);
    if (layer) {
        layer.visible = !layer.visible;
        return layer.visible;
    }
    return false;
  }
}

