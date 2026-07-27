// ===== HAMBURGER MENU FUNCTIONALITY =====
const hamburger = document.getElementById('hamburger');
const navContainer = document.getElementById('navContainer');

// Make sure elements exist
if (hamburger && navContainer) {
    // Toggle menu on click
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Toggle classes
        this.classList.toggle('active');
        navContainer.classList.toggle('active');
        
        // Toggle body scroll
        if (navContainer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-container a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navContainer.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navContainer.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navContainer.classList.contains('active')) {
            hamburger.classList.remove('active');
            navContainer.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navContainer.classList.contains('active')) {
            hamburger.classList.remove('active');
            navContainer.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

hamburger.addEventListener('click', function() {
    console.log('Hamburger clicked!');
    console.log('navContainer classes:', navContainer.classList);
});



// ============================================================
// ========== FORM SUBMISSION HANDLER ==========
// ============================================================

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== GET ALL ELEMENTS =====
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // ===== CHECK IF ELEMENTS EXIST BEFORE PROCEEDING =====
    if (!form) {
        console.error('Form with id "contactForm" not found!');
        return;
    }
    
    if (!successMessage) {
        console.error('Success message with id "successMessage" not found!');
        return;
    }
    
    // Get submit button
    const submitBtn = form.querySelector('.btn-submit');
    if (!submitBtn) {
        console.error('Submit button not found in form!');
        return;
    }
    
    console.log('✅ Form found:', form);
    console.log('✅ Success message found:', successMessage);
    console.log('✅ Submit button found:', submitBtn);
    
    // ===== FORM SUBMISSION =====
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page refresh
        
        console.log('📩 Form submitted!');
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name') || '',
            email: formData.get('email') || '',
            phone: formData.get('phone') || '',
            subject: formData.get('subject') || '',
            message: formData.get('message') || ''
        };
        
        console.log('📋 Form Data:', data);
        
        // Simulate sending to server
        setTimeout(function() {
            showSuccess();
        }, 1500);
    });
    
    // ===== SHOW SUCCESS FUNCTION =====
    function showSuccess() {
        console.log('✅ Showing success message...');
        
        // Hide the form
        form.style.display = 'none';
        
        // Clear form fields
        form.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        
        // Show success message
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        console.log('✅ Success message is now visible!');
    }
    
    // ===== RESET FORM FUNCTION =====
    window.resetForm = function() {
        console.log('🔄 Resetting form...');
        
        // Hide success message
        successMessage.style.display = 'none';
        
        // Show form
        form.style.display = 'block';
        
        // Clear form
        form.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        
        // Scroll to form
        form.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        console.log('🔄 Form reset complete!');
    };
    
    // ===== REAL-TIME VALIDATION =====
    // Check if inputs exist before adding event listeners
    const inputs = form.querySelectorAll('input, textarea');
    if (inputs.length > 0) {
        inputs.forEach(function(field) {
            field.addEventListener('input', function() {
                const parent = this.closest('.form-group');
                if (parent && parent.classList.contains('error')) {
                    parent.classList.remove('error');
                }
            });
        });
        console.log('✅ Validation added to', inputs.length, 'fields');
    } else {
        console.warn('⚠️ No input fields found in form');
    }
    
    console.log('✅ Form is ready!');
});


//  <!-- ========== LIGHTBOX JAVASCRIPT ========== -->

        (function() {
            // Collect all gallery images
            const galleryImages = document.querySelectorAll('.gallery-grid img');
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightboxImg');
            const closeBtn = document.getElementById('closeLightbox');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const counter = document.getElementById('counter');

            let currentIndex = 0;
            let allImages = [];

            // Build array of image sources
            galleryImages.forEach(img => {
                allImages.push(img.src);
            });

            // Open lightbox
            function openLightbox(index) {
                if (index < 0) index = allImages.length - 1;
                if (index >= allImages.length) index = 0;
                currentIndex = index;
                lightboxImg.src = allImages[currentIndex];
                counter.textContent = `${currentIndex + 1} / ${allImages.length}`;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            // Close lightbox
            function closeLightbox() {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }

            // Navigate
            function prevImage() {
                openLightbox(currentIndex - 1);
            }

            function nextImage() {
                openLightbox(currentIndex + 1);
            }

            // Event listeners for gallery images
            galleryImages.forEach((img, index) => {
                img.addEventListener('click', function(e) {
                    e.preventDefault();
                    openLightbox(index);
                });
            });

            // Close button
            closeBtn.addEventListener('click', closeLightbox);

            // Navigation buttons
            prevBtn.addEventListener('click', prevImage);
            nextBtn.addEventListener('click', nextImage);

            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (!lightbox.classList.contains('active')) return;
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === 'ArrowRight') nextImage();
            });

            // Close on click outside image
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });

        })();


        // Auto-update copyright year
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});


