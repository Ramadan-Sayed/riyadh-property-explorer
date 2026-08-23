export class MainShell {
  private sidebar: HTMLElement | null = null;
  private toggleBtn: HTMLElement | null = null;

  constructor() {
    this.initLayout();
    this.bindEvents();
  }

  private initLayout(): void {
    // الاحتفاظ بالكونتينر الرئيسي أو بدنه
    const appContainer = document.getElementById('app-container') || document.body;
    
    // الاحتفاظ بالعناصر القديمة في الـ DOM قبل إعادة التشكيل لنقلها
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




        <!-- Main Content Area -->
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
    
    // إعادة إرجاع الـ Widgets المحفوظة داخل الـ Sidebar الجديد
    const widgetsContainer = document.getElementById('sidebar-widgets-container');
    if (widgetsContainer && existingWidgets.length > 0) {
      existingWidgets.forEach(widget => widgetsContainer.appendChild(widget));
    }
  }

  private mountExistingWidgets(): void {
    const widgetsContainer = document.getElementById('sidebar-widgets-container');
    if (!widgetsContainer) return;

    // قائمة بمعرفات وكلاسات جميع الأدوات والـ Widgets المتاحة في الواجهة
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