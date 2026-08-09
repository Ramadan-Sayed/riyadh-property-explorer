// // أنواع العقارات المتاحة للفلترة
// export type PropertyCategory = 'ALL' | 'RESIDENTIAL' | 'COMMERCIAL' | 'AGRICULTURAL';

// // معايير البحث المكاني
// export interface ISpatialSearchCriteria {
//   query?: string;              // النص المدخل (اسم الحي)
//   category?: PropertyCategory; // نوع العقار
//   minArea?: number;            // الحد الأدنى للمساحة
//   maxArea?: number;            // الحد الأقصى للمساحة
// }

// // نتيجة عملية البحث
// export interface ISearchResult<T> {
//   totalMatches: number;
//   results: T[];
//   executionTimeMs: number;
// }