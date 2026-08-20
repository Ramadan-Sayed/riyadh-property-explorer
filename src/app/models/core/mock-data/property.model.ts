export interface PropertyProperties {
  id: string;
  title: string;
  district: string;
  type: 'Land' | 'Villa' | 'Building' | 'Commercial';
  price: number;
  area: number; // بالمتر المربع
  pricePerMeter?: number;
}

export interface PropertyFeature {
  type: 'Feature';
  geometry: {
    type: 'Point' | 'Polygon';
    coordinates: any;
  };
  properties: PropertyProperties;
}

export interface PropertyGeoJSON {
  type: 'FeatureCollection';
  features: PropertyFeature[];
}

export interface FilterCriteria {
  searchQuery?: string;
  district?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
}

