// geoHelpers.js - أدوات مساعدة جغرافية لتنسيق البيانات
export const formatCoordinates = (lat, lng) => {
    const fixedLat = parseFloat(lat).toFixed(6);
    const fixedLng = parseFloat(lng).toFixed(6);
    return {
        wkt: `POINT(${fixedLng} ${fixedLat})`,
        array: [parseFloat(fixedLng), parseFloat(fixedLat)]
    };
};