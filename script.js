// ============ MATRIX CANVAS BACKGROUND ============
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, cols, drops;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/\\アイウエオカキクケコサシスセソタチツテトナニヌネノ';
  const fontSize = 14;

  function init() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.floor(W / fontSize);
    drops = new Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(5,10,15,0.05)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#00ff88';
    ctx.font = fontSize + 'px Share Tech Mono, monospace';
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  init();
  window.addEventListener('resize', init);
  setInterval(draw, 50);
})();

// ============ TYPING ANIMATION ============
(function initTyping() {
  const el = document.getElementById('typed-cmd');
  if (!el) return;
  const messages = [
    'whoami',
    'cat about.txt',
    'ls certifications/',
    'nmap --open -sV targets',
    'sudo ./secure_network.sh',
  ];
  let msgIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = messages[msgIdx];
    if (deleting) {
      el.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        msgIdx = (msgIdx + 1) % messages.length;
        setTimeout(type, 600);
        return;
      }
      setTimeout(type, 50);
    } else {
      el.textContent = current.substring(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
      setTimeout(type, 100);
    }
  }
  setTimeout(type, 800);
})();

// ============ SMOOTH SCROLLING ============
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    // Close mobile nav if open
    document.querySelector('.nav-links')?.classList.remove('open');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ============ HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ============ SECTION REVEAL ON SCROLL ============
function revealSectionsOnScroll() {
  const sections = document.querySelectorAll('section');
  const windowHeight = window.innerHeight;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < windowHeight * 0.88) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealSectionsOnScroll);
window.addEventListener('load', revealSectionsOnScroll);

// ============ ACTIVE NAV HIGHLIGHT ============
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionIds = Array.from(navItems).map(a => a.getAttribute('href'));

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  let active = sectionIds[0];
  sectionIds.forEach(id => {
    const el = document.querySelector(id);
    if (el && el.offsetTop <= scrollY) active = id;
  });
  navItems.forEach(a => {
    a.style.color = a.getAttribute('href') === active ? 'var(--green)' : '';
  });
}
window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ============ CONTACT FORM (MAILTO) ============
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('name')?.value.trim();
    const email   = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    if (!name || !email || !message) {
      alert('Please fill in all fields before sending.');
      return;
    }
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:othman.idrissi404@gmail.com?subject=${subject}&body=${body}`;
    alert('Thank you! Your email client should open now.');
    contactForm.reset();
  });
}

// ============ CERT THUMBNAIL CLICK ============
document.querySelectorAll('.cert-thumb-wrap').forEach(wrap => {
  wrap.addEventListener('click', () => {
    const card = wrap.closest('.achievement-card');
    const link = card?.querySelector('.acard-link');
    if (link) window.open(link.href, '_blank');
  });
});
