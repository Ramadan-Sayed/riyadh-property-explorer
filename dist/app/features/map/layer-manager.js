import * as L from 'leaflet';
import { LoaderComponent } from '../../shared/components/loader.component.js';
import { ErrorToastComponent } from '../../shared/components/error-toast.component.js';
export class LayerManager {
    map;
    geoJsonLayer = null;
    loader = new LoaderComponent();
    errorToast = new ErrorToastComponent();
    constructor(mapInstance) {
        this.map = mapInstance;
    }
    async loadRiyadhProperties(dataPath = 'assets/data/riyadh-properties.geojson') {
        try {
            this.loader.show('جاري تحميل بيانات عقارات الرياض...');
            this.errorToast.removeExisting();
            const response = await fetch(dataPath);
            if (!response.ok) {
                throw new Error('فشل الاستجابة من الخادم');
            }
            const data = await response.json();
            if (this.geoJsonLayer) {
                this.map.removeLayer(this.geoJsonLayer);
            }
            this.geoJsonLayer = L.geoJSON(data, {
                style: () => ({
                    color: '#008080',
                    weight: 2,
                    fillColor: '#00a896',
                    fillOpacity: 0.4
                })
            }).addTo(this.map);
        }
        catch (error) {
            console.error('Error loading GeoJSON:', error);
            this.errorToast.showError('تعذر تحميل بيانات الخريطة', () => {
                this.loadRiyadhProperties(dataPath);
            });
        }
        finally {
            this.loader.hide();
        }
    }
}
//# sourceMappingURL=layer-manager.js.map