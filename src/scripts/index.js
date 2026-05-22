// ===== CUSTOM CURSOR =====
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
const cursorRing = document.createElement('div');
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

document.addEventListener('mousemove', (e) => {
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
  cursorRing.style.left = e.clientX + 'px';
  cursorRing.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .btn, .project-card, .blog-card, .skill-card, .social-link, .back-to-top').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

// ===== SCROLL PROGRESS =====
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = progress + '%';
});

// ===== PARTICLE SYSTEM =====
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 200 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.color = Math.random() > 0.5 ? 'cyan' : 'purple';
    this.alpha = Math.random() * 0.5 + 0.3;
    this.pulse = Math.random() * Math.PI * 2;
  }

  draw() {
    const color = this.color === 'cyan'
      ? `rgba(0, 240, 255, ${this.alpha * (0.7 + 0.3 * Math.sin(this.pulse))})`
      : `rgba(180, 0, 255, ${this.alpha * (0.7 + 0.3 * Math.sin(this.pulse))})`;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
    glow.addColorStop(0, this.color === 'cyan' ? 'rgba(0, 240, 255, 0.1)' : 'rgba(180, 0, 255, 0.08)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    this.pulse += 0.02;

    if (mouse.x && mouse.y) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const maxDistance = mouse.radius;
      const force = (maxDistance - distance) / maxDistance;
      const directionX = forceDirectionX * force * this.density * 1.5;
      const directionY = forceDirectionY * force * this.density * 1.5;
      if (distance < mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      }
    }

    if (this.x !== this.baseX) {
      const dx = this.x - this.baseX;
      this.x -= dx / 8;
    }
    if (this.y !== this.baseY) {
      const dy = this.y - this.baseY;
      this.y -= dy / 8;
    }

    this.x += this.speedX;
    this.y += this.speedY;
    this.baseX += this.speedX;
    this.baseY += this.speedY;

    if (this.x < 0) this.x = this.baseX = canvas.width;
    if (this.x > canvas.width) this.x = this.baseX = 0;
    if (this.y < 0) this.y = this.baseY = canvas.height;
    if (this.y > canvas.height) this.y = this.baseY = 0;
  }
}

function initParticles() {
  particles = [];
  const numberOfParticles = Math.floor((canvas.width * canvas.height) / 7000);
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 150) {
        const alpha = 0.15 * (1 - distance / 150);
        const mix = Math.random() > 0.5
          ? `rgba(0, 240, 255, ${alpha})`
          : `rgba(180, 0, 255, ${alpha})`;
        ctx.strokeStyle = mix;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    p.draw();
    p.update();
  }
  connectParticles();
  requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();

// ===== TYPING EFFECT =====
const texts = ['欢迎来到我的世界', '我是阿豪', '一位前端开发工程师', '终身学习者，喜欢探索新的技术', '一直在路上~', '感谢停留❤'];
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isGlitching = false;
let glitchCount = 0;
const typingEl = document.getElementById('typingText');

function getRandomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function typeText() {
  const currentText = texts[textIndex];

  if (isGlitching) {
    let displayText = currentText.substring(0, charIndex);
    if (charIndex > 0) {
      const glitchIndex = Math.floor(Math.random() * charIndex);
      displayText = displayText.substring(0, glitchIndex) + getRandomChar() + displayText.substring(glitchIndex + 1);
    }
    typingEl.innerHTML = displayText + '<span class="typing-cursor"></span>';
    glitchCount--;
    if (glitchCount <= 0) {
      isGlitching = false;
    }
    setTimeout(typeText, 30);
    return;
  }

  if (isDeleting) {
    const displayText = currentText.substring(0, charIndex - 1);
    if (Math.random() > 0.7 && charIndex > 1) {
      typingEl.innerHTML = displayText.substring(0, displayText.length - 1) + '<span class="glitch-char">' + displayText[displayText.length - 1] + '</span><span class="typing-cursor"></span>';
    } else {
      typingEl.innerHTML = displayText + '<span class="typing-cursor"></span>';
    }
    charIndex--;
  } else {
    const displayText = currentText.substring(0, charIndex);
    if (Math.random() > 0.95 && charIndex > 0) {
      typingEl.innerHTML = displayText.substring(0, charIndex - 1) + getRandomChar() + '<span class="typing-cursor"></span>';
    } else {
      typingEl.innerHTML = displayText + '<span class="typing-cursor"></span>';
    }
    charIndex++;
  }

  let typeSpeed = isDeleting ? 30 : 80;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    isGlitching = true;
    glitchCount = 8;
    typeSpeed = 0;
  }

  setTimeout(typeText, typeSpeed);
}
typeText();

// ===== NAVIGATION =====
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-links a');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Update active nav link
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger skill bar animation
      const skillBar = entry.target.querySelector('.skill-bar-fill');
      if (skillBar) {
        const width = skillBar.dataset.width;
        skillBar.style.width = width + '%';
      }
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// ===== BLOG FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    blogCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== PROJECT CARD 3D TILT =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -8;
    const tiltY = ((x - centerX) / centerX) * 8;
    card.style.setProperty('--tilt-x', tiltX + 'deg');
    card.style.setProperty('--tilt-y', tiltY + 'deg');
    card.style.setProperty('--mouse-x', (x / rect.width) * 100 + '%');
    card.style.setProperty('--mouse-y', (y / rect.height) * 100 + '%');
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  });
});

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});