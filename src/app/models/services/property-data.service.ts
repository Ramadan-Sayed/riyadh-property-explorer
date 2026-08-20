import { PropertyGeoJSON, PropertyFeature } from '../core/mock-data/property.model';
export class PropertyDataService {
  private geojsonPath = 'assets/data/properties.geojson';

  async loadProperties(): Promise<PropertyGeoJSON | null> {
    try {
      const response = await fetch(this.geojsonPath);
      if (!response.ok) throw new Error('فشل في تحميل البيانات');
      
      const data: PropertyGeoJSON = await response.json();
      
      data.features.forEach((f: PropertyFeature) => {
        if (f.properties.price && f.properties.area) {
          f.properties.pricePerMeter = Math.round(f.properties.price / f.properties.area);
        }
      });

      return data;
    } catch (error) {
      console.error('Error loading GeoJSON data:', error);
      return null;
    }
  }
}