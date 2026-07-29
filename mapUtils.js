// mapUtils.js - موديل خاص بمعالجة وإعداد الخريطة الأساسية للرياض
export const initMap = (containerId, center = [24.7136, 46.6753], zoom = 11) => {
    const map = L.map(containerId).setView(center, zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    // 💡 حفظ المرجع في window ليصل إليه أي مكان بالتطبيق
    window.map = map;

    return map;
};

// إضافة دالة الانتقال السلس للخريطة
export function flyToLocation(lat, lng, zoom = 16) {
    if (window.map) {
        window.map.flyTo([lat, lng], zoom, { duration: 1.5 });
    } else {
        console.warn('⚠️ الخريطة غير مهيأة بعد على window.map');
    }
}


