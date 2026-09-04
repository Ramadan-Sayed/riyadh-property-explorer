import { HeaderComponent } from './header.component.js';
import { SidebarComponent } from './sidebar.component.js';
import { StatisticsComponent } from './statistics.component.js';

export class MainShell {
  private header = new HeaderComponent();
  private sidebar = new SidebarComponent();
  private statistics = new StatisticsComponent();
  public isSidebarOpen: boolean = true;
  private detachedWidgets: HTMLElement[] = [];

  constructor() {
    this.preserveExistingWidgets();
    this.buildShell();
    this.initSidebarToggle();
  }

  // 1️⃣ التقاط ونقل جميع عناصر الودجت الحالية للحفظ قبل تدمير الـ DOM
  private preserveExistingWidgets(): void {
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
  private buildShell(): void {
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
  public mountExistingWidgets(): void {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const widgetsToMove = [
      'coordinate-converter',
      'layer-manager-card',
      'spatial-search',
      'spatial-filters'
    ];

    widgetsToMove.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        sidebar.appendChild(element); // ✅ ينقل العنصر بأحداثه المربوطة دون إعادة بناء الـ DOM
      }
    });
  }

  private initSidebarToggle(): void {
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebarEl = document.getElementById('app-sidebar');

    toggleBtn?.addEventListener('click', () => {
      this.isSidebarOpen = !this.isSidebarOpen;
      sidebarEl?.classList.toggle('collapsed', !this.isSidebarOpen);
      window.dispatchEvent(new Event('resize'));
    });
  }
}