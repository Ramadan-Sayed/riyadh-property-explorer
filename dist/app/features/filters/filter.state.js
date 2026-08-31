import { DEFAULT_FILTER_CRITERIA } from './filter.model.js';
// تطبيق نمط Observer/Subject محلي دون الحاجة لمكتبة خارجية للمتصفح
export class SimpleBehaviorSubject {
    value;
    listeners = [];
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    next(newValue) {
        this.value = newValue;
        this.listeners.forEach((listener) => listener(this.value));
    }
    subscribe(listener) {
        this.listeners.push(listener);
        // إرسال القيمة الحالية فوراً عند الاشتراك
        listener(this.value);
        return {
            unsubscribe: () => {
                this.listeners = this.listeners.filter((l) => l !== listener);
            },
        };
    }
}
export class FilterState {
    static instance;
    criteriaSubject = new SimpleBehaviorSubject(DEFAULT_FILTER_CRITERIA);
    // إتاحة الخاصية للاشتراك التفاعلي بنفس نمط اليوم 5 و 6
    criteria$ = this.criteriaSubject;
    static getInstance() {
        if (!FilterState.instance) {
            FilterState.instance = new FilterState();
        }
        return FilterState.instance;
    }
    get currentCriteria() {
        return this.criteriaSubject.getValue();
    }
    updateCriteria(partialCriteria) {
        const updated = { ...this.currentCriteria, ...partialCriteria };
        this.criteriaSubject.next(updated);
    }
    resetFilters() {
        this.criteriaSubject.next(DEFAULT_FILTER_CRITERIA);
    }
}
//# sourceMappingURL=filter.state.js.map