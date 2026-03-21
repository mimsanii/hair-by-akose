// ==========================================
// HAIR BY AKOSE — pricing.js
// All calculator + sheet logic lives inside
// pricing.html. This file is intentionally
// minimal to avoid conflicts.
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // WhatsApp click tracking only
    document.querySelectorAll('.btn-wa, .float-wa, .btn-gold, .btn-ghost').forEach(function (btn) {
        btn.addEventListener('click', function () {
            console.log('Booking action clicked');
        });
    });

    console.log('Pricing page — pricing.js loaded ✨');
});
