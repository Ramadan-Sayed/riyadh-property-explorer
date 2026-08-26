import { HeaderComponent } from './header.component.js';
import { SidebarComponent } from './sidebar.component.js';
import { StatisticsComponent } from './statistics.component.js';

export class MainShell {
  private header = new HeaderComponent();
  private sidebar = new SidebarComponent();
  private statistics = new StatisticsComponent();

  constructor() {
    this.buildShell();
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
}