import { ISpatialSearchCriteria, ISearchResult, QueryStatus } from '../types/search.js';

export class SpatialSearchService<T extends { properties: Record<string, any> }> {
    private dataset: T[] = [];

    constructor(initialData: T[] = []) {
        this.dataset = initialData;
    }

    public setDataset(data: T[]): void {
        this.dataset = data;
    }

    //   تنفيذ البحث وتصفية النتائج
    public filter(criteria: ISpatialSearchCriteria): ISearchResult<T> {
        const filtered = this.dataset.filter(item => {
            const props = item.properties || {};
            const matchQuery = !criteria.query || 
            (props.district_ar && props.district_ar.includes(criteria.query)) ||
            (props.name && props.name.includes(criteria.query));
            
            return matchQuery;
        });

        return {
            totalMatches: filtered.length,
            results: filtered,
            executionTimeMs: 0,
            status: filtered.length ? QueryStatus.SUCCESS : QueryStatus.EMPTY
        };
    }
}
