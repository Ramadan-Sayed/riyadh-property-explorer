export class SidebarComponent {
    render() {
        return `
      <div class="sidebar-content">
        <h2>لوحة التحكم والميزات</h2>
        <div id="sidebar-widgets-container">
          
          <!-- حاسبة المساحات -->
          <div id="land-calculator-widget" class="widget-card"></div>

          <!-- محول الإحداثيات -->
          <div id="converter-widget" class="widget-card"></div>

          <!-- البحث المكاني -->
          <div id="search-widget" class="widget-card"></div>

          <!-- إدارة الطبقات -->
          <div id="layer-manager-widget" class="widget-card"></div>

        </div>
      </div>
    `;
    }
}
//# sourceMappingURL=sidebar.component.js.map