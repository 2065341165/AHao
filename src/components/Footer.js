export class Footer {
  render() {
    return `
      <footer class="footer">
        <div class="container">
          <p>&copy; ${new Date().getFullYear()} My Blog. All rights reserved.</p>
        </div>
      </footer>
    `;
  }

  mount(container) {
    container.innerHTML = this.render();
  }
}