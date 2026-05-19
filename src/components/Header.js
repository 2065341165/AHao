export class Header {
  constructor(currentPage = 'home') {
    this.currentPage = currentPage;
  }

  render() {
    const navItems = [
      { label: '首页', href: 'index.html', active: this.currentPage === 'home' },
      { label: '关于', href: 'about.html', active: this.currentPage === 'about' },
      { label: '分类', href: 'index.html#categories', active: false }
    ];

    return `
      <header class="header">
        <nav class="nav">
          <div class="container">
            <a href="index.html" class="logo">My Blog</a>
            <ul class="nav-links">
              ${navItems.map(item => `
                <li><a href="${item.href}" ${item.active ? 'class="active"' : ''}>${item.label}</a></li>
              `).join('')}
            </ul>
          </div>
        </nav>
      </header>
    `;
  }

  mount(container) {
    container.innerHTML = this.render();
  }
}