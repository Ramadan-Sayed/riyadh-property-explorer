export class PropertyDataService {
    dataUrl;
    constructor(dataUrl = './data/riyadh-properties.geojson') {
        this.dataUrl = dataUrl;
    }
    /**
     * جلب ملف GeoJSON وإرجاع الـ FeatureCollection
     */
    async loadProperties() {
        const response = await fetch(this.dataUrl);
        if (!response.ok) {
            throw new Error(`فشل في جلب البيانات: ${response.statusText}`);
        }
        const data = await response.json();
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
    }
    catch (error) {
        console.error('❌ Unit Test Failed:', error);
        return false;
    }
}
//# sourceMappingURL=property-data.service.js.map