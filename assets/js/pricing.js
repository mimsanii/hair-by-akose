// ==========================================
// PRICING PAGE JAVASCRIPT
// Interactive calculator with WhatsApp booking
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    const serviceSelect = document.getElementById('serviceSelect');
    const quoteResult = document.getElementById('quoteResult');
    const quoteName = document.getElementById('quoteName');
    const quotePrice = document.getElementById('quotePrice');
    const quoteTime = document.getElementById('quoteTime');
    const whatsappBookBtn = document.getElementById('whatsappBookBtn');
    
    // WhatsApp number (UPDATE THIS with actual number)
    const WHATSAPP_NUMBER = '1234567890'; // Replace with actual number
    
    // Service data
    const services = {
        'box-braids-small': {
            name: 'Box Braids (Small)',
            price: '2,000',
            time: '8-10',
            description: 'Small box braids for detailed, long-lasting style'
        },
        'box-braids-medium': {
            name: 'Box Braids (Medium)',
            price: '1,500',
            time: '6-8',
            description: 'Medium box braids - perfect balance of style and duration'
        },
        'box-braids-jumbo': {
            name: 'Box Braids (Jumbo)',
            price: '1,200',
            time: '4-6',
            description: 'Jumbo box braids for quick, bold look'
        },
        'cornrows-simple': {
            name: 'Cornrows (Simple)',
            price: '1,300',
            time: '2-3',
            description: 'Simple, neat cornrow styles'
        },
        'cornrows-complex': {
            name: 'Cornrows (Complex Pattern)',
            price: '1,500',
            time: '3-5',
            description: 'Intricate cornrow designs and patterns'
        },
        'knotless-braids': {
            name: 'Knotless Braids',
            price: '1,200-2,000',
            time: '6-8',
            description: 'Pain-free knotless braiding technique'
        },
        'micro-braiding': {
            name: 'Micro Braiding',
            price: '5,000-8,000',
            time: '10-14',
            description: 'Intricate micro braids for ultimate detail'
        },
        'senegalese-twists': {
            name: 'Senegalese Twists',
            price: '1,500-2,000',
            time: '5-7',
            description: 'Elegant Senegalese twists'
        },
        'marley-twists': {
            name: 'Marley Twists',
            price: '1,500-2,000',
            time: '5-7',
            description: 'Textured Marley twists'
        },
        'passion-twists': {
            name: 'Passion Twists',
            price: '1,500-2,000',
            time: '6-8',
            description: 'Bohemian passion twists'
        },
        'kinky-twists': {
            name: 'Kinky Twists',
            price: '1,500-2,000',
            time: '5-7',
            description: 'Beautiful kinky twist style'
        },
        'wig-lines': {
            name: 'Wig Lines',
            price: '500-1,000',
            time: '1-2',
            description: 'Professional wig installation lines'
        },
        'weave-install': {
            name: 'Weave Install',
            price: '1,500-2,000',
            time: '4-6',
            description: 'Professional weave installation'
        },
        'twist-out': {
            name: 'Twist Out',
            price: '1,000-1,500',
            time: '1.5-2',
            description: 'Beautiful defined twist out style'
        },
        'kids-braids': {
            name: 'Kids Braids',
            price: '1,000',
            time: '2-4',
            description: 'Gentle braiding for children'
        },
        'kids-twists': {
            name: 'Kids Twists',
            price: '1,000',
            time: '2-3',
            description: 'Kid-friendly twist styles'
        },
        'kids-cornrows': {
            name: 'Kids Cornrows',
            price: '800',
            time: '1-2',
            description: 'Simple cornrows for kids'
        },
        'micro-locs': {
            name: 'Micro Locs',
            price: '6,000',
            time: '12-16',
            description: 'Starter micro locs installation'
        },
        'micro-locs-retie': {
            name: 'Micro Locs Retie',
            price: '2,500-3,500',
            time: '6-8',
            description: 'Micro locs maintenance and retie'
        },
        'locs-retouch': {
            name: 'Locs Retouch',
            price: '1,200-1,500',
            time: '2-3',
            description: 'Professional locs retouch'
        },
        'bridal-styling': {
            name: 'Bridal Styling',
            price: '1,800-2,000',
            time: '3-5',
            description: 'Special bridal hair styling'
        },
        'natural-styling': {
            name: 'Natural Hair Styling',
            price: '1,000-1,800',
            time: '2-4',
            description: 'Professional natural hair styling'
        }
    };
    
    // Event listener for service selection
    serviceSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        
        if (selectedValue) {
            const service = services[selectedValue];
            
            // Update quote display
            quoteName.textContent = service.name;
            quotePrice.textContent = service.price;
            quoteTime.textContent = service.time;
            
            // Show quote result with animation
            quoteResult.style.display = 'block';
            
            // Scroll to result
            setTimeout(() => {
                quoteResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
            
            // Update WhatsApp button
            whatsappBookBtn.onclick = function() {
                sendWhatsAppMessage(service);
            };
            
        } else {
            quoteResult.style.display = 'none';
        }
    });
    
    // Function to send WhatsApp message
    function sendWhatsAppMessage(service) {
        const message = `Hi Akose! 👋\n\nI'd like to book an appointment for:\n\n📌 Service: ${service.name}\n💰 Price Range: KES ${service.price}\n⏱️ Duration: ${service.time} hours\n\n${service.description}\n\nPlease let me know your available dates and times. Thank you!`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');
        
        // Track booking attempt (optional - for analytics)
        console.log('WhatsApp booking initiated for:', service.name);
    }
    
    // Add click tracking to all pricing table items
    const priceItems = document.querySelectorAll('.price-item');
    
    priceItems.forEach(item => {
        item.addEventListener('click', function() {
            // Extract service name from the h4
            const serviceName = this.querySelector('h4').textContent;
            const priceValue = this.querySelector('.price-value').textContent;
            const duration = this.querySelector('.duration').textContent;
            
            // Scroll to calculator and pre-select service if possible
            serviceSelect.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Optional: highlight the calculator
            const calculator = document.querySelector('.pricing-calculator');
            calculator.style.animation = 'none';
            setTimeout(() => {
                calculator.style.animation = 'pulse 0.5s ease';
            }, 10);
        });
    });
    
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
    `;
    document.head.appendChild(style);
    
    // Make price items more interactive
    priceItems.forEach(item => {
        item.style.cursor = 'pointer';
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // FAQ Toggle functionality (if FAQ section exists)
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const answer = item.querySelector('.faq-answer');
                const isOpen = answer.style.maxHeight;
                
                // Close all other FAQs
                document.querySelectorAll('.faq-answer').forEach(a => {
                    a.style.maxHeight = null;
                });
                
                // Toggle current FAQ
                if (!isOpen) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
    
    console.log('Pricing calculator initialized ✨');
});

// Helper function to format WhatsApp links throughout the page
function initWhatsAppLinks() {
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .whatsapp-book');
    
    whatsappButtons.forEach(button => {
        if (!button.onclick) {
            button.addEventListener('click', function(e) {
                console.log('WhatsApp button clicked');
                // Already has href, but add tracking if needed
            });
        }
    });
}

// Initialize on load
window.addEventListener('load', initWhatsAppLinks);