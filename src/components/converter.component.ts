// داخل converter.component.ts
// المسار الصحيح للوصول لمجلد services من داخل components:
import { CoordinateService } from '../app/models/services/coordinate.service.js';
export class ConverterUIComponent {
  private coordService = new CoordinateService();

  constructor() {
    this.initEvents();
  }

  

  private initEvents(): void {
    const convertBtn = document.getElementById('convertBtn');
    if (!convertBtn) return;

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
      }
    } else {
      alert('الإحداثيات المكتوبة خارج نطاق مدينة الرياض!');
    }
  }
}

