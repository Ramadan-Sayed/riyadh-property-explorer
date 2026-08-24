export interface ISpatialSearchCriteria {
  query?: string;
  category?: string;
  minArea?: number;
  maxArea?: number;
}

export enum PropertyCategory {
  ALL = 'ALL',
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  AGRICULTURAL = 'AGRICULTURAL'
}

export enum QueryStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  EMPTY = 'EMPTY'
}

export interface ISearchResult<T> {
  totalMatches: number;
  results: T[];
  executionTimeMs: number;
  status: QueryStatus;
}