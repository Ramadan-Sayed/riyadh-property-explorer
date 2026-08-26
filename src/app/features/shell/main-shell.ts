import { HeaderComponent } from './header.component.js';
import { SidebarComponent } from './sidebar.component.js';
import { StatisticsComponent } from './statistics.component.js';

export class MainShell {
  private header = new HeaderComponent();
  private sidebar = new SidebarComponent();
  private statistics = new StatisticsComponent();
  public isSidebarOpen: boolean = true;

  constructor() {
    this.buildShell();
    // ❌ تم إزالة mountExistingWidgets من هنا لأن العناصر لم تُنشأ بعد في الـ DOM
    this.initSidebarToggle();
  }

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

  // 👈 تحويل الدالة إلى public لاستدعائها يدوياً بعد تجهيز المكونات
  public mountExistingWidgets(): void {
    const widgetsContainer = document.getElementById('sidebar-widgets-container');
    if (!widgetsContainer) return;

    const selectors = [
      '#land-calculator-widget',
      '#converter-widget',
      '#search-widget',
      '#layer-manager-widget',
      '.feature-card',
      '.widget-card',
      '#survey-station-container'
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el && !widgetsContainer.contains(el)) {
          widgetsContainer.appendChild(el);
        }
      });
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