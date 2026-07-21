// dataService.js - خدمة جلب البيانات الجغرافية
export const fetchRiyadhProperties = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Failed to load GIS data: ", error);
        return null;
    }
};