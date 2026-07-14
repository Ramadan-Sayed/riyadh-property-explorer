// مصفوفة الأحياء المستهدفة للتطوير العقاري في الرياض
const riyadhDistricts = ['Al-Malqa', 'Al-Yasmin', 'Al-Narjis', 'Al-Qairawan'];
console.log('Target Districts Loaded:', riyadhDistricts);
//  مصفوفة كروت العقارات التجريبية (Simulated GeoJSON Properties)
const propertiesRegistry = [
    { id: 1, district: 'Al-Malqa', area: 450, pricePerMeter: 6000 },
    { id: 2, district: 'Al-Yasmin', area: 500, pricePerMeter: 5500 },
    { id: 3, district: 'Al-Narjis', area: 450, pricePerMeter: 5000 },
    { id: 4, district: 'Al-Qairawan', area: 500, pricePerMeter: 4500 }
];

// دالة حساب السعر الإجمالي للعقار في الرياض
function calculateTotalPrice(property) {
    return property.area * property.pricePerMeter;
}

// تحديد كروت الميزات من الـ DOM باستخدام الفئة المشتركة
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('click', () => {
        // إزالة التنشيط عن الكرت النشط حالياً إن وُجد
        document.querySelector('.feature-card.active')?.classList.remove('active');
        // تفعيل الكرت المحدّد الذي ضغط عليه المستخدم فوراً
        card.classList.add('active');
    });
});