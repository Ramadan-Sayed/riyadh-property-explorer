import { SpatialSearchService } from './Spatial-search.service.js';
import type { PropertyFeature } from '../models/property.model.js';
import type { FilterCriteria } from '../../features/filters/filter.model.js';

describe('SpatialSearchService - Filtering Engine', () => {
  let service: SpatialSearchService;

  const mockDataset: PropertyFeature[] = [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [46.6753, 24.7136] },
      properties: { 
        id: '1', 
        name: 'فيلا الملقا', 
        district: 'الملقا', 
        type: 'villa', 
        price: 2000000, 
        area: 400 
      }
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [46.6800, 24.7200] },
      properties: { 
        id: '2', 
        name: 'شقة الياسمين', 
        district: 'الياسمين', 
        type: 'apartment', 
        price: 800000, 
        area: 160 
      }
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [46.6850, 24.7250] },
      properties: { 
        id: '3', 
        name: 'أرض الملقا', 
        district: 'الملقا', 
        type: 'land', 
        price: 5000000, 
        area: 1000 
      }
    }
  ];

  beforeEach(() => {
    service = new SpatialSearchService();
    service.setDataset(mockDataset);
  });

  it('should filter properties by search term (text matching)', () => {
    const criteria: FilterCriteria = { searchTerm: 'فيلا' };
    const results = service.applyFilters(criteria);
    expect(results.length).toBe(1);
    expect(results[0].properties.id).toBe('1');
  });

  it('should filter by specific district and propertyType', () => {
    const criteria: FilterCriteria = { district: 'الملقا', propertyType: 'land' };
    const results = service.applyFilters(criteria);
    expect(results.length).toBe(1);
    expect(results[0].properties.id).toBe('3');
  });

  it('should apply range filters (Price and Area)', () => {
    const criteria: FilterCriteria = { minPrice: 500000, maxPrice: 1000000, minArea: 100 };
    const results = service.applyFilters(criteria);
    expect(results.length).toBe(1);
    expect(results[0].properties.id).toBe('2');
  });

  it('should support combining multiple criteria simultaneously', () => {
    const criteria: FilterCriteria = {
      district: 'الملقا',
      minPrice: 1500000,
      maxPrice: 3000000,
      propertyType: 'villa'
    };
    const results = service.applyFilters(criteria);
    expect(results.length).toBe(1);
    expect(results[0].properties.id).toBe('1');
  });

  it('should return empty array when zero results match criteria', () => {
    const criteria: FilterCriteria = { district: 'النرجس' };
    const results = service.applyFilters(criteria);
    expect(results.length).toBe(0);
  });

  it('should return full dataset when filters are cleared', () => {
    const criteria: FilterCriteria = {};
    const results = service.applyFilters(criteria);
    expect(results.length).toBe(3);
  });
});