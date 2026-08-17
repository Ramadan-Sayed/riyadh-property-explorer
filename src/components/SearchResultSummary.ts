export class SearchResultSummary {
  public render(count: number, totalArea: number, executionTime: number): string {
    return `
      <div class="search-summary" style="padding: 8px; background: #0f172a; color: #fff; border-radius: 4px;">
        <p>النتائج: ${count}</p>
        <p>المساحة: ${totalArea} م²</p>
        <small>الزمن: ${executionTime} ms</small>
      </div>
    `;
  }
}