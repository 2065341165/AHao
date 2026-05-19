const BASE_URL = '/AHao/src/data';

export async function fetchArticles() {
  try {
    const response = await fetch(`${BASE_URL}/data.json`);
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
}

export async function fetchComments() {
  try {
    const response = await fetch(`${BASE_URL}/data.json`);
    const data = await response.json();
    return data.comments || [];
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return [];
  }
}

export async function fetchArticleById(id) {
  const articles = await fetchArticles();
  return articles.find(article => article.id === id);
}

export async function fetchCommentsByArticleId(articleId) {
  const comments = await fetchComments();
  return comments.filter(comment => comment.articleId === articleId);
}

export async function fetchArticlesByCategory(category) {
  const articles = await fetchArticles();
  if (category === 'all') return articles;
  return articles.filter(article => article.category === category);
}

export async function fetchRelatedArticles(articleId, category) {
  const articles = await fetchArticles();
  return articles
    .filter(a => a.id !== articleId && a.category === category)
    .slice(0, 3);
}