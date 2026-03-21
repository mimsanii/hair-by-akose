// ==========================================
// HAIR BY AKOSE - MAIN JAVASCRIPT
// Updated to work with new index.html
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // SCROLL PROGRESS BAR
    // ==========================================
    const bar = document.getElementById('scroll-progress');
    if (bar) {
        window.addEventListener('scroll', function () {
            const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
            bar.style.width = Math.min(pct, 100) + '%';
        }, { passive: true });
    }

    // ==========================================
    // NAV — add scrolled class
    // ==========================================
    const nav = document.getElementById('mainNav');
    if (nav) {
        window.addEventListener('scroll', function () {
            nav.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    // ==========================================
    // HAMBURGER — SLIDE PANEL MENU
    // ==========================================
    const hb = document.getElementById('hamburger');
    const mm = document.getElementById('mobMenu');
    const bd = document.getElementById('mobBackdrop');

    function openMenu() {
        if (!mm || !hb) return;
        mm.classList.add('open');
        if (bd) bd.classList.add('open');
        hb.classList.add('open');
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }

    function closeMenu() {
        if (!mm || !hb) return;
        mm.classList.remove('open');
        if (bd) bd.classList.remove('open');
        hb.classList.remove('open');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }

    // expose closeMenu globally so onclick="cM()" in HTML still works
    window.cM = closeMenu;

    if (hb) {
        hb.addEventListener('click', function (e) {
            e.stopPropagation();
            mm && mm.classList.contains('open') ? closeMenu() : openMenu();
        });
    }

    if (bd) {
        bd.addEventListener('click', closeMenu);
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    // ==========================================
    // MOBILE BOTTOM NAV — active on scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const mobLinks = document.querySelectorAll('.mob-bottom-nav a');

    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(function (s) {
            if (window.scrollY >= s.offsetTop - 140) current = s.id;
        });
        mobLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    }, { passive: true });

    // ==========================================
    // SMOOTH SCROLL for anchor links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') { e.preventDefault(); return; }
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                closeMenu();
                const offset = nav ? nav.offsetHeight : 60;
                window.scrollTo({ top: target.offsetTop - offset - 10, behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // FADE-IN ON SCROLL (Intersection Observer)
    // ==========================================
    const fadeEls = document.querySelectorAll(
        '.svc-card, .why-card, .testi-card, .val-chip, .skill-row, .s-badge, .g-item'
    );

    fadeEls.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity .5s ease, transform .5s ease';
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 45);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeEls.forEach(function (el) { observer.observe(el); });

    // ==========================================
    // CONTACT FORM (if exists)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const orig = btn ? btn.textContent : '';
            if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
            setTimeout(function () {
                alert("Thank you! We'll get back to you soon.");
                contactForm.reset();
                if (btn) { btn.textContent = orig; btn.disabled = false; }
            }, 1500);
        });
    }

    // ==========================================
    // PAGE LOAD FADE IN
    // ==========================================
    document.body.style.opacity = '0';
    setTimeout(function () {
        document.body.style.transition = 'opacity 0.4s ease';
        document.body.style.opacity = '1';
    }, 80);

    console.log('Hair by Akose — loaded ✨');
});
