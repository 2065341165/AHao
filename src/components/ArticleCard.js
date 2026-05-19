export class ArticleCard {
  constructor(article) {
    this.article = article;
  }

  render() {
    return `
      <article class="article-card" data-id="${this.article.id}">
        <img src="${this.article.image}" alt="${this.article.title}" class="article-image">
        <div class="article-content">
          <span class="article-category">${this.article.category}</span>
          <h3 class="article-title">${this.article.title}</h3>
          <p class="article-excerpt">${this.article.excerpt}</p>
          <div class="article-meta">
            <span>${this.article.author}</span>
            <span>${this.article.createdAt}</span>
          </div>
          <div class="tags">
            ${this.article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      </article>
    `;
  }

  mount(container) {
    const element = document.createElement('div');
    element.innerHTML = this.render();
    container.appendChild(element.firstChild);

    element.querySelector('.article-card').addEventListener('click', () => {
      window.location.href = `article.html?id=${this.article.id}`;
    });
  }
}