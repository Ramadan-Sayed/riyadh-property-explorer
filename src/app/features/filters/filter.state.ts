import { BehaviorSubject, Observable } from 'rxjs';
import { FilterCriteria, DEFAULT_FILTER_CRITERIA } from './filter.model.js';

export class FilterState {
  private static instance: FilterState;
  private criteriaSubject = new BehaviorSubject<FilterCriteria>(DEFAULT_FILTER_CRITERIA);

  public criteria$: Observable<FilterCriteria> = this.criteriaSubject.asObservable();

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