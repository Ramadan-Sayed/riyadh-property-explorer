// داخل converter.component.ts
// المسار الصحيح للوصول لمجلد services من داخل components:
import { CoordinateService } from '../app/models/services/coordinate.service.js';
export class ConverterUIComponent {
    coordService = new CoordinateService();
    constructor() {
        this.initEvents();
    }
    initEvents() {
        const convertBtn = document.getElementById('convertBtn');
        if (!convertBtn)
            return;
        convertBtn.addEventListener('click', () => this.onConvert());
    }
    onConvert() {
        const latInput = document.getElementById('latInput');
        const lngInput = document.getElementById('lngInput');
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
        }
        else {
            alert('الإحداثيات المكتوبة خارج نطاق مدينة الرياض!');
        }
    }
}
//# sourceMappingURL=converter.component.js.map