// Portfolio Gallery Filter & Interactions

document.addEventListener('DOMContentLoaded', function() {
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.getElementById('loadMore');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // Load more functionality (placeholder)
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In production, this would load more images
            alert('Load more functionality - add more gallery items here!');
        });
    }
    
    // Lightbox/zoom functionality (basic)
    const iconBtns = document.querySelectorAll('.icon-btn');
    iconBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('Lightbox view would open here - implement with a library like Lightbox2 or Fancybox');
        });
    });
    
    console.log('Portfolio gallery initialized ✨');
});