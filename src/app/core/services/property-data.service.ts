import {
  PropertyGeoJSON,
  PropertyFeature,
} from "../../core/models/property.model";


export interface GeoJsonFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: any;
  };
  properties: Record<string, any>;
}

export interface GeoJsonFeatureCollection {
  type: string;
  features: GeoJsonFeature[];
}

export class PropertyDataService {
  private dataUrl: string;

  constructor(dataUrl: string = './data/riyadh-properties.geojson') {
    this.dataUrl = dataUrl;
  }

  /**
   * جلب ملف GeoJSON وإرجاع الـ FeatureCollection
   */
  public async loadProperties(): Promise<GeoJsonFeatureCollection> {
    const response = await fetch(this.dataUrl);
    if (!response.ok) {
      throw new Error(`فشل في جلب البيانات: ${response.statusText}`);
    }
    const data: GeoJsonFeatureCollection = await response.json();
    return data;
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


