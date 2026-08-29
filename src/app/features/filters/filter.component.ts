import { FilterState } from './filter.state.js';

export class FilterComponent {
  private filterState = FilterState.getInstance();
  private container: HTMLElement;

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Container #${containerId} not found`);
    this.container = el;
  }

  public initOptions(features: any[]): void {
    // الخطوة 5 و 6: اشتقاق الأحياء وأنواع العقارات الفريدة ديناميكياً من GeoJSON
    const districts = Array.from(
      new Set(features.map((f) => f.properties?.district).filter(Boolean))
    ).sort();

    const types = Array.from(
      new Set(features.map((f) => f.properties?.type || f.properties?.category).filter(Boolean))
    ).sort();

    this.populateDropdown('sel-district', districts, 'جميع الأحياء');
    this.populateDropdown('sel-type', types, 'جميع الأنواع');
    this.bindEvents();
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

  private bindEvents(): void {
    const searchInput = document.getElementById('txt-search') as HTMLInputElement;
    const districtSelect = document.getElementById('sel-district') as HTMLSelectElement;
    const typeSelect = document.getElementById('sel-type') as HTMLSelectElement;
    const clearBtn = document.getElementById('btn-clear-filters');

    searchInput?.addEventListener('input', () => {
      this.filterState.updateCriteria({ searchTerm: searchInput.value.trim() });
    });

    districtSelect?.addEventListener('change', () => {
      this.filterState.updateCriteria({ district: districtSelect.value || null });
    });

    typeSelect?.addEventListener('change', () => {
      this.filterState.updateCriteria({ propertyType: typeSelect.value || null });
    });

    clearBtn?.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (districtSelect) districtSelect.value = '';
      if (typeSelect) typeSelect.value = '';
      this.filterState.resetFilters();
    });
  }
}