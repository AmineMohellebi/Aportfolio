// ==========================================
// ANIMATIONS.JS - Advanced Animations
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initCounterAnimation();
    initTextReveal();
    initCursorEffect();
});

// ==========================================
// PARALLAX SCROLLING EFFECT
// ==========================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-parallax') || 0.5;
                const yPos = -(window.pageYOffset * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// ==========================================
// COUNTER ANIMATION (For Stats)
// ==========================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ==========================================
// TEXT REVEAL ANIMATION
// ==========================================

function initTextReveal() {
    const textElements = document.querySelectorAll('[data-text-reveal]');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        // Split text into spans
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.display = 'inline-block';
            span.style.transition = `all 0.3s ease ${index * 0.03}s`;
            element.appendChild(span);
        });
        
        // Reveal on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('span').forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// ==========================================
// CUSTOM CURSOR EFFECT (Optional - Desktop only)
// ==========================================

function initCursorEffect() {
    // Only on desktop
    if (window.innerWidth < 768) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease, opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Smooth cursor animation
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Enlarge cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.borderColor = 'var(--accent-color)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--primary-color)';
        });
    });
}

// ==========================================
// LOADING ANIMATION
// ==========================================

function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div style="text-align: center;">
            <div class="loader-spinner"></div>
            <p style="margin-top: 1rem; color: var(--primary-color); font-weight: 600;">Chargement...</p>
        </div>
    `;
    loader.style.cssText = `
        position: fixed;
        inset: 0;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid var(--border-color);
            border-top-color: var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(loader);
    
    // Remove loader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
}

// Show loader on page load
if (document.readyState === 'loading') {
    showLoadingAnimation();
}

// ==========================================
// MAGNETIC BUTTONS EFFECT
// ==========================================

function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-outline');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialize magnetic buttons on desktop
if (window.innerWidth >= 768) {
    document.addEventListener('DOMContentLoaded', initMagneticButtons);
}

// ==========================================
// TILT EFFECT FOR CARDS
// ==========================================

function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.project-card, .card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Initialize tilt effect on desktop
if (window.innerWidth >= 768) {
    document.addEventListener('DOMContentLoaded', initTiltEffect);
}

// ==========================================
// IMAGE LAZY LOADING WITH BLUR EFFECT
// ==========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// ==========================================
// PROGRESS BAR ON SCROLL
// ==========================================

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 10000;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

initScrollProgress();

// ==========================================
// EXPORT FUNCTIONS (if using modules)
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initParallax,
        initCounterAnimation,
        initTextReveal,
        initCursorEffect,
        initMagneticButtons,
        initTiltEffect,
        initLazyLoading,
        initScrollProgress
    };
}
