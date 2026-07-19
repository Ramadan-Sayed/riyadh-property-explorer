// mapUtils.js - موديل خاص بمعالجة وإعداد الخريطة الأساسية للرياض
export const initMap = (containerId, center = [24.7136, 46.6753], zoom = 11) => {
    const map = L.map(containerId).setView(center, zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    return map;
};