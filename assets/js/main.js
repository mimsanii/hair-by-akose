// ==========================================
// HAIR BY AKOSE - main.js
// All menu/nav logic lives in index.html.
// This file handles contact form + extras.
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // ── CONTACT FORM ──
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = contactForm.querySelector('button[type="submit"]');
            var orig = btn ? btn.textContent : '';
            if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
            setTimeout(function () {
                alert("Thank you! We'll get back to you soon.");
                contactForm.reset();
                if (btn) { btn.textContent = orig; btn.disabled = false; }
            }, 1500);
        });
    }

    // ── WHATSAPP TRACKING ──
    document.querySelectorAll('.btn-whatsapp, .wa-band-mob').forEach(function (btn) {
        btn.addEventListener('click', function () {
            console.log('WhatsApp clicked');
        });
    });

    console.log('Hair by Akose — ready ✨');
});
