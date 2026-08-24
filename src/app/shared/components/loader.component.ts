export class LoaderComponent {
  private element: HTMLElement | null = null;

  constructor() {
    this.element = document.getElementById('map-loader');
  }

  public show(message: string = 'جاري تحميل البيانات...'): void {
    if (!this.element) {
      this.element = document.getElementById('map-loader');
    }
    if (this.element) {
      const textNode = this.element.querySelector('span:not(.spinner)');
      if (textNode) textNode.textContent = message;
      this.element.style.display = 'flex';
    }
  }

  public hide(): void {
    if (!this.element) {
      this.element = document.getElementById('map-loader');
    }
    if (this.element) {
      this.element.style.display = 'none';
    }
  }
}