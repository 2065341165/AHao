let articles = [];
let comments = [];

async function loadData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    articles = data.articles;
    comments = data.comments;
    return true;
  } catch (error) {
    console.error('Failed to load data:', error);
    return false;
  }
}

function renderArticles(filteredArticles) {
  const articleGrid = document.getElementById('articleGrid');
  if (!articleGrid) return;

  articleGrid.innerHTML = filteredArticles.map(article => `
    <article class="article-card" data-id="${article.id}">
      <img src="${article.image}" alt="${article.title}" class="article-image">
      <div class="article-content">
        <span class="article-category">${article.category}</span>
        <h3 class="article-title">${article.title}</h3>
        <p class="article-excerpt">${article.excerpt}</p>
        <div class="article-meta">
          <span>${article.author}</span>
          <span>${article.createdAt}</span>
        </div>
        <div class="tags">
          ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      window.location.href = `article.html?id=${id}`;
    });
  });
}

function filterArticles(category) {
  if (category === 'all') {
    renderArticles(articles);
  } else {
    const filtered = articles.filter(article => article.category === category);
    renderArticles(filtered);
  }

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
    document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
  });
}

async function initHomePage() {
  await loadData();
  renderArticles(articles);

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterArticles(btn.dataset.category);
    });
  });
}

async function initArticlePage() {
  await loadData();
  
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get('id');
  const article = articles.find(a => a.id === articleId);

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

  const articleComments = comments.filter(c => c.articleId === articleId);
  const commentsContainer = document.getElementById('commentsContainer');
  if (articleComments.length > 0) {
    commentsContainer.innerHTML = articleComments.map(comment => `
      <div class="comment">
        <div class="comment-author">${comment.author}</div>
        <div class="comment-text">${comment.text}</div>
      </div>
    `).join('');
  } else {
    commentsContainer.innerHTML = '<p style="color: var(--text-muted);">暂无评论</p>';
  }

  const relatedArticles = articles
    .filter(a => a.id !== articleId && a.category === article.category)
    .slice(0, 3);
  
  const relatedContainer = document.getElementById('relatedContainer');
  if (relatedArticles.length > 0) {
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

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('article.html')) {
    initArticlePage();
  } else if (window.location.pathname.includes('about.html')) {
    return;
  } else {
    initHomePage();
  }
});