export class Hero {
  render() {
    return `
      <section class="hero">
        <div class="container hero-content">
          <h1>欢迎来到我的博客</h1>
          <p>分享技术心得、生活感悟和项目经验</p>
        </div>
      </section>
    `;
  }

  mount(container) {
    container.innerHTML = this.render();
  }
}