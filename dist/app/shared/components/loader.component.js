export class LoaderComponent {
    element = null;
    constructor() {
        this.element = document.getElementById('map-loader');
    }
    show(message = 'جاري تحميل البيانات...') {
        if (!this.element) {
            this.element = document.getElementById('map-loader');
        }
        if (this.element) {
            const textNode = this.element.querySelector('span:not(.spinner)');
            if (textNode)
                textNode.textContent = message;
            this.element.style.display = 'flex';
        }
    }
    hide() {
        if (!this.element) {
            this.element = document.getElementById('map-loader');
        }
        if (this.element) {
            this.element.style.display = 'none';
        }
    }
}
//# sourceMappingURL=loader.component.js.map