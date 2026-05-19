import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';

class AboutPage {
  async init() {
    await this.renderHeader();
    await this.renderFooter();
  }

  async renderHeader() {
    const header = new Header('about');
    header.mount(document.getElementById('header-container'));
  }

  async renderFooter() {
    const footer = new Footer();
    footer.mount(document.getElementById('footer-container'));
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const page = new AboutPage();
  await page.init();
});