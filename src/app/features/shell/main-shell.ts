export class MainShell {
  private sidebar: HTMLElement | null = null;
  private toggleBtn: HTMLElement | null = null;

  constructor() {
    this.initLayout();
    this.bindEvents();
  }

  private initLayout(): void {
    const appContainer = document.getElementById('app-container') || document.body;
    const existingWidgets = Array.from(document.querySelectorAll('.feature-card, .widget-card, .converter-card, #survey-station-container'));

    appContainer.innerHTML = `
      <div class="shell-wrapper">

        <!-- Header -->
        <header class="main-header">
          <div class="header-brand">
            <span class="logo-icon">🗺️</span>
            <h1>Riyadh Property Explorer</h1>
          </div>
          <div class="header-actions">
            <span class="status-badge">V1.0</span>
          </div>
        </header>

        <!-- Main Content Area (يحتوي فقط على الـ Sidebar والـ Map) -->
        <div class="main-content">
          <!-- Collapsible Sidebar -->
          <aside id="main-sidebar" class="sidebar">
            <button id="btn-toggle-sidebar" class="toggle-btn" title="طي/فتح القائمة">
              <span class="toggle-icon">❮</span>
            </button>
            <div class="sidebar-content">
              <h2>لوحة التحكم والميزات</h2>
              <div id="sidebar-widgets-container">
                <!-- أشرطة أدوات البحث والفلترة ستوضع هنا -->
              </div>
            </div>
          </aside>

          <!-- Map Viewport -->
          <main class="map-viewport">
            <div id="main-map" style="width: 100%; height: 100%;"></div>

            <!-- Map Loader State Indicator -->
            <div id="map-loader" class="map-loader" style="display: none;">
              <span class="spinner"></span>
              <span>جاري تحميل الطبقات...</span>
            </div>

            <!-- Custom Map Controls -->
            <div class="custom-map-controls">
              <button id="btn-zoom-in" class="map-btn" title="تكبير">+</button>
              <button id="btn-zoom-out" class="map-btn" title="تصغير">-</button>
              <button id="btn-reset-extent" class="map-btn" title="إعادة النطاق الجغرافي للرياض">🎯</button>
              <div class="basemap-switcher">
                <button id="btn-basemap-osm" class="basemap-btn active">شارع</button>
                <button id="btn-basemap-sat" class="basemap-btn">قمر صناعي</button>
              </div>
            </div>
          </main>
        </div> <!-- 👈 إغلاق main-content هنا بشكل صحيح! -->

        <!-- Bottom Stats Bar (يقع أسفل main-content مباشرة) -->
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
    
    const widgetsContainer = document.getElementById('sidebar-widgets-container');
    if (widgetsContainer && existingWidgets.length > 0) {
      existingWidgets.forEach(widget => widgetsContainer.appendChild(widget));
    }
  }

  private mountExistingWidgets(): void {
    const widgetsContainer = document.getElementById('sidebar-widgets-container');
    if (!widgetsContainer) return;

    const elementsToMove = [
        '#land-calculator-widget',
        '#converter-widget',
        '#search-widget',
        '#layer-manager-widget',
        '.feature-card',
        '.widget-card',
        '#survey-station-container'
    ];

    elementsToMove.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el && !widgetsContainer.contains(el)) {
              widgetsContainer.appendChild(el);
          }
        });
    });
  }

  private bindEvents(): void {
    if (this.toggleBtn && this.sidebar) {
      this.toggleBtn.addEventListener('click', () => {
        this.sidebar?.classList.toggle('collapsed');
      });
    }
  }
}