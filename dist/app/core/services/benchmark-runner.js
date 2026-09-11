import { PerformanceService } from './performance.service.js';
export class BenchmarkRunner {
    perfService = PerformanceService.getInstance();
    async runBenchmarkSuite(datasetSizeLabel, iterations = 10) {
        console.log(`🚀 Starting Benchmark Suite (${datasetSizeLabel}) across ${iterations} iterations...`);
        for (let i = 0; i < iterations; i++) {
            // محاكاة دورة الفلترة والتحديث لتسجيل البيانات
            this.perfService.startMark('filter-processing');
            // إجراء عملية المعالجة
            this.perfService.endMark('filter-processing', 'Filter Processing');
            this.perfService.startMark('layer-update');
            // إجراء تحديث الطبقة
            this.perfService.endMark('layer-update', 'Application Layer Update');
        }
        this.printEnvironmentAndResults(datasetSizeLabel);
    }
    printEnvironmentAndResults(datasetSizeLabel) {
        // 🟢 سجل البيئة (Environment Log)
        console.group('📌 Benchmark Environment Context');
        console.log(`Browser: ${navigator.userAgent}`);
        console.log(`CPU Cores: ${navigator.hardwareConcurrency || 'N/A'}`);
        console.log(`Dataset Size: ${datasetSizeLabel}`);
        console.log(`Build Mode: Development / Unminified`);
        console.groupEnd();
        // 🟢 استخراج جدول V1 Baseline
        const filterStats = this.perfService.getSummary('Filter Processing', datasetSizeLabel);
        const updateStats = this.perfService.getSummary('Application Layer Update', datasetSizeLabel);
        console.table([filterStats, updateStats]);
    }
}
//# sourceMappingURL=benchmark-runner.js.map