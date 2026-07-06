// ─────────────────────────────────────────────
//  Preloader
// ─────────────────────────────────────────────
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.classList.remove('no-scroll');
        }, 1200); // 1.2s delay for a premium feel
    }
});

// ─────────────────────────────────────────────
//  Typewriter Animation — Hero Heading
// ─────────────────────────────────────────────
(function typewriter() {
    const el     = document.getElementById('typed-text');
    const cursor = document.querySelector('.typed-cursor');
    if (!el) return;

    const words   = ['Full Stack Developer', 'Full Stack Engineer'];
    let   wIndex  = 0;
    let   cIndex  = 0;
    let   deleting = false;

    const SPEED_TYPE  = 110;   // ms per character while typing
    const SPEED_DEL   = 60;    // ms per character while deleting
    const PAUSE_AFTER = 1800;  // pause after full word appears
    const PAUSE_EMPTY = 400;   // pause after word fully deleted

    function tick() {
        const current = words[wIndex];

        if (!deleting) {
            // Typing forward
            el.textContent = current.slice(0, ++cIndex);
            if (cIndex === current.length) {
                // Word fully typed — pause then start deleting
                deleting = true;
                setTimeout(tick, PAUSE_AFTER);
                return;
            }
            setTimeout(tick, SPEED_TYPE);
        } else {
            // Deleting backward
            el.textContent = current.slice(0, --cIndex);
            if (cIndex === 0) {
                // Word fully deleted — move to next word
                deleting = false;
                wIndex = (wIndex + 1) % words.length;
                setTimeout(tick, PAUSE_EMPTY);
                return;
            }
            setTimeout(tick, SPEED_DEL);
        }
    }

    // Small initial delay so page loads first
    setTimeout(tick, 600);
})();

// ─────────────────────────────────────────────
//  Mobile Menu
// ─────────────────────────────────────────────
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon   = menuButton?.querySelector('i');

function closeMenu() {
    if (!mobileMenu || !menuButton || !menuIcon) return;
    mobileMenu.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    menuIcon.classList.replace('fa-xmark', 'fa-bars');
}

if (menuButton && mobileMenu && menuIcon) {
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        menuButton.setAttribute('aria-expanded', String(!isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
        menuIcon.classList.toggle('fa-bars', isOpen);
        menuIcon.classList.toggle('fa-xmark', !isOpen);
    });

    document.addEventListener('click', (event) => {
        if (mobileMenu.classList.contains('hidden')) return;
        if (mobileMenu.contains(event.target) || menuButton.contains(event.target)) return;
        closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
}

document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closeMenu();
});

// ─────────────────────────────────────────────
//  Back To Top button
// ─────────────────────────────────────────────
let scrollEndTimer;

window.addEventListener('scroll', () => {
    document.body.classList.add('is-scrolling');
    
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        if (window.scrollY > 400) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    }
    window.clearTimeout(scrollEndTimer);
    scrollEndTimer = window.setTimeout(() => {
        document.body.classList.remove('is-scrolling');
    }, 120);
}, { passive: true });

// ─────────────────────────────────────────────
//  Active Nav Link Highlight
// ─────────────────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: '-35% 0px -55%' });

    sections.forEach((section) => sectionObserver.observe(section));
}

// ─────────────────────────────────────────────
//  Smooth scroll for anchor links
// ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ─────────────────────────────────────────────
//  Skill Progress Bar Animation
// ─────────────────────────────────────────────
(function animateSkillBars() {
    const fills = document.querySelectorAll('.skill-bar-fill');
    if (!fills.length || !('IntersectionObserver' in window)) {
        // Fallback: set widths immediately
        fills.forEach(el => { el.style.width = el.style.getPropertyValue('--w') || '0%'; });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const bars = entry.target.querySelectorAll('.skill-bar-fill');
            bars.forEach((bar, i) => {
                const target = bar.style.getPropertyValue('--w') || '0%';
                setTimeout(() => {
                    bar.style.width = target;
                }, i * 100);
            });
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
})();

