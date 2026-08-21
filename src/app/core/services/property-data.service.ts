import {
  PropertyGeoJSON,
  PropertyFeature,
} from "../../core/models/property.model";
export class PropertyDataService {
  private geojsonPath = "assets/data/properties.geojson";

  async loadProperties(): Promise<PropertyGeoJSON | null> {
    try {
      const response = await fetch(this.geojsonPath);
      if (!response.ok) throw new Error("فشل في تحميل البيانات");

      const data: PropertyGeoJSON = await response.json();

      data.features.forEach((f: PropertyFeature) => {
        if (f.properties.price && f.properties.area) {
          f.properties.pricePerMeter = Math.round(
            f.properties.price / f.properties.area,
          );
        }
      });

      return data;
    } catch (error) {
      console.error("Error loading GeoJSON data:", error);
      return null;
    }
  }
}


// اختبار سريع للتأكد من عمل الخدمة واسترجاع البيانات
export async function testPropertyService() {
  const service = new PropertyDataService();
  try {
    const data = await service.loadProperties();
    console.log('✅ Unit Test Passed: Loaded properties successfully!', data);
    return true;
  } catch (error) {
    console.error('❌ Unit Test Failed:', error);
    return false;
  }
}