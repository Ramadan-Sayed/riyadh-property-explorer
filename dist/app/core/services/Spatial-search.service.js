import { calculatePricePerSqm } from '../../utils/spatial-helpers.js';
export class SpatialSearchService {
    // 🟢 مصدر بيانات موحد دون استهلاك إضافي للذاكرة
    originalProperties = [];
    setDataset(data) {
        this.originalProperties = data || [];
    }
    getDataset() {
        return this.originalProperties;
    }
    applyFilters(criteria) {
        if (!this.originalProperties.length)
            return [];
        const cleanQuery = (criteria.searchTerm || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim().toLowerCase();
        return this.originalProperties.filter((feature) => {
            const props = feature.properties || {};
            // 1. فلتر نص البحث (الإصلاح والحي والاسم)
            const matchSearch = !cleanQuery ||
                (props.id && String(props.id).toLowerCase().includes(cleanQuery)) ||
                (props.district && props.district.toLowerCase().includes(cleanQuery)) ||
                (props.district_ar && props.district_ar.includes(cleanQuery)) ||
                (props.name && props.name.toLowerCase().includes(cleanQuery));
            if (!matchSearch)
                return false;
            // 2. فلتر الحي ونوع العقار
            const matchDistrict = !criteria.district || props.district === criteria.district || props.district_ar === criteria.district;
            if (!matchDistrict)
                return false;
            const matchType = !criteria.propertyType || criteria.propertyType === 'ALL' || props.type === criteria.propertyType || props.category === criteria.propertyType;
            if (!matchType)
                return false;
            // 3. نطاق السعر (Price Range)
            const price = Number(props.price) || 0;
            if (criteria.minPrice !== null && criteria.minPrice !== undefined && price < criteria.minPrice)
                return false;
            if (criteria.maxPrice !== null && criteria.maxPrice !== undefined && price > criteria.maxPrice)
                return false;
            // 4. نطاق المساحة (Area Range)
            const area = Number(props.area) || 0;
            if (criteria.minArea !== null && criteria.minArea !== undefined && area < criteria.minArea)
                return false;
            if (criteria.maxArea !== null && criteria.maxArea !== undefined && area > criteria.maxArea)
                return false;
            // 5. نطاق سعر المتر المربع (Price per m²)
            const pricePerSqm = calculatePricePerSqm(price, area);
            if (criteria.minPricePerSqm !== null && criteria.minPricePerSqm !== undefined) {
                if (pricePerSqm === null || pricePerSqm < criteria.minPricePerSqm)
                    return false;
            }
            if (criteria.maxPricePerSqm !== null && criteria.maxPricePerSqm !== undefined) {
                if (pricePerSqm === null || pricePerSqm > criteria.maxPricePerSqm)
                    return false;
            }
            return true;
        });
    }
}
//# sourceMappingURL=Spatial-search.service.js.map