const articles = [
  {
    id: '1',
    title: '深入理解 JavaScript 闭包',
    excerpt: '闭包是 JavaScript 中最重要的概念之一。本文将深入探讨闭包的原理、应用场景以及最佳实践...',
    content: '<p>闭包是 JavaScript 中一个非常重要的概念，理解它对于编写高质量的 JavaScript 代码至关重要。</p><h3>什么是闭包？</h3><p>闭包是指有权访问另一个函数作用域中变量的函数。创建闭包的常见方式是在一个函数内部创建另一个函数。</p><pre><code>function outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = outer();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2</code></pre><h3>闭包的应用场景</h3><p>闭包在实际开发中有很多应用场景，包括数据私有化、函数柯里化、模块化等。</p>',
    category: '技术',
    author: '张三',
    createdAt: '2024-01-15',
    tags: ['JavaScript', '前端', '闭包'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=JavaScript%20programming%20code%20on%20screen%20with%20blue%20lighting&image_size=landscape_16_9'
  },
  {
    id: '2',
    title: 'React 18 新特性详解',
    excerpt: 'React 18 带来了许多令人兴奋的新特性，包括并发特性、自动批处理、新的 Suspense API 等...',
    content: '<p>React 18 是 React 团队多年努力的成果，引入了许多革命性的新特性。</p><h3>并发特性</h3><p>React 18 最重要的更新是并发特性（Concurrent Features），它让 React 能够中断渲染工作，稍后再继续。</p><pre><code>const root = ReactDOM.createRoot(document.getElementById("root"));\nroot.render(&lt;App /&gt;);</code></pre><h3>自动批处理</h3><p>React 18 在所有场景下都会自动批处理更新，包括 Promise、setTimeout 等异步操作。</p>',
    category: '技术',
    author: '张三',
    createdAt: '2024-01-12',
    tags: ['React', '前端', 'JavaScript'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=React%20framework%20logo%20with%20modern%20UI%20design&image_size=landscape_16_9'
  },
  {
    id: '3',
    title: '周末徒步旅行记',
    excerpt: '周末和朋友们一起去了郊外徒步，欣赏了美丽的自然风光，感受到了大自然的魅力...',
    content: '<p>周末难得有机会和朋友们一起出去徒步旅行，远离城市的喧嚣，感受大自然的美好。</p><h3>出发前的准备</h3><p>我们提前准备好了徒步装备：舒适的徒步鞋、背包、水和零食。早上七点准时出发。</p><h3>沿途风景</h3><p>一路上风景如画，青山绿水，鸟语花香。我们走走停停，拍照留念，享受着这难得的放松时光。</p><p>中午时分，我们在一片草地上休息，分享着各自带来的食物，谈笑风生。</p>',
    category: '生活',
    author: '张三',
    createdAt: '2024-01-10',
    tags: ['旅行', '生活', '户外'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hiking%20trail%20in%20beautiful%20forest%20nature&image_size=landscape_16_9'
  },
  {
    id: '4',
    title: 'TypeScript 类型体操入门',
    excerpt: 'TypeScript 的类型系统非常强大，通过类型体操可以实现很多有趣的类型转换...',
    content: '<p>TypeScript 的类型系统不仅仅是简单的类型标注，它可以做很多复杂的类型运算。</p><h3>什么是类型体操？</h3><p>类型体操指的是利用 TypeScript 的类型系统进行各种类型转换和计算的技巧。</p><pre><code>type Reverse&lt;T extends string&gt; = T extends `${infer F}${infer R}`\n  ? `${Reverse&lt;R&gt;}${F}`\n  : "";\n\ntype Result = Reverse&lt;"hello"&gt;; // "olleh"</code></pre><h3>常用工具类型</h3><p>掌握常用的工具类型如 Partial、Required、Readonly、Pick、Omit 等是类型体操的基础。</p>',
    category: '技术',
    author: '张三',
    createdAt: '2024-01-08',
    tags: ['TypeScript', '前端', '类型'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=TypeScript%20code%20with%20type%20annotations&image_size=landscape_16_9'
  },
  {
    id: '5',
    title: '日本京都旅行日记',
    excerpt: '去年冬天去了日本京都，体验了传统的日式文化，参观了许多著名的寺庙和神社...',
    content: '<p>京都，这座千年古都，充满了历史的韵味和文化的底蕴。</p><h3>第一天：清水寺</h3><p>第一天我们去了清水寺，这是京都最著名的寺庙之一。站在悬空的舞台上，可以俯瞰整个京都城。</p><h3>第二天：伏见稻荷大社</h3><p>伏见稻荷大社以其千本鸟居而闻名，朱红色的鸟居绵延不绝，非常壮观。</p><h3>美食体验</h3><p>京都的美食也令人难忘，特别是怀石料理，精致的摆盘和独特的味道让人回味无穷。</p>',
    category: '旅行',
    author: '张三',
    createdAt: '2024-01-05',
    tags: ['旅行', '日本', '文化'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Japanese%20Kyoto%20temple%20with%20cherry%20blossoms&image_size=landscape_16_9'
  },
  {
    id: '6',
    title: '阅读《深入理解计算机系统》有感',
    excerpt: '最近读完了《深入理解计算机系统》这本书，收获颇丰，分享一下我的阅读心得...',
    content: '<p>《深入理解计算机系统》是一本非常经典的计算机科学教材，值得每一位程序员阅读。</p><h3>为什么要读这本书？</h3><p>这本书从程序员的视角详细阐述了计算机系统的本质概念，包括计算机组成、操作系统、网络等。</p><h3>主要收获</h3><p>通过阅读这本书，我对计算机系统有了更深入的理解，这对于编写高效、可靠的代码非常有帮助。特别是关于缓存、内存管理和并发的章节，让我受益匪浅。</p>',
    category: '生活',
    author: '张三',
    createdAt: '2024-01-02',
    tags: ['读书', '技术', '心得'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=person%20reading%20book%20in%20cozy%20library&image_size=landscape_16_9'
  }
];

const comments = [
  { id: '1', articleId: '1', author: '李四', text: '写得很棒！对闭包有了更深入的理解。' },
  { id: '2', articleId: '1', author: '王五', text: '感谢分享，期待更多这样的文章。' },
  { id: '3', articleId: '2', author: '赵六', text: 'React 18 的并发特性确实很强大！' }
];

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

function initHomePage() {
  renderArticles(articles);

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterArticles(btn.dataset.category);
    });
  });
}

function initArticlePage() {
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