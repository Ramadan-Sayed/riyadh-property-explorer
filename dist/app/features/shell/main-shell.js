import { HeaderComponent } from './header.component.js';
import { SidebarComponent } from './sidebar.component.js';
import { StatisticsComponent } from './statistics.component.js';
export class MainShell {
    header = new HeaderComponent();
    sidebar = new SidebarComponent();
    statistics = new StatisticsComponent();
    isSidebarOpen = true;
    detachedWidgets = [];
    constructor() {
        this.preserveExistingWidgets();
        this.buildShell();
        this.initSidebarToggle();
    }
    // 1️⃣ التقاط ونقل جميع عناصر الودجت الحالية للحفظ قبل تدمير الـ DOM
    preserveExistingWidgets() {
        const ids = [
            'land-calculator-widget',
            'converter-widget',
            'search-widget',
            'layer-manager-card',
            'layer-manager-widget',
            'spatial-search',
            'advanced-spatial-filters',
            'survey-station-container'
        ];
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) {
                this.detachedWidgets.push(el);
            }
        });
        // التقاط باقي الكروت التفاعلية
        document.querySelectorAll('.widget-card, .feature-card').forEach((el) => {
            if (el instanceof HTMLElement && !this.detachedWidgets.includes(el)) {
                this.detachedWidgets.push(el);
            }
        });
    }
    // 2️⃣ بناء واجهة الـ Shell الرئيسية
    buildShell() {
        const appContainer = document.querySelector('.app-container') || document.body;
        appContainer.innerHTML = `
      <div class="app-layout">
        <header class="app-header">${this.header.render()}</header>
        <div class="main-body">
          <aside class="app-sidebar" id="app-sidebar">${this.sidebar.render()}</aside>
          <div class="content-area">
            <main class="map-viewport" id="main-map"></main>
            <footer class="app-statistics">${this.statistics.render()}</footer>
          </div>
        </div>
      </div>
    `;
    }
    // 3️⃣ إعادة حقن الودجت بأمان داخل حاوية القائمة الجانبية
    mountExistingWidgets() {
        const widgetsContainer = document.getElementById('sidebar-widgets-container') ||
            document.getElementById('sidebar-content') ||
            document.querySelector('.sidebar-body') ||
            document.getElementById('app-sidebar');
        if (!widgetsContainer)
            return;
        this.detachedWidgets.forEach((el) => {
            if (el) {
                widgetsContainer.appendChild(el);
            }
        });
    }
    initSidebarToggle() {
        const toggleBtn = document.getElementById('sidebar-toggle-btn');
        const sidebarEl = document.getElementById('app-sidebar');
        toggleBtn?.addEventListener('click', () => {
            this.isSidebarOpen = !this.isSidebarOpen;
            sidebarEl?.classList.toggle('collapsed', !this.isSidebarOpen);
            window.dispatchEvent(new Event('resize'));
        });
    }
}
//# sourceMappingURL=main-shell.js.map