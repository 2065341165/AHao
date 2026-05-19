import { ArticleCard } from './ArticleCard.js';

export class ArticleGrid {
  constructor(articles = []) {
    this.articles = articles;
  }

  render() {
    return `
      <section class="articles">
        <h2>最新文章</h2>
        <div class="article-grid" id="articleGrid">
        </div>
      </section>
    `;
  }

  mount(container) {
    container.innerHTML = this.render();
    this.update(this.articles);
  }

  update(articles) {
    this.articles = articles;
    const grid = document.getElementById('articleGrid');
    grid.innerHTML = '';
    
    articles.forEach(article => {
      const card = new ArticleCard(article);
      card.mount(grid);
    });
  }
}