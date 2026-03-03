// ==========================================
// HAIR BY AKOSE - CAROUSEL JAVASCRIPT
// Pure Vanilla JS Carousel with Auto-play, Dots, Arrows, Touch/Swipe, Responsive
// ==========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // CAROUSEL INITIALIZATION
    // ==========================================
    
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(function(carousel) {
        initCarousel(carousel);
    });
    
    console.log('Hair by Akose - Carousels initialized successfully! ✨');
});

function initCarousel(carousel) {
    // Core elements
    const slidesContainer = carousel.querySelector('.carousel-slides');
    const slides = slidesContainer.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    // Dots container (create if not exists)
    let dotsContainer = carousel.querySelector('.carousel-dots');
    if (!dotsContainer) {
        dotsContainer = document.createElement('div');
        dotsContainer.classList.add('carousel-dots');
        carousel.appendChild(dotsContainer);
    }
    const dots = [];
    
    // Configuration
    const config = {
        autoPlay: true,
        autoPlayDelay: 5000,
        slidesToShow: 1, // Change for responsive: e.g., 1 mobile, 3 desktop
        infinite: true,
        speed: 500 // Transition speed in ms
    };
    
    // State
    let currentIndex = 0;
    let autoPlayInterval = null;
    let isTransitioning = false;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Calculate slide width (for multi-slide view)
    function getSlideWidth() {
        const containerWidth = slidesContainer.offsetWidth;
        return containerWidth / config.slidesToShow;
    }
    
    // Update slides position
    function updateSlides() {
        const translateX = -(currentIndex * getSlideWidth());
        slidesContainer.style.transform = `translateX(${translateX}px)`;
        slidesContainer.style.transition = `transform ${config.speed}ms ease-in-out`;
    }
    
    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const totalSlides = Math.ceil(slides.length / config.slidesToShow);
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }
    }
    
    // Update dots
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (isTransitioning || index === currentIndex) return;
        
        currentIndex = index;
        updateSlides();
        updateDots();
    }
    
    // Next slide
    function nextSlide() {
        let nextIndex = currentIndex + 1;
        const maxIndex = Math.ceil(slides.length / config.slidesToShow) - 1;
        
        if (nextIndex > maxIndex) {
            if (config.infinite) {
                nextIndex = 0;
            } else {
                return;
            }
        }
        
        goToSlide(nextIndex);
    }
    
    // Previous slide
    function prevSlide() {
        let prevIndex = currentIndex - 1;
        
        if (prevIndex < 0) {
            if (config.infinite) {
                const maxIndex = Math.ceil(slides.length / config.slidesToShow) - 1;
                prevIndex = maxIndex;
            } else {
                return;
            }
        }
        
        goToSlide(prevIndex);
    }
    
    // Start auto-play
    function startAutoPlay() {
        if (config.autoPlay && slides.length > 1) {
            autoPlayInterval = setInterval(nextSlide, config.autoPlayDelay);
        }
    }
    
    // Stop auto-play
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Transition end handler
    function onTransitionEnd() {
        isTransitioning = false;
        // Clone first/last slides for infinite loop if needed (advanced seamless)
        if (config.infinite && slides.length > config.slidesToShow) {
            // Reset for seamless infinite (optional enhancement)
            if (currentIndex >= Math.ceil(slides.length / config.slidesToShow)) {
                currentIndex = 0;
                slidesContainer.style.transition = 'none';
                updateSlides();
            }
        }
    }
    
    // Touch/Swipe support
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        stopAutoPlay();
    }
    
    function handleTouchMove(e) {
        touchEndX = e.touches[0].clientX;
    }
    
    function handleTouchEnd() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoPlay();
    }
    
    // Keyboard support
    function handleKeyDown(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    }
    
    // Responsive handling (update slidesToShow on resize)
    function updateResponsive() {
        const width = window.innerWidth;
        // Customize breakpoints for Hair by Akose
        if (width < 768) {
            config.slidesToShow = 1;
        } else if (width < 1025) {
            config.slidesToShow = 2;
        } else {
            config.slidesToShow = 3;
        }
        // Recalc currentIndex if needed
        currentIndex = Math.min(currentIndex, Math.ceil(slides.length / config.slidesToShow) - 1);
        updateSlides();
        createDots();
        updateDots();
    }
    
    // Event Listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    slidesContainer.addEventListener('transitionend', onTransitionEnd);
    slidesContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    slidesContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
    slidesContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    carousel.addEventListener('focusin', stopAutoPlay);
    carousel.addEventListener('focusout', startAutoPlay);
    carousel.addEventListener('keydown', handleKeyDown);
    
    // Resize handler (debounced)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateResponsive, 250);
    });
    
    // Initial setup
    if (slides.length > 0) {
        slidesContainer.style.display = 'flex';
        slides.forEach(slide => {
            slide.style.flex = `0 0 ${100 / config.slidesToShow}%`;
            slide.style.minWidth = `${100 / config.slidesToShow}%`;
        });
        createDots();
        updateSlides();
        updateDots();
        updateResponsive();
        startAutoPlay();
    }
    
    // Pause initial animations if carousel has .work-item or similar
    const carouselItems = carousel.querySelectorAll('.service-card, .work-item, .testimonial-card');
    carouselItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    });
}

// ==========================================
// UTILITY FUNCTIONS (Extended for Carousel)
// ==========================================

// Throttle (already in main.js, but duplicated for independence)
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

// ==========================================
// USAGE EXAMPLE (Add to your HTML):
// ==========================================
// <div class="carousel">
//   <div class="carousel-slides">
//     <div class="carousel-slide"><img src="img1.jpg" alt="Work 1"></div>
//     <div class="carousel-slide"><img src="img2.jpg" alt="Work 2"></div>
//     ...
//   </div>
//   <button class="carousel-prev">❮</button>
//   <button class="carousel-next">❯</button>
//   <!-- Dots auto-generated -->
// </div>
//
// CSS (minimal required):
// .carousel { position: relative; overflow: hidden; }
// .carousel-slides { display: flex; transition: transform 0.5s ease; }
// .carousel-slide { flex: 0 0 100%; } /* Adjust for multi-slide */
// .carousel-prev, .carousel-next { position: absolute; top: 50%; background: rgba(0,0,0,0.5); color: white; border: none; }
// .carousel-dots { display: flex; justify-content: center; gap: 10px; }
// .carousel-dot { width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.5); border: none; cursor: pointer; }
// .carousel-dot.active { background: white; }
// .carousel-prev { left: 10px; } .carousel-next { right: 10px; }
