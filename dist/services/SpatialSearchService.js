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
        // 1. تنقية وتجهيز نص البحث أولاً لضمان الأمان
        const cleanQuery = this.sanitizeQuery(criteria.query || '');
        const filtered = this.dataset.filter(item => {
            const props = item.properties || {};
            // 2. تصفية النص باستخدام cleanQuery بعد التنقية
            const matchQuery = !cleanQuery ||
                (props.district_ar && props.district_ar.includes(cleanQuery)) ||
                (props.name && props.name.includes(cleanQuery));
            // 3. تصفية نوع العقار (Category)
            const matchCategory = !criteria.category || props.category === criteria.category;
            // 4. تصفية نطاق المساحة باستعمال الدالة المساعدة
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
    // دالة تنقية واستبعاد الرموز الخاصة لمنع أخطاء الـ Regex والرموز المفاجئة
    sanitizeQuery(query) {
        return query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim();
    }
}
//# sourceMappingURL=SpatialSearchService.js.map