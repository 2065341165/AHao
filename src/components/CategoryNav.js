export class CategoryNav {
  constructor(categories, activeCategory = 'all') {
    this.categories = categories;
    this.activeCategory = activeCategory;
    this.onCategoryChange = null;
  }

  render() {
    return `
      <section id="categories" class="categories">
        <h2>文章分类</h2>
        <div class="category-list">
          ${this.categories.map(cat => `
            <button 
              class="category-btn ${this.activeCategory === cat.id ? 'active' : ''}" 
              data-category="${cat.id}"
            >
              ${cat.name} (${cat.count})
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  mount(container) {
    container.innerHTML = this.render();

    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        this.activeCategory = category;
        if (this.onCategoryChange) {
          this.onCategoryChange(category);
        }
      });
    });
  }

  setOnCategoryChange(callback) {
    this.onCategoryChange = callback;
  }
}