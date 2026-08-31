import { FilterState } from './filter.state.js';

export class FilterComponent {
  private filterState = FilterState.getInstance();
  private container: HTMLElement | null = null;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId);
    this.bindEvents();
  }

  // 🟢 إضافة الدالة المطلوبة لتغذية الأحياء والأنواع ديناميكياً
  public initOptions(features: any[]): void {
    if (!features || !Array.isArray(features)) return;

    // استخراج الأحياء الفريدة
    const districts = Array.from(
      new Set(
        features
          .map((f) => f.properties?.district || f.properties?.district_ar)
          .filter(Boolean)
      )
    ).sort();

    // استخراج أنواع العقارات الفريدة
    const types = Array.from(
      new Set(
        features
          .map((f) => f.properties?.type || f.properties?.category)
          .filter(Boolean)
      )
    ).sort();

    this.populateDropdown('sel-district', districts, 'جميع الأحياء');
    this.populateDropdown('sel-type', types, 'جميع الأنواع');
  }

  private populateDropdown(elementId: string, items: string[], defaultText: string): void {
    const select = document.getElementById(elementId) as HTMLSelectElement;
    if (!select) return;

    select.innerHTML = `<option value="">${defaultText}</option>`;
    items.forEach((item) => {
      const option = document.createElement('option');
      option.value = item;
      option.textContent = item;
      select.appendChild(option);
    });
  }

  public bindEvents(): void {
    const parseNum = (val: string): number | null => (val.trim() === '' ? null : Number(val));

    // استماع المدخلات المتقدمة
    document.getElementById('txt-search')?.addEventListener('input', (e) => {
      this.filterState.updateCriteria({ searchTerm: (e.target as HTMLInputElement).value.trim() });
    });

    document.getElementById('sel-district')?.addEventListener('change', (e) => {
      this.filterState.updateCriteria({ district: (e.target as HTMLSelectElement).value || null });
    });

    document.getElementById('sel-type')?.addEventListener('change', (e) => {
      this.filterState.updateCriteria({ propertyType: (e.target as HTMLSelectElement).value || null });
    });

    document.getElementById('num-min-price')?.addEventListener('input', (e) => {
      this.filterState.updateCriteria({ minPrice: parseNum((e.target as HTMLInputElement).value) });
    });

    document.getElementById('num-max-price')?.addEventListener('input', (e) => {
      this.filterState.updateCriteria({ maxPrice: parseNum((e.target as HTMLInputElement).value) });
    });

    document.getElementById('num-min-area')?.addEventListener('input', (e) => {
      this.filterState.updateCriteria({ minArea: parseNum((e.target as HTMLInputElement).value) });
    });

    document.getElementById('num-max-area')?.addEventListener('input', (e) => {
      this.filterState.updateCriteria({ maxArea: parseNum((e.target as HTMLInputElement).value) });
    });

    document.getElementById('num-min-price-sqm')?.addEventListener('input', (e) => {
      this.filterState.updateCriteria({ minPricePerSqm: parseNum((e.target as HTMLInputElement).value) });
    });

    document.getElementById('num-max-price-sqm')?.addEventListener('input', (e) => {
      this.filterState.updateCriteria({ maxPricePerSqm: parseNum((e.target as HTMLInputElement).value) });
    });

    // زر إعادة الضبط
    document.getElementById('btn-clear-filters')?.addEventListener('click', () => {
      const inputs = document.querySelectorAll<HTMLInputElement>('#spatial-search input');
      const selects = document.querySelectorAll<HTMLSelectElement>('#spatial-search select');

      inputs.forEach((input) => (input.value = ''));
      selects.forEach((select) => (select.value = ''));

      this.filterState.resetFilters();
    });
  }
}