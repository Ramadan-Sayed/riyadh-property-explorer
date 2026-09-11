export class PerformanceService {
    static instance;
    measurements = new Map();
    constructor() { }
    static getInstance() {
        if (!PerformanceService.instance) {
            PerformanceService.instance = new PerformanceService();
        }
        return PerformanceService.instance;
    }
    startMark(markName) {
        performance.mark(`${markName}-start`);
    }
    endMark(markName, measureName) {
        const start = `${markName}-start`;
        const end = `${markName}-end`;
        performance.mark(end);
        const measure = performance.measure(measureName, start, end);
        const duration = measure.duration;
        if (!this.measurements.has(measureName)) {
            this.measurements.set(measureName, []);
        }
        this.measurements.get(measureName)?.push(duration);
        return duration;
    }
    getSummary(measureName, datasetSize) {
        const values = this.measurements.get(measureName);
        if (!values || values.length === 0)
            return null;
        const sorted = [...values].sort((a, b) => a - b);
        const count = sorted.length;
        const min = sorted[0];
        const max = sorted[count - 1];
        const median = this.getPercentile(sorted, 50);
        const p95 = this.getPercentile(sorted, 95);
        return {
            operation: measureName,
            datasetSize,
            min: Number(min.toFixed(2)),
            median: Number(median.toFixed(2)),
            p95: Number(p95.toFixed(2)),
            max: Number(max.toFixed(2)),
            iterations: count
        };
    }
    getPercentile(sortedValues, percentile) {
        const index = Math.ceil((percentile / 100) * sortedValues.length) - 1;
        return sortedValues[Math.max(0, index)];
    }
    clear() {
        this.measurements.clear();
        performance.clearMarks();
        performance.clearMeasures();
    }
}
//# sourceMappingURL=performance.service.js.map