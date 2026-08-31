import { FilterCriteria, DEFAULT_FILTER_CRITERIA } from './filter.model.js';

type Listener<T> = (value: T) => void;

// تطبيق نمط Observer/Subject محلي دون الحاجة لمكتبة خارجية للمتصفح
export class SimpleBehaviorSubject<T> {
  private listeners: Listener<T>[] = [];

  constructor(private value: T) {}

  public getValue(): T {
    return this.value;
  }

  public next(newValue: T): void {
    this.value = newValue;
    this.listeners.forEach((listener) => listener(this.value));
  }

  public subscribe(listener: Listener<T>): { unsubscribe: () => void } {
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
  private static instance: FilterState;
  private criteriaSubject = new SimpleBehaviorSubject<FilterCriteria>(DEFAULT_FILTER_CRITERIA);

  // إتاحة الخاصية للاشتراك التفاعلي بنفس نمط اليوم 5 و 6
  public criteria$ = this.criteriaSubject;

  public static getInstance(): FilterState {
    if (!FilterState.instance) {
      FilterState.instance = new FilterState();
    }
    return FilterState.instance;
  }

  public get currentCriteria(): FilterCriteria {
    return this.criteriaSubject.getValue();
  }

  public updateCriteria(partialCriteria: Partial<FilterCriteria>): void {
    const updated = { ...this.currentCriteria, ...partialCriteria };
    this.criteriaSubject.next(updated);
  }

  public resetFilters(): void {
    this.criteriaSubject.next(DEFAULT_FILTER_CRITERIA);
  }
}