export enum LayerCategory {
  BASEMAP = 'BASEMAP',
  DISTRICTS = 'DISTRICTS',
  PARCELS = 'PARCELS'
}

export interface LayerConfig {
  id: string;
  name: string;
  category: LayerCategory;
  visible: boolean;
  leafletLayer?: any;
}

export type LayerToggleHandler = (layerId: string, isVisible: boolean) => void;