export class MainShell {
  private sidebar: HTMLElement | null = null;
  private toggleBtn: HTMLElement | null = null;

  constructor() {
    this.initLayout();
    this.bindEvents();
  }

  private initLayout(): void {
    const appContainer = document.getElementById('app-container') || document.body;
    
    appContainer.innerHTML = `
      <div class="shell-wrapper">
        <!-- Header -->
        <header class="main-header">
          <div class="header-brand">
            <span class="logo-icon">🗺️</span>
            <h1>مستكشف عقارات الرياض</h1>
          </div>
          <div class="header-actions">
            <span class="status-badge">V1.0</span>
          </div>
        </header>

        <!-- Main Content Area -->
        <div class="main-content">
          <!-- Collapsible Sidebar -->
          <aside id="main-sidebar" class="sidebar">
            <button id="btn-toggle-sidebar" class="toggle-btn" title="طي/فتح القائمة">
              <span class="toggle-icon">❮</span>
            </button>
            <div class="sidebar-content">
              <h3>لوحة التحكم والتحليل</h3>
              <div id="sidebar-widgets-container">
                <!-- أشرطة أدوات البحث والفلترة ستوضع هنا -->
              </div>
            </div>
          </aside>

          <!-- Map Viewport -->
          <main class="map-viewport">
            <div id="main-map" style="width: 100%; height: 100%;"></div>
          </main>
        </div>

        <!-- Bottom Stats Bar -->
        <footer class="bottom-stats-bar">
          <div class="stat-item">
            <span class="stat-label">العقارات المعروضة:</span>
            <span id="stat-total-count" class="stat-value">--</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">متوسط سعر المتر:</span>
            <span id="stat-avg-price" class="stat-value">-- ريال/م²</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">المنطقة الفعالة:</span>
            <span id="stat-active-region" class="stat-value">الرياض</span>
          </div>
        </footer>
      </div>
    `;

    this.sidebar = document.getElementById('main-sidebar');
    this.toggleBtn = document.getElementById('btn-toggle-sidebar');
  }

  private bindEvents(): void {
    if (this.toggleBtn && this.sidebar) {
      this.toggleBtn.addEventListener('click', () => {
        this.sidebar?.classList.toggle('collapsed');
      });
    }
  }
}