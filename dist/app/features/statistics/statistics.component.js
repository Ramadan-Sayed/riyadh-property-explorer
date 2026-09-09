// src/app/features/statistics/statistics.component.ts
export class StatisticsComponent {
    containerId;
    constructor(containerId) {
        this.containerId = containerId;
    }
    /**
     * الخطوات 2، 3، 4، 5 — حساب الإحصائيات مع معالجة البيانات غير الصالحة
     */
    calculateStatistics(properties) {
        if (!properties || properties.length === 0) {
            return { totalCount: 0, avgPrice: 0, avgArea: 0, avgPricePerSqm: 0 };
        }
        const totalCount = properties.length;
        let totalPriceSum = 0;
        let totalAreaSum = 0;
        let pricePerSqmSum = 0;
        let validPriceCount = 0;
        let validAreaCount = 0;
        let validPricePerSqmCount = 0;
        properties.forEach((prop) => {
            const p = prop.properties || prop;
            const price = Number(p.price);
            const area = Number(p.area);
            // 1. Average Price Sum
            if (!isNaN(price) && price > 0) {
                totalPriceSum += price;
                validPriceCount++;
            }
            // 2. Average Area Sum
            if (!isNaN(area) && area > 0) {
                totalAreaSum += area;
                validAreaCount++;
            }
            // 3. Average Price/m² (التعريف الصريح: المتوسط الحسابي لكل عقار Σ(price_i / area_i) / N)
            if (!isNaN(price) && !isNaN(area) && price > 0 && area > 0) {
                pricePerSqmSum += price / area;
                validPricePerSqmCount++;
            }
        });
        return {
            totalCount,
            avgPrice: validPriceCount > 0 ? Math.round(totalPriceSum / validPriceCount) : 0,
            avgArea: validAreaCount > 0 ? Math.round(totalAreaSum / validAreaCount) : 0,
            avgPricePerSqm: validPricePerSqmCount > 0 ? Math.round(pricePerSqmSum / validPricePerSqmCount) : 0
        };
    }
    /**
     * عرض النتائج في الواجهة HTML
     */
    render(stats) {
        const container = document.getElementById(this.containerId);
        if (!container)
            return;
        container.innerHTML = `
      <div class="stats-dashboard-card" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 10px; background: #f8fafc; border-radius: 8px;">
        <div class="stat-item">
          <span style="font-size: 12px; color: #64748b;">إجمالي العقارات</span>
          <h4 style="margin: 2px 0; color: #0f172a;">${stats.totalCount}</h4>
        </div>
        <div class="stat-item">
          <span style="font-size: 12px; color: #64748b;">متوسط السعر</span>
          <h4 style="margin: 2px 0; color: #0d9488;">${stats.avgPrice.toLocaleString()} ريال</h4>
        </div>
        <div class="stat-item">
          <span style="font-size: 12px; color: #64748b;">متوسط المساحة</span>
          <h4 style="margin: 2px 0; color: #0284c7;">${stats.avgArea.toLocaleString()} م²</h4>
        </div>
        <div class="stat-item">
          <span style="font-size: 12px; color: #64748b;">متوسط سعر المتر</span>
          <h4 style="margin: 2px 0; color: #6366f1;">${stats.avgPricePerSqm.toLocaleString()} ريال/م²</h4>
        </div>
      </div>
    `;
    }
}
//# sourceMappingURL=statistics.component.js.map