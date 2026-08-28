export class UiStateComponent {
    container;
    constructor(containerId) {
        const el = document.getElementById(containerId);
        if (!el) {
            throw new Error(`Container #${containerId} not found`);
        }
        this.container = el;
    }
    render(state, options = {}) {
        this.container.innerHTML = ''; // تفريغ الحاوية
        if (state === 'success') {
            return; // في حالة النجاح نترك الحاوية فارغة أو تعرض المحتوى الأصلي
        }
        const wrapper = document.createElement('div');
        wrapper.className = `ui-state-card ui-state-${state}`;
        switch (state) {
            case 'loading':
                wrapper.innerHTML = `
          <div class="state-spinner"></div>
          <p class="state-message">${options.message || 'جاري تحميل البيانات الجغرافية...'}</p>
        `;
                break;
            case 'error':
                wrapper.innerHTML = `
          <div class="state-icon error-icon">⚠️</div>
          <h4>تعذر تحميل بيانات العقارات</h4>
          <p class="state-message">${options.message || 'حدث خطأ أثناء الاتصال بالسيرفر.'}</p>
          <button id="btn-state-retry" class="btn-retry">إعادة المحاولة 🔄</button>
        `;
                break;
            case 'empty':
                wrapper.innerHTML = `
          <div class="state-icon empty-icon">🔍</div>
          <h4>لا توجد نتائج مطابقة</h4>
          <p class="state-message">${options.message || 'لم يتم العثور على عقارات تطابق معايير البحث الحالية.'}</p>
        `;
                break;
        }
        this.container.appendChild(wrapper);
        // ربط حدث زر Retry في حالة الخطأ
        if (state === 'error' && options.onRetry) {
            document.getElementById('btn-state-retry')?.addEventListener('click', options.onRetry);
        }
    }
}
//# sourceMappingURL=ui-state.component.js.map