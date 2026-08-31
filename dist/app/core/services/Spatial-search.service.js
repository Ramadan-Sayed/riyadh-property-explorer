import { calculatePricePerSqm } from '../../utils/spatial-helpers.js';
export class SpatialSearchService {
    dataset = [];
    setDataset(data) {
        this.dataset = [...data];
    }
    applyFilters(criteria) {
        const cleanQuery = (criteria.searchTerm || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim().toLowerCase();
        return this.dataset.filter((feature) => {
            const props = feature.properties || {};
            // 1. الفلاتر الأساسية
            const matchSearch = !cleanQuery ||
                (props.id && String(props.id).toLowerCase().includes(cleanQuery)) ||
                (props.district && props.district.toLowerCase().includes(cleanQuery)) ||
                (props.district_ar && props.district_ar.includes(cleanQuery)) ||
                (props.name && props.name.toLowerCase().includes(cleanQuery));
            const matchDistrict = !criteria.district || props.district === criteria.district || props.district_ar === criteria.district;
            const matchType = !criteria.propertyType || props.type === criteria.propertyType || props.category === criteria.propertyType;
            // 2. نطاق السعر (Min/Max Price)
            const price = Number(props.price) || 0;
            const matchMinPrice = criteria.minPrice === null || price >= criteria.minPrice;
            const matchMaxPrice = criteria.maxPrice === null || price <= criteria.maxPrice;
            // 3. نطاق المساحة (Min/Max Area)
            const area = Number(props.area) || 0;
            const matchMinArea = criteria.minArea === null || area >= criteria.minArea;
            const matchMaxArea = criteria.maxArea === null || area <= criteria.maxArea;
            // 4. نطاق سعر المتر المربع (Min/Max Price per m²)
            const pricePerSqm = calculatePricePerSqm(price, area);
            const matchMinPriceSqm = criteria.minPricePerSqm === null || (pricePerSqm !== null && pricePerSqm >= criteria.minPricePerSqm);
            const matchMaxPriceSqm = criteria.maxPricePerSqm === null || (pricePerSqm !== null && pricePerSqm <= criteria.maxPricePerSqm);
            // دمج جميع الشروط باستخدام (AND Logic)
            return (matchSearch &&
                matchDistrict &&
                matchType &&
                matchMinPrice &&
                matchMaxPrice &&
                matchMinArea &&
                matchMaxArea &&
                matchMinPriceSqm &&
                matchMaxPriceSqm);
        });
    }
}
//# sourceMappingURL=Spatial-search.service.js.map