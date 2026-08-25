import { PropertyDataService } from './property-data.service';

describe('PropertyDataService', () => {
  let service: PropertyDataService;

  const mockGeoJson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [46.6753, 24.7136]
        },
        properties: {
          id: 'prop-1',
          name: 'عقار تجريبي',
          price: '1,000,000 SAR'
        }
      }
    ]
  };

  beforeEach(() => {
    service = new PropertyDataService();
    // محاكاة استجابة الشبكة داليًا
    global.fetch = (async () => ({
      ok: true,
      json: async () => mockGeoJson
    })) as unknown as typeof fetch;
  });

  it('يجب أن تقوم الخدمة بتنفيذ loadProperties بنجاح', async () => {
    const data = await service.loadProperties();
    expect(data).toBeDefined();
  });

  it('يجب أن تحتوي البيانات المرجعة على FeatureCollection', async () => {
    const data = await service.loadProperties();
    expect(data.type).toBe('FeatureCollection');
  });

  it('يجب أن يضم مصفوفة features بها عناصر أكبر من 0', async () => {
    const data = await service.loadProperties();
    expect(data.features.length).toBeGreaterThan(0);
  });

  it('يجب أن يحتوي كل عنصر على هندسة مكانية geometry', async () => {
    const data = await service.loadProperties();
    expect(data.features[0].geometry).toBeDefined();
    expect(data.features[0].geometry.type).toBe('Point');
  });
});