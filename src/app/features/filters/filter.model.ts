export interface FilterCriteria {
  searchTerm: string;
  district: string | null;
  propertyType: string | null;
}

export const DEFAULT_FILTER_CRITERIA: FilterCriteria = {
  searchTerm: '',
  district: null,
  propertyType: null,
};