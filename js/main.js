// ==========================================
// MAIN JAVASCRIPT - Portfolio Functionality
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initThemeToggle();
    initSmoothScroll();
    initScrollReveal();
    setActiveNavLink();
});

// ==========================================
// NAVIGATION
// ==========================================

function initNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// THEME TOGGLE (Dark/Light Mode)
// ==========================================

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// ==========================================
// FORM VALIDATION (for Contact Page)
// ==========================================

function initContactForm() {
    const form = document.querySelector('#contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: form.querySelector('#name').value,
                email: form.querySelector('#email').value,
                subject: form.querySelector('#subject').value,
                message: form.querySelector('#message').value
            };
            
            // Validate
            if (!validateEmail(formData.email)) {
                showMessage('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            if (formData.message.length < 10) {
                showMessage('Le message doit contenir au moins 10 caractères.', 'error');
                return;
            }
            
            // Show loading
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulate sending (replace with actual backend call)
            setTimeout(() => {
                showMessage('Message envoyé avec succès! Je vous répondrai bientôt.', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(message, type) {
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    const form = document.querySelector('#contact-form');
    form.parentNode.insertBefore(messageDiv, form);
    
    setTimeout(() => messageDiv.remove(), 5000);
}

// Initialize contact form if on contact page
if (window.location.pathname.includes('contact')) {
    document.addEventListener('DOMContentLoaded', initContactForm);
}

// ==========================================
// TYPING ANIMATION (for Hero Section)
// ==========================================

function typeWriter(element, words, speed = 100) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = speed;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Initialize typing animation if element exists
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const words = typingElement.getAttribute('data-words').split(',');
    typeWriter(typingElement, words);
}

// ==========================================
// SKILLS ANIMATION (for CV Page)
// ==========================================

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize skill bars animation if on CV page
if (window.location.pathname.includes('cv')) {
    document.addEventListener('DOMContentLoaded', animateSkillBars);
}

// ==========================================
// PROJECT FILTERING (for Projects Page)
// ==========================================

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-category') === filter) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize project filters if on projects page
if (window.location.pathname.includes('projects')) {
    document.addEventListener('DOMContentLoaded', initProjectFilters);
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-top');
    
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

initScrollToTop();
