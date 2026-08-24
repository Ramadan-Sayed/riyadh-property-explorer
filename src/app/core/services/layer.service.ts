import { LayerConfig } from '../models/layer.model';

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

  public getLayer(id: string): LayerConfig | undefined {
    return this.layers.get(id);
  }

  getActiveLayers(): LayerConfig[] {
    return Array.from(this.layers.values()).filter(l => l.visible);
  }

}

