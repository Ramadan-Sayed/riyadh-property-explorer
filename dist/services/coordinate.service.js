// في الدوال المساعدة تأكيد صرامة الأنواع وعدم وجود any
export class CoordinateService {
    formatUTMOutput(utm) {
        return `Zone ${utm.zone} E:${utm.easting}m N:${utm.northing}m`;
    }
}
//# sourceMappingURL=coordinate.service.js.map