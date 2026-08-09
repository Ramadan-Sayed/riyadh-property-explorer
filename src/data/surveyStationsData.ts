import { SurveyStation } from '../types/survey';

export const mockSurveyStations: SurveyStation[] = [
  // المحطات الأصلية
  { id: 'st1', code: 'ST-001', coordinates: [24.7136, 46.6753], elevation: 620 }, // العليا
  { id: 'st2', code: 'ST-002', coordinates: [24.7180, 46.6800], elevation: 615 }, // السليمانية
  { id: 'st3', code: 'ST-003', coordinates: [24.7100, 46.6700], elevation: 622 }, // المربع

  // المحطات الـ 17 الإضافية الموزعة على أحياء الرياض
  { id: 'st4', code: 'ST-004', coordinates: [24.8125, 46.6234], elevation: 645 }, // الملقا
  { id: 'st5', code: 'ST-005', coordinates: [24.8210, 46.6540], elevation: 650 }, // الياسمين
  { id: 'st6', code: 'ST-006', coordinates: [24.8450, 46.6812], elevation: 658 }, // النرجس
  { id: 'st7', code: 'ST-007', coordinates: [24.8620, 46.5980], elevation: 662 }, // القيروان
  { id: 'st8', code: 'ST-008', coordinates: [24.7701, 46.6321], elevation: 638 }, // العقيق
  { id: 'st9', code: 'ST-009', coordinates: [24.7542, 46.6710], elevation: 630 }, // النفل
  { id: 'st10', code: 'ST-010', coordinates: [24.7930, 46.7215], elevation: 625 }, // الازدهار
  { id: 'st11', code: 'ST-011', coordinates: [24.7380, 46.7550], elevation: 610 }, // الروضة
  { id: 'st12', code: 'ST-012', coordinates: [24.7015, 46.7820], elevation: 602 }, // النسيم الغربي
  { id: 'st13', code: 'ST-013', coordinates: [24.6850, 46.8200], elevation: 595 }, // السلي
  { id: 'st14', code: 'ST-014', coordinates: [24.6310, 46.7130], elevation: 580 }, // البطحاء / الديرة
  { id: 'st15', code: 'ST-015', coordinates: [24.5820, 46.7410], elevation: 568 }, // العزيزية
  { id: 'st16', code: 'ST-016', coordinates: [24.5410, 46.7020], elevation: 555 }, // الشفا
  { id: 'st17', code: 'ST-017', coordinates: [24.6050, 46.6110], elevation: 612 }, // السويدي
  { id: 'st18', code: 'ST-018', coordinates: [24.6540, 46.5820], elevation: 628 }, // ظهرة لبن
  { id: 'st19', code: 'ST-019', coordinates: [24.7210, 46.5610], elevation: 640 }, // الخزامى / عرقة
  { id: 'st20', code: 'ST-020', coordinates: [24.7520, 46.6020], elevation: 642 },  // حطين

  // الـ 15 محطة الإضافية الجديدة (ST-021 إلى ST-035)
  { id: 'st21', code: 'ST-021', coordinates: [24.8850, 46.6120], elevation: 668 }, // العارض
  { id: 'st22', code: 'ST-022', coordinates: [24.8310, 46.7280], elevation: 641 }, // قرطبة
  { id: 'st23', code: 'ST-023', coordinates: [24.8050, 46.7610], elevation: 635 }, // المونسية
  { id: 'st24', code: 'ST-024', coordinates: [24.7810, 46.8120], elevation: 620 }, // الرمال
  { id: 'st25', code: 'ST-025', coordinates: [24.7620, 46.7110], elevation: 629 }, // المغرزات
  { id: 'st26', code: 'ST-026', coordinates: [24.6810, 46.6420], elevation: 618 }, // المعذر
  { id: 'st27', code: 'ST-027', coordinates: [24.6620, 46.7310], elevation: 590 }, // الملز
  { id: 'st28', code: 'ST-028', coordinates: [24.6410, 46.7720], elevation: 588 }, // الروابي
  { id: 'st29', code: 'ST-029', coordinates: [24.6220, 46.8350], elevation: 582 }, // الحمراء / شرق الرياض
  { id: 'st30', code: 'ST-030', coordinates: [24.5910, 46.6620], elevation: 605 }, // بدر / الحزم
  { id: 'st31', code: 'ST-031', coordinates: [24.5210, 46.6410], elevation: 548 }, // عكاظ
  { id: 'st32', code: 'ST-032', coordinates: [24.5620, 46.8100], elevation: 560 }, // المسانع / جنوب شرق
  { id: 'st33', code: 'ST-033', coordinates: [24.6920, 46.5210], elevation: 648 }, // المهدية
  { id: 'st34', code: 'ST-034', coordinates: [24.7780, 46.5510], elevation: 652 }, // جامعة الملك سعود / النخيل
  { id: 'st35', code: 'ST-035', coordinates: [24.8510, 46.7450], elevation: 649 }  // القادسية
];