// ==========================================
// HAIR BY AKOSE - MAIN JAVASCRIPT
// Navigation, Smooth Scroll, Mobile Menu
// ==========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // NAVIGATION FUNCTIONALITY
    // ==========================================
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const desktopNav = document.getElementById('desktopNav');
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 767) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // ==========================================
    // STICKY NAVIGATION & SCROLL EFFECTS
    // ==========================================
    
    let lastScroll = 0;
    const navHeight = desktopNav ? desktopNav.offsetHeight : 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow to nav on scroll
        if (desktopNav) {
            if (currentScroll > 50) {
                desktopNav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                desktopNav.style.boxShadow = 'none';
            }
        }
        
        // Hide/show nav on scroll (optional)
        // Uncomment if you want nav to hide on scroll down
        /*
        if (currentScroll > lastScroll && currentScroll > navHeight) {
            // Scrolling down
            desktopNav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            desktopNav.style.transform = 'translateY(0)';
        }
        */
        
        lastScroll = currentScroll;
    });
    
    // ==========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active state
                updateActiveNavigation(href);
            }
        });
    });
    
    // ==========================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ==========================================
    
    function updateActiveNavigation(activeHref) {
        // Update desktop nav
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeHref) {
                link.classList.add('active');
            }
        });
        
        // Update mobile nav
        mobileNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === activeHref) {
                item.classList.add('active');
            }
        });
    }
    
    // Highlight nav based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                updateActiveNavigation('#' + sectionId);
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // ==========================================
    // SCROLL ANIMATIONS (Fade in on scroll)
    // ==========================================
    
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .work-item, .testimonial-card');
        
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };
    
    // Initial setup for scroll animations
    const setupScrollAnimations = function() {
        const elements = document.querySelectorAll('.service-card, .work-item, .testimonial-card');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    };
    
    setupScrollAnimations();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run on load
    
    // ==========================================
    // WORK GALLERY LIGHTBOX EFFECT
    // ==========================================
    
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        item.addEventListener('click', function() {
            // Could implement a lightbox modal here
            // For now, just adding a click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // ==========================================
    // DEVICE DETECTION & ADAPTIVE LOADING
    // ==========================================
    
    function detectDevice() {
        const width = window.innerWidth;
        
        if (width < 768) {
            return 'mobile';
        } else if (width < 1025) {
            return 'tablet';
        } else if (width < 1441) {
            return 'laptop';
        } else {
            return 'desktop';
        }
    }
    
    // Log device type (useful for debugging)
    console.log('Current device type:', detectDevice());
    
    // Update on resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            console.log('Device type changed to:', detectDevice());
            // Could reload images or adjust layout here
        }, 250);
    });
    
    // ==========================================
    // FORM HANDLING (if contact form exists)
    // ==========================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
            
            // For production, use fetch to submit to a form service:
            /*
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you! We\'ll be in touch soon.');
                    contactForm.reset();
                } else {
                    alert('Oops! There was a problem. Please try again.');
                }
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
            */
        });
    }
    
    // ==========================================
    // WHATSAPP CLICK TRACKING
    // ==========================================
    
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('WhatsApp button clicked');
            // Could add analytics tracking here
        });
    });
    
    // ==========================================
    // LOADING ANIMATION (Optional)
    // ==========================================
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ==========================================
    // ACCESSIBILITY ENHANCEMENTS
    // ==========================================
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Focus trap for mobile menu
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (navMenu && navMenu.classList.contains('active')) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }
    
    console.log('Hair by Akose - Website loaded successfully! ✨');
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
