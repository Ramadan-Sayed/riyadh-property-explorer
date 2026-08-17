export class SearchResultSummary {
    // دالة حساب مجموع مساحات العقارات المفلترة
    calculateTotalArea(features) {
        return features.reduce((acc, curr) => acc + (curr.properties?.area || 0), 0);
    }
    // دالة توليد كود HTML
    render(count, totalArea, executionTime) {
        return `
        <div class="search-summary" style="padding: 8px; background: #0f172a; color: #fff; border-radius: 4px;">
            <p>النتائج: ${count}</p>
            <p>المساحة: ${totalArea} م²</p>
            <small>الزمن: ${executionTime} ms</small>
        </div>
        `;
    }
}
//# sourceMappingURL=SearchResultSummary.js.map