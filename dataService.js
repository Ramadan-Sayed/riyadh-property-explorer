// dataService.js - خدمة جلب البيانات الجغرافية
export const fetchRiyadhProperties = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.warn(`Warning: Fetch failed with status ${response.status}`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to load GIS data: ", error);
        return null;
    }
};