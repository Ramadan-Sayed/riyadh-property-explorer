export class ErrorToastComponent {
  private containerId = 'error-toast-card';

  public showError(message: string, onRetry: () => void): void {
    this.removeExisting();

    const toast = document.createElement('div');
    toast.id = this.containerId;
    toast.style.cssText = `
      position: absolute;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%);
      background: #ef4444;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
      z-index: 2000;
      display: flex;
      align-items: center;
      gap: 15px;
      font-size: 0.9rem;
    `;

    toast.innerHTML = `
      <span>⚠️ ${message}</span>
      <button id="btn-toast-retry" style="
        background: white;
        color: #ef4444;
        border: none;
        padding: 4px 12px;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
      ">إعادة المحاولة</button>
    `;

    document.querySelector('.map-viewport')?.appendChild(toast);

    document.getElementById('btn-toast-retry')?.addEventListener('click', () => {
      this.removeExisting();
      onRetry();
    });
  }

  public removeExisting(): void {
    const el = document.getElementById(this.containerId);
    if (el) el.remove();
  }
}