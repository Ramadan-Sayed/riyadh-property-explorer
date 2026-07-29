// 💡 الـ Imports دائمًا في أعلى الملف
import { CoordinateService } from '../app/models/services/coordinate.service.js';
// استيراد دوال الخريطة من الجذر (عدّل المسار النسبي حسب مكان الملف)
// ✅ تعريف الدوال القادمة من mapUtils.js بدون الحاجة لـ Declaration File
declare const flyToLocation: (lat: number, lng: number, zoom?: number) => void;
declare const addConvertedPointMarker: (lat: number, lng: number, popupText: string) => void;

export class ConverterUIComponent {
  private coordService = new CoordinateService();

  constructor() {
    this.initEvents();
  }

  private initEvents(): void {
    const convertBtn = document.getElementById('convertBtn');
    if (!convertBtn) return;

    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyResult());
    }

    convertBtn.addEventListener('click', () => this.onConvert());
  }

  private onConvert(): void {
    const latInput = document.getElementById('latInput') as HTMLInputElement;
    const lngInput = document.getElementById('lngInput') as HTMLInputElement;
    const resultBox = document.getElementById('resultBox');
    const resultText = document.getElementById('resultText');

    const lat = parseFloat(latInput.value);
    const lng = parseFloat(lngInput.value);

    if (isNaN(lat) || isNaN(lng)) {
      alert('الرجاء إدخال إحداثيات صالحة!');
      return;
    }

    if (this.coordService.isWithinRiyadh({ lat, lng })) {
      const result = this.coordService.convertWGS84ToUTM({ lat, lng });

      if (resultBox && resultText) {
        resultText.innerText = `النظام: ${result.formattedString}`;
        resultBox.style.display = 'block';

        // 🚀 التفاعل مع الخريطة بعد نجاح التحويل:
        flyToLocation(lat, lng);
        addConvertedPointMarker(lat, lng, resultText.innerText);
      }
    } else {
      alert('الإحداثيات المكتوبة خارج نطاق مدينة الرياض!');
    }
  }

  // دالة نسخ النتيجة إلى الحافظة
  private copyResult(): void {
    const resultText = document.getElementById('resultText');
    if (resultText && resultText.innerText) {
      navigator.clipboard.writeText(resultText.innerText)
        .then(() => {
          alert('📋 تم نسخ إحداثيات UTM إلى الحافظة بنجاح!');
        })
        .catch(err => {
          console.error('فشل النسخ: ', err);
        });
    }
  }
}