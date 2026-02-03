// Portfolio Gallery Filter & Interactions

document.addEventListener('DOMContentLoaded', function() {
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.getElementById('loadMore');
    
    // Filter functionality with smooth animations
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items with stagger animation
            galleryItems.forEach((item, index) => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = `fadeInScale 0.5s ease ${index * 0.05}s forwards`;
                } else {
                    item.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
    
    // Load more functionality (placeholder)
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In production, this would load more images
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-plus"></i> Load More Work';
                alert('Add more portfolio images here!');
            }, 1000);
        });
    }
    
    console.log('Portfolio gallery initialized with animations ✨');
});
