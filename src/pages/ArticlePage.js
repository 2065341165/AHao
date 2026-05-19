import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { fetchArticleById, fetchCommentsByArticleId, fetchRelatedArticles } from '../utils/api.js';

class ArticlePage {
  async init() {
    await this.renderHeader();
    await this.renderFooter();
    await this.renderArticle();
  }

  async renderHeader() {
    const header = new Header();
    header.mount(document.getElementById('header-container'));
  }

  async renderFooter() {
    const footer = new Footer();
    footer.mount(document.getElementById('footer-container'));
  }

  async renderArticle() {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');
    
    const article = await fetchArticleById(articleId);
    const comments = await fetchCommentsByArticleId(articleId);
    const relatedArticles = await fetchRelatedArticles(articleId, article?.category);

    if (!article) {
      document.body.innerHTML = '<h1>文章不存在</h1>';
      return;
    }

    document.title = `${article.title} - 个人博客`;

    document.getElementById('articleTitle').textContent = article.title;
    document.getElementById('articleAuthor').textContent = article.author;
    document.getElementById('articleDate').textContent = article.createdAt;
    document.getElementById('articleCategory').textContent = article.category;
    document.getElementById('articleContent').innerHTML = article.content;
    document.getElementById('articleImage').src = article.image;
    document.getElementById('articleImage').alt = article.title;

    const articleTags = document.getElementById('articleTags');
    articleTags.innerHTML = article.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    const commentsContainer = document.getElementById('commentsContainer');
    if (comments.length > 0) {
      commentsContainer.innerHTML = comments.map(comment => `
        <div class="comment">
          <div class="comment-author">${comment.author}</div>
          <div class="comment-text">${comment.text}</div>
        </div>
      `).join('');
    } else {
      commentsContainer.innerHTML = '<p style="color: var(--text-muted);">暂无评论</p>';
    }

    const relatedContainer = document.getElementById('relatedContainer');
    if (relatedArticles && relatedArticles.length > 0) {
      relatedContainer.innerHTML = relatedArticles.map(relArticle => `
        <div class="related-item" data-id="${relArticle.id}">
          <div class="related-item-title">${relArticle.title}</div>
          <div class="related-item-category">${relArticle.category}</div>
        </div>
      `).join('');

      document.querySelectorAll('.related-item').forEach(item => {
        item.addEventListener('click', () => {
          window.location.href = `article.html?id=${item.dataset.id}`;
        });
      });
    } else {
      relatedContainer.innerHTML = '<p style="color: var(--text-muted);">暂无相关文章</p>';
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const page = new ArticlePage();
  await page.init();
});