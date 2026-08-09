// import { ISpatialSearchCriteria, ISearchResult } from '../types/search.js';

// export class SpatialSearchService<T extends { properties: Record<string, any> }> {
//   private dataset: T[];

//   constructor(initialData: T[] = []) {
//     this.dataset = initialData;
//   }

//   // تحديث البيانات الأساسية
//   public setDataset(data: T[]): void {
//     this.dataset = data;
//   }

//   // تنفيذ البحث وتصفية النتائج
//   public filter(criteria: ISpatialSearchCriteria): ISearchResult<T> {
//     const startTime = performance.now();

//     const filteredResults = this.dataset.filter(item => {
//       const props = item.properties || {};

//       // 1. مطابقة اسم الحي / النص
//       const matchQuery = !criteria.query || 
//         (props.district_ar && props.district_ar.includes(criteria.query)) ||
//         (props.name && props.name.includes(criteria.query));

//       // 2. مطابقة فئة العقار
//       const matchCategory = !criteria.category || criteria.category === 'ALL' || 
//         props.category === criteria.category;

//       return matchQuery && matchCategory;
//     });

//     const endTime = performance.now();

//     return {
//       totalMatches: filteredResults.length,
//       results: filteredResults,
//       executionTimeMs: Number((endTime - startTime).toFixed(2))
//     };
//   }
// }