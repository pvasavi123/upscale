/**
 * UPSCALE PORTFOLIO - VANILLA JAVASCRIPT
 * Handles mobile navbar, dynamic project rendering, filtering, scroll reveal, smooth scroll, form validation.
 */

// Sample real project structure for Upscale portfolio
const projectsData = [
  {
    id: 1,
    name: "College Management System",
    category: "web",
    description: "Comprehensive web platform for managing student records, course enrollments, faculty allocations, attendance tracking, and institutional administration.",
    technologies: ["React.js", "Bootstrap", "Spring Boot", "Java", "MySQL"],
    badge: "Web Application",
    github: "https://github.com/Mandhalasushanth",
    live: "https://deft-malabi-1665bb.netlify.app/",
    image: "assets/projects/college-management.png"
  },
  {
    id: 2,
    name: "Weather Web Application",
    category: "web",
    description: "Interactive weather forecasting application that retrieves real-time weather information, forecasts, and environmental metrics using a Weather API.",
    technologies: ["HTML", "CSS", "JavaScript", "Weather API"],
    badge: "Web App",
    github: "https://github.com/Mandhalasushanth",
    live: "https://weatherapp-pearl-psi.vercel.app/",
    image: "assets/projects/whether.jpg"
  },
  {
    id: 3,
    name: "ReCart",
    category: "web",
    description: "A responsive e-commerce shopping cart web application utilizing React components, state management, and modern UI elements.",
    technologies: ["React.js", "JavaScript", "HTML", "CSS"],
    badge: "E-Commerce",
    github: "https://github.com/Mandhalasushanth",
    live: "https://recart-git-main-mandhalasushanths-projects.vercel.app/",
    image: "assets/projects/recart.jpg"
  },
  {
    id: 4,
    name: "Python Quiz Application",
    category: "backend",
    description: "A terminal or console-based interactive quiz application written in Python to test user knowledge with custom question banks.",
    technologies: ["Python"],
    badge: "Python Tool",
    github: "https://github.com/Mandhalasushanth",
    live: ""
  },
  {
    id: 5,
    name: "AICareerMate",
    category: "ai",
    description: "An AI-powered career assistant utilizing Streamlit for the front-end, designed to analyze resumes, provide job recommendations, and optimize profiles.",
    technologies: ["Python", "Streamlit", "AI/ML"],
    badge: "AI & Streamlit",
    github: "https://github.com/Mandhalasushanth",
    live: "https://aicareermate-hfon5qbvvdqnwyq4bmxmwe.streamlit.app/",
    image: "assets/projects/metaAi.jpg"
  },
  {
    id: 6,
    name: "Calculator",
    category: "web",
    description: "A clean, responsive web calculator performing basic arithmetic functions with a sleek user interface.",
    technologies: ["HTML", "CSS", "JavaScript"],
    badge: "Utility",
    github: "https://github.com/Mandhalasushanth",
    live: "https://basic-calculator-r5mpibr7k-mandhalasushanths-projects.vercel.app/"
  },
  {
    id: 7,
    name: "Text-to-Speech Translator",
    category: "web",
    description: "A speech synthesis application utilizing the Web Speech API to convert written text into spoken voice with customizable language and voice controls.",
    technologies: ["HTML", "CSS", "JavaScript", "Web Speech API"],
    badge: "API Integration",
    github: "https://github.com/Mandhalasushanth",
    live: "https://text-to-speech-converter-git-main-mandhalasushanths-projects.vercel.app/"
  },
  {
    id: 8,
    name: "TryFit – AI Virtual Try-On",
    category: "ai",
    description: "An advanced computer vision application using AI/ML techniques to virtually try on clothing/apparel on user models in real time.",
    technologies: ["AI/ML", "Computer Vision", "Python"],
    badge: "Computer Vision",
    github: "",
    live: "https://try-fit-main-git-main-mandhalasushanths-projects.vercel.app/"
  },
  {
    id: 9,
    name: "Rennto",
    category: "mobile",
    description: "A modern peer-to-peer rental mobile application allowing users to list, browse, and rent items, equipment, or properties seamlessly.",
    technologies: ["React Native", "Expo", "Firebase", "JavaScript"],
    badge: "Mobile App",
    github: "https://github.com/Mandhalasushanth",
    live: ""
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  renderProjects('all');
  initProjectFilters();
  initFormValidation();
  initBackToTop();
  initScrollAnimations();
});

/* --- LIGHT / DARK THEME TOGGLE --- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector('i');
  
  // Check saved theme preference
  const savedTheme = localStorage.getItem('upscale-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (icon) icon.classList.replace('fa-moon', 'fa-sun');
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');

    if (isLight) {
      if (icon) icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('upscale-theme', 'light');
    } else {
      if (icon) icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('upscale-theme', 'dark');
    }
  });
}

/* --- NAVBAR & MOBILE MENU --- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightNavOnScroll();
  });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      icon.classList.replace('fa-xmark', 'fa-bars');
    }
  });

  // Close menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = hamburger.querySelector('i');
      if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
    });
  });
}

function highlightNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

/* --- DYNAMIC PROJECTS RENDER --- */
function renderProjects(filterCategory) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = '';

  const filteredProjects = filterCategory === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filterCategory);

  if (filteredProjects.length === 0) {
    grid.innerHTML = `<p style="color: var(--text-light); text-align: center; grid-column: 1/-1;">No projects found in this category.</p>`;
    return;
  }

  filteredProjects.forEach(proj => {
    const card = document.createElement('article');
    card.className = 'project-card';

    const techPills = proj.technologies.map(tech => `<span class="p-tech-pill">${tech}</span>`).join('');
    const targetAttr = proj.live && proj.live !== '#' ? 'target="_blank" rel="noopener noreferrer"' : '';
    
    let iconClass = 'fa-code';
    if (proj.name.includes('College') || proj.name.includes('Management')) iconClass = 'fa-graduation-cap';
    else if (proj.category === 'ai') iconClass = 'fa-robot';
    else if (proj.category === 'mobile') iconClass = 'fa-mobile-screen-button';
    else if (proj.badge.includes('Backend') || proj.badge.includes('Quality')) iconClass = 'fa-server';

    const imgContent = proj.image 
      ? `<img src="${proj.image}" alt="${proj.name}" style="width: 100%; height: 100%; object-fit: cover; object-position: top; border-radius: var(--radius-md) var(--radius-md) 0 0;">`
      : `<div style="font-size: 3rem; color: var(--primary-orange); opacity: 0.8;"><i class="fa-solid ${iconClass}"></i></div>`;

    card.innerHTML = `
      <div class="project-img-box" style="height: 200px; display: flex; align-items: center; justify-content: center; overflow: hidden; background: rgba(0,0,0,0.2); position: relative;">
        ${imgContent}
        <span class="project-badge" style="position: absolute; top: 12px; right: 12px; z-index: 2;">${proj.badge}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${proj.name}</h3>
        <p class="project-desc">${proj.description}</p>
        <div class="project-techs">${techPills}</div>
        <div class="project-links" style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
          ${proj.github ? `
            <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="project-btn btn-secondary" style="background: rgba(255,255,255,0.06); border: 1px solid var(--dark-border); flex: 1; text-align: center; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <i class="fa-brands fa-github"></i> GitHub
            </a>
          ` : `
            <span class="project-btn btn-secondary" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.25); cursor: not-allowed; flex: 1; text-align: center; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <i class="fa-brands fa-github"></i> Private Repo
            </span>
          `}
          ${proj.live ? `
            <a href="${proj.live}" ${targetAttr} class="project-btn btn-primary" style="padding: 0.6rem; flex: 1; text-align: center; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
            </a>
          ` : `
            <span class="project-btn btn-primary" style="background: rgba(255,107,0,0.15); border: 1px solid rgba(255,107,0,0.15); color: rgba(255,255,255,0.3); cursor: not-allowed; padding: 0.6rem; flex: 1; text-align: center; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <i class="fa-solid fa-ban"></i> Offline
            </span>
          `}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderProjects(category);
    });
  });
}

/* --- CONTACT FORM VALIDATION --- */
function initFormValidation() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alertBox.className = 'form-alert';
    alertBox.style.display = 'none';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const projectType = document.getElementById('project-type').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !phone || !projectType || !message) {
      showFormAlert(alertBox, 'error', 'Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormAlert(alertBox, 'error', 'Please enter a valid email address.');
      return;
    }

    // Success response simulator
    showFormAlert(alertBox, 'success', 'Thank you! Your project enquiry has been submitted. Our team will contact you shortly.');
    form.reset();
  });
}

function showFormAlert(box, type, message) {
  box.className = `form-alert ${type}`;
  box.textContent = message;
  box.style.display = 'block';
}

/* --- BACK TO TOP BUTTON --- */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- SCROLL REVEAL & STAGGER ANIMATIONS --- */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedSelectors = '.service-card, .feature-card, .team-card, .tech-category-card, .why-card, .process-step-card, .stat-card, .hero-visual-card, .section-header, .about-card';
  const animatedElements = document.querySelectorAll(animatedSelectors);

  // Group elements by parent to calculate stagger indices
  const parents = new Set();
  animatedElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    const parent = el.parentElement;
    if (parent) {
      if (!parents.has(parent)) {
        parents.add(parent);
        const children = Array.from(parent.children).filter(child => child.matches(animatedSelectors));
        children.forEach((child, index) => {
          child.style.setProperty('--reveal-index', index);
        });
      }
    }
    observer.observe(el);
  });
}
