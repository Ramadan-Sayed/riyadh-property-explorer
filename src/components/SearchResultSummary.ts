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


  public calculateTotalArea(features: any[]): number {
  return features.reduce((acc, curr) => acc + (curr.properties?.area || 0), 0);
}
}

