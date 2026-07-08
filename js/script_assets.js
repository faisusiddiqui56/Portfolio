const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = menuButton?.querySelector('i');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

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

let scrollEndTimer;

window.addEventListener('scroll', () => {
    document.body.classList.add('is-scrolling');
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        if (window.scrollY > 500) {
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

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    if (formStatus) {
        formStatus.textContent = 'Opening your email app...';
    }

    window.location.href = `mailto:faisal18.siddiqui@gmail.com?subject=${subject}&body=${body}`;
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

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
