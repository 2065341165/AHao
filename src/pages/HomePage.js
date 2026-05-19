import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { Hero } from '../components/Hero.js';
import { CategoryNav } from '../components/CategoryNav.js';
import { ArticleGrid } from '../components/ArticleGrid.js';
import { fetchArticles } from '../utils/api.js';

class HomePage {
  constructor() {
    this.articleGrid = null;
  }

  async init() {
    await this.renderHeader();
    await this.renderFooter();
    await this.renderHero();
    await this.renderContent();
  }

  async renderHeader() {
    const header = new Header('home');
    header.mount(document.getElementById('header-container'));
  }

  async renderFooter() {
    const footer = new Footer();
    footer.mount(document.getElementById('footer-container'));
  }

  async renderHero() {
    const hero = new Hero();
    hero.mount(document.getElementById('hero-container'));
  }

  async renderContent() {
    const articles = await fetchArticles();
    
    const categories = this.getCategories(articles);
    const categoryNav = new CategoryNav(categories, 'all');
    categoryNav.mount(document.getElementById('category-container'));
    
    this.articleGrid = new ArticleGrid(articles);
    this.articleGrid.mount(document.getElementById('article-container'));
    
    categoryNav.setOnCategoryChange(async (category) => {
      const filteredArticles = category === 'all' 
        ? articles 
        : articles.filter(a => a.category === category);
      this.articleGrid.update(filteredArticles);
    });
  }

  getCategories(articles) {
    const categoryMap = {};
    articles.forEach(article => {
      categoryMap[article.category] = (categoryMap[article.category] || 0) + 1;
    });
    
    return [
      { id: 'all', name: '全部', count: articles.length },
      ...Object.entries(categoryMap).map(([name, count]) => ({
        id: name,
        name,
        count
      }))
    ];
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const page = new HomePage();
  await page.init();
});