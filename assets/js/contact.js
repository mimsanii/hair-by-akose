// Contact Form & FAQ Interactions

document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const faqItems = document.querySelectorAll('.faq-item');
    const submitBtn = document.getElementById('submitBtn');
    
    // Toast notification function
    function showToast(message, icon = 'check-circle') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
        document.body.appendChild(toast);
        
        // Auto remove after animation
        setTimeout(() => {
            toast.remove();
        }, 3500);
    }
    
    // Contact Form Submission with Formspree
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!submitBtn) return;
            
            const originalHTML = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Get the form action URL (Formspree endpoint)
                const formAction = contactForm.getAttribute('action');
                
                // Create FormData object
                const formData = new FormData(contactForm);
                
                // Send to Formspree
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success! Show success message
                    showToast('Booking request sent successfully!', 'check-circle');
                    
                    // Hide form, show success message
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                    
                    // Scroll to success message
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    console.log('✅ Form submitted successfully');
                    
                } else {
                    // Error from Formspree
                    throw new Error('Form submission failed');
                }
                
            } catch (error) {
                // Handle errors
                console.error('Form submission error:', error);
                showToast('Error sending message. Please try WhatsApp instead.', 'exclamation-circle');
                alert('There was an error sending your message. Please contact us directly via WhatsApp: +254 115 555 072');
                
            } finally {
                // Reset button
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }
        });
    }
    
    // FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return; // Safety check
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQs first
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const faqAnswer = faq.querySelector('.faq-answer');
                if (faqAnswer) {
                    faqAnswer.style.maxHeight = null;
                }
            });
            
            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                // Set max-height to the scroll height for smooth animation
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
        
        // Optional: Open first FAQ by default
        // Uncomment these lines if you want the first FAQ open on page load:
        // if (faqItems[0] === item) {
        //     item.classList.add('active');
        //     answer.style.maxHeight = answer.scrollHeight + 'px';
        // }
    });
    
    console.log('FAQ accordion initialized - ' + faqItems.length + ' items found ✨');
    
    // Smooth scroll to form if hash is present
    if (window.location.hash === '#contact-form') {
        setTimeout(() => {
            document.getElementById('contact-form').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }
    
    console.log('Contact page initialized ✨');
});