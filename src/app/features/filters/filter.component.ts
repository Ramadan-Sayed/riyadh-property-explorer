import { FilterState } from './filter.state.js';

export class FilterComponent {
  private filterState = FilterState.getInstance();

  public bindEvents(): void {
    const parseNum = (val: string): number | null => (val.trim() === '' ? null : Number(val));

    // استماع الفلاتر المتقدمة
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

    // 🟢 الخطوة 6: إعادة ضبط الفلاتر الكاملة
    document.getElementById('btn-clear-filters')?.addEventListener('click', () => {
      const inputs = document.querySelectorAll<HTMLInputElement>('#spatial-search input');
      const selects = document.querySelectorAll<HTMLSelectElement>('#spatial-search select');

      inputs.forEach((input) => (input.value = ''));
      selects.forEach((select) => (select.value = ''));

      this.filterState.resetFilters();
    });
  }
}