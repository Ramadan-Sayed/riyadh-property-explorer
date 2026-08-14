import { QueryStatus } from '../types/search.js';
import { isWithinAreaRange } from '../utils/spatial-helpers.js';
export class SpatialSearchService {
    dataset = [];
    constructor(initialData = []) {
        this.dataset = initialData;
    }
    setDataset(data) {
        this.dataset = data;
    }
    // تنفيذ البحث وتصفية النتائج بجميع المعايير
    filter(criteria) {
        const startTime = performance.now();
        const filtered = this.dataset.filter(item => {
            const props = item.properties || {};
            // 1. تصفية النص (اسم الحي أو اسم العقار)
            const matchQuery = !criteria.query ||
                (props.district_ar && props.district_ar.includes(criteria.query)) ||
                (props.name && props.name.includes(criteria.query));
            // 2. تصفية نوع العقار (Category)
            const matchCategory = !criteria.category || props.category === criteria.category;
            // 3. تصفية نطاق المساحة باستعمال الدالة المساعدة
            const matchArea = isWithinAreaRange(props.area || 0, criteria.minArea, criteria.maxArea);
            // دمج الشروط الثلاثة معاً (AND Logic)
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
}
//# sourceMappingURL=SpatialSearchService.js.map