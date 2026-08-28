export type DataState = 'loading' | 'success' | 'empty' | 'error';

export interface UiStateOptions {
  message?: string;
  onRetry?: () => void;
}