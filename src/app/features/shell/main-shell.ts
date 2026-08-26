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

  private initSidebarToggle(): void {
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebarEl = document.getElementById('app-sidebar');

    toggleBtn?.addEventListener('click', () => {
      this.isSidebarOpen = !this.isSidebarOpen;
      
      if (this.isSidebarOpen) {
        sidebarEl?.classList.remove('collapsed');
      } else {
        sidebarEl?.classList.add('collapsed');
      }

      // إعادة حساب أبعاد الخريطة تلقائياً
      window.dispatchEvent(new Event('resize'));
    });
  }
}