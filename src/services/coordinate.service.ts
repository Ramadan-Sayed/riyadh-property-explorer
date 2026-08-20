import { UTMCoords } from "../app/models/core/coordinate.model";

// في الدوال المساعدة تأكيد صرامة الأنواع وعدم وجود any
export class CoordinateService {
  formatUTMOutput(utm: UTMCoords): string {
    return `Zone ${utm.zone} E:${utm.easting}m N:${utm.northing}m`;
  }
}
