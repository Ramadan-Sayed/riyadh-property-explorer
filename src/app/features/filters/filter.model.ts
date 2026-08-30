export interface FilterCriteria {
  searchTerm: string;
  district: string | null;
  propertyType: string | null;

  // فلاتر اليوم 6 المتقدمة
  minPrice: number | null;
  maxPrice: number | null;

  minArea: number | null;
  maxArea: number | null;

  minPricePerSqm: number | null;
  maxPricePerSqm: number | null;
}

export const DEFAULT_FILTER_CRITERIA: FilterCriteria = {
  searchTerm: '',
  district: null,
  propertyType: null,
  minPrice: null,
  maxPrice: null,
  minArea: null,
  maxArea: null,
  minPricePerSqm: null,
  maxPricePerSqm: null,
};