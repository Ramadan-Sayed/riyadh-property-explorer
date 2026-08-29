import { ISpatialSearchCriteria, ISearchResult, QueryStatus } from '../models/search.model.js';
import { isWithinAreaRange } from '../spatial/spatial-helpers.js';
import { FilterCriteria } from '../../features/filters/filter.model.js';

export class SpatialSearchService<T extends { properties: Record<string, any> }> {
    private dataset: T[] = [];

    constructor(initialData: T[] = []) {
        this.dataset = [...initialData];
    }

    public setDataset(data: T[]): void {
        this.dataset = [...data];
    }

    // 🟢 دالة اليوم 5: تطبيق الفلترة التفاعلية مع FilterCriteria
    public applyFilters(criteria: FilterCriteria): T[] {
        const cleanQuery = this.sanitizeQuery(criteria.searchTerm || '');

        return this.dataset.filter((feature) => {
            const props = feature.properties || {};
            
            // الخطوة 4: البحث حسب Property ID أو District أو Name
            const matchSearch =
                !cleanQuery ||
                (props.id && String(props.id).toLowerCase().includes(cleanQuery.toLowerCase())) ||
                (props.district && props.district.toLowerCase().includes(cleanQuery.toLowerCase())) ||
                (props.district_ar && props.district_ar.includes(cleanQuery)) ||
                (props.name && props.name.toLowerCase().includes(cleanQuery.toLowerCase()));

            // الخطوة 5: الفلترة حسب الحي
            const matchDistrict =
                !criteria.district || props.district === criteria.district || props.district_ar === criteria.district;

            // الخطوة 6: الفلترة حسب النوع
            const matchType =
                !criteria.propertyType ||
                props.type === criteria.propertyType ||
                props.category === criteria.propertyType;

            return matchSearch && matchDistrict && matchType;
        });
    }

    // تنفيذ البحث وتصفية النتائج بجميع المعايير السابقة (مع المحافظة على قياس الأداء)
    public filter(criteria: ISpatialSearchCriteria): ISearchResult<T> {
        const startTime = performance.now();
        const cleanQuery = this.sanitizeQuery(criteria.query || '');

        const filtered = this.dataset.filter(item => {
            const props = item.properties || {};

            const matchQuery = !cleanQuery || 
                (props.district_ar && props.district_ar.includes(cleanQuery)) ||
                (props.name && props.name.includes(cleanQuery));

            const matchCategory = !criteria.category || props.category === criteria.category;
            const matchArea = isWithinAreaRange(props.area || 0, criteria.minArea, criteria.maxArea);

            return matchQuery && matchCategory && matchArea;
        });

        const endTime = performance.now();

        return {
            totalMatches: filtered.length,
            results: filtered,
            executionTimeMs: Number((endTime - startTime).toFixed(2)),
            status: filtered.length ? QueryStatus.SUCCESS : QueryStatus.EMPTY
        };
    }

    private sanitizeQuery(query: string): string {
        return query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim();
    }
}