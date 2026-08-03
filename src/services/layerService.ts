import { LayerConfig } from '../types/layer';

export class LayerService {
  private layers: Map<string, LayerConfig> = new Map();

  addLayer(config: LayerConfig): void {
    this.layers.set(config.id, config);
  }
}