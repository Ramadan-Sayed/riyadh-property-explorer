import { calculatePricePerSqm } from '../../../utils/spatial-helpers.js';
export class PropertyDetailsComponent {
    container;
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }
    render(property, onZoom, onClose) {
        if (!this.container)
            return;
        if (!property) {
            this.container.innerHTML = '';
            this.container.classList.add('hidden');
            return;
        }
        const props = property.properties || {};
        const geom = property.geometry;
        // 🟢 معالجة الإحداثيات: GeoJSON هو [Long, Lat] وحولناه لـ Leaflet [Lat, Long]
        let leafletCoords = [0, 0];
        if (geom && geom.type === 'Point' && Array.isArray(geom.coordinates)) {
            leafletCoords = [geom.coordinates[1], geom.coordinates[0]];
        }
        const price = Number(props.price) || 0;
        const area = Number(props.area) || 0;
        const pricePerSqm = calculatePricePerSqm(price, area);
        this.container.innerHTML = `
      <div class="property-details-card widget-card">
        <div class="details-header">
          <h4>${props.name || 'تفاصيل العقار'}</h4>
          <button id="btn-close-details" class="close-btn" title="إغلاق">&times;</button>
        </div>
        <div class="details-body">
          <p><b>معرف العقار (ID):</b> ${props.id || 'غير محدد'}</p>
          <p><b>الحي:</b> ${props.district || props.district_ar || 'غير محدد'}</p>
          <p><b>النوع:</b> ${props.type || props.category || 'غير محدد'}</p>
          <p><b>المساحة:</b> ${area ? `${area} م²` : 'غير محددة'}</p>
          <p><b>السعر:</b> ${price ? `${price.toLocaleString()} ريال` : 'غير محدد'}</p>
          <p><b>سعر المتر المربع:</b> ${pricePerSqm ? `${pricePerSqm.toLocaleString()} ريال/م²` : 'غير محدد'}</p>
          <p><b>الإحداثيات (Lat, Long):</b> ${leafletCoords[0].toFixed(5)}, ${leafletCoords[1].toFixed(5)}</p>
        </div>
        <div class="details-actions">
          <button id="btn-zoom-property" class="btn btn-primary">🔍 التكبير إلى العقار (Zoom)</button>
        </div>
      </div>
    `;
        this.container.classList.remove('hidden');
        // ربط الحدثين للإغلاق والتكبير
        document.getElementById('btn-close-details')?.addEventListener('click', () => {
            if (onClose)
                onClose();
        });
        document.getElementById('btn-zoom-property')?.addEventListener('click', () => {
            if (onZoom && leafletCoords[0] !== 0)
                onZoom(leafletCoords);
        });
    }
}
//# sourceMappingURL=property-details.component.js.map