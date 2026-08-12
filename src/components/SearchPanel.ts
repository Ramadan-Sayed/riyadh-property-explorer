export class SearchPanel {
  private containerId: string;

  constructor(containerId: string) {
    this.containerId = containerId;
  }
  public render(): string {
    return `
        <div class="search-panel-card" style="background: #1a2332; padding: 12px; border-radius: 8px;">
        <input type="text" id="txt-search-query" placeholder="ابحث باسم الحي..." style="width: 100%; margin-bottom: 8px;">
        <select id="sel-property-type" style="width: 100%;">
            <option value="ALL">جميع العقارات</option>
            <option value="RESIDENTIAL">سكني</option>
            <option value="COMMERCIAL">تجاري</option>
        </select>
        </div>
    `;
  }
}