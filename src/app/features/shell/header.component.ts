export class HeaderComponent {
  render(): string {
    return `
      <div class="logo-area">
        <i class="fas fa-layer-group"></i>
        <h1>Riyadh Property Explorer</h1>
      </div>
      <button id="sidebar-toggle-btn" class="btn-toggle">
        <i class="fas fa-bars"></i>
      </button>
    `;
  }
}