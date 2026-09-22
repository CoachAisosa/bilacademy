// ============================================================
// ========== HAMBURGER MENU FUNCTIONALITY ==========
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navContainer = document.getElementById('navContainer');

    // ⭐ IMPORTANT: Exit early if elements don't exist on this page
    if (!hamburger || !navContainer) {
        console.warn('⚠️ Hamburger or navContainer not found on this page');
        return;
    }

    console.log('✅ Hamburger menu initialized');

    // ----- Toggle menu on hamburger click -----
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the document click listener from immediately closing it

        this.classList.toggle('active');
        navContainer.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navContainer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // ----- Close menu when clicking a link -----
    document.querySelectorAll('.nav-container a').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navContainer.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // ----- Close menu when clicking outside -----
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navContainer.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navContainer.classList.contains('active')) {
            hamburger.classList.remove('active');
            navContainer.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ----- Close menu on ESC key -----
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navContainer.classList.contains('active')) {
            hamburger.classList.remove('active');
            navContainer.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}); // ← End of hamburger block


// ============================================================
// ========== FORM SUBMISSION HANDLER (Netlify) ==========
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // ⭐ If the form isn't on this page, skip everything
    if (!form || !successMessage) {
        console.warn('⚠️ Form or success message not found on this page');
        return;
    }

    const submitBtn = form.querySelector('.btn-submit');
    if (!submitBtn) {
        console.error('❌ Submit button not found in form!');
        return;
    }

    console.log('✅ Contact form initialized');

    // ----- Form submission -----
    form.addEventListener('submit', async function(e) {   // ⭐ async added
        e.preventDefault();

        console.log('📩 Form submitted!');

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Collect form data
        const formData = new FormData(form); // ⭐ correct spelling

        try {
            // ⭐ Send to Netlify (correct MIME type + spelling)
            const response = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' // ⭐ fixed
                },
                body: new URLSearchParams(formData).toString()
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            showSuccess();
        } catch (error) {
            console.error('❌ Form submission error:', error);

            // Reset button on failure
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';

            // Notify user
            alert('Sorry, something went wrong. Please try again or contact us directly.');
        }
    });

    // ----- Show success message -----
    function showSuccess() {
        console.log('✅ Showing success message...');

        form.style.display = 'none';
        form.reset();

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';

        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // ----- Reset form (called by "Send Another Message" button) -----
    window.resetForm = function() {
        console.log('🔄 Resetting form...');

        successMessage.style.display = 'none';
        form.style.display = 'block';
        form.reset();

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';

        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    // ----- Clear error state on input -----
    form.querySelectorAll('input, textarea').forEach(function(field) {
        field.addEventListener('input', function() {
            const parent = this.closest('.form-group');
            if (parent && parent.classList.contains('error')) {
                parent.classList.remove('error');
            }
        });
    });
}); // ← End of form block


// ============================================================
// ========== LIGHTBOX (Gallery Page Only) ==========
// ============================================================

(function() {
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const lightbox = document.getElementById('lightbox');

    // ⭐ EXIT EARLY if this isn't the gallery page
    if (!lightbox || galleryImages.length === 0) {
        return;
    }

    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('closeLightbox');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const counter = document.getElementById('counter');

    // ⭐ Exit if critical elements missing
    if (!lightboxImg || !closeBtn) {
        console.warn('⚠️ Lightbox elements missing');
        return;
    }

    let currentIndex = 0;
    const allImages = [];

    galleryImages.forEach(function(img) {
        allImages.push(img.src);
    });

    console.log('✅ Lightbox initialized with', allImages.length, 'images');

    function openLightbox(index) {
        if (index < 0) index = allImages.length - 1;
        if (index >= allImages.length) index = 0;
        currentIndex = index;

        lightboxImg.src = allImages[currentIndex];
        if (counter) {
            counter.textContent = (currentIndex + 1) + ' / ' + allImages.length;
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function prevImage() { openLightbox(currentIndex - 1); }
    function nextImage() { openLightbox(currentIndex + 1); }

    galleryImages.forEach(function(img, index) {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
})(); // ← End of lightbox block


// ============================================================
// ========== AUTO-UPDATE COPYRIGHT YEAR ==========
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});



// ============================================================
// ========== TRAINING COUNTDOWN BADGE ==========
// ============================================================

(function() {
    const badge = document.getElementById('flyerBadge');
    const daysLeftSpan = document.getElementById('daysLeft');
    
    // Exit if badge isn't on this page
    if (!badge || !daysLeftSpan) return;
    
    // ⭐⭐⭐ UPDATE THIS DATE EACH MONTH ⭐⭐⭐
    // Format: "YYYY-MM-DDTHH:MM:SS"
    const TRAINING_DATE = "2026-09-27T15:30:00";
    
    function updateCountdown() {
        const now = new Date();
        const trainingDate = new Date(TRAINING_DATE);
        
        // Calculate difference in milliseconds
        const diffMs = trainingDate - now;
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        
        // Reset classes (remove old state classes)
        badge.classList.remove('today', 'soon', 'expired');
        
        // Determine what message to show
        let message = '';
        let icon = 'fa-calendar-day';
        
        if (diffMs < 0) {
            // Training date has passed
            message = 'Training has started';
            badge.classList.add('expired');
            icon = 'fa-check-circle';
            
        } else if (diffDays === 0) {
            // Training is TODAY
            message = 'Training is TODAY!';
            badge.classList.add('today');
            icon = 'fa-bell';
            
        } else if (diffDays === 1) {
            // Tomorrow
            message = 'Training is TOMORROW!';
            badge.classList.add('soon');
            icon = 'fa-bell';
            
        } else if (diffDays <= 7) {
            // Within a week - check if it's Sunday
            const dayName = trainingDate.toLocaleDateString('en-US', { weekday: 'long' });
            message = 'Training is this ' + dayName + '!';
            badge.classList.add('soon');
            icon = 'fa-bell';
            
        } else if (diffDays <= 30) {
            // Within a month
            message = diffDays + ' days to go!';
            icon = 'fa-calendar-day';
            
        } else {
            // More than a month away
            const weeks = Math.ceil(diffDays / 7);
            message = weeks + ' weeks to go!';
            icon = 'fa-calendar-alt';
        }
        
        // Update the badge
        badge.innerHTML = '<i class="fas ' + icon + '"></i><span id="daysLeft">' + message + '</span>';
    }
    
    // Run immediately
    updateCountdown();
    
    // Update every minute (so it stays fresh if user leaves tab open)
    setInterval(updateCountdown, 60000);
    
    console.log('✅ Training countdown initialized');
})();


// ============================================================
// ========== PROGRAM DETAILS - SCROLL TO SECTION ==========
// ============================================================

(function() {
    const openBtn = document.querySelector('.aboutCurrentProgram');
    const programSection = document.getElementById('programDetails');

    // Exit if either element is missing (safe on other pages)
    if (!openBtn || !programSection) {
        console.warn('⚠️ Program details button or section not found');
        return;
    }

    console.log('✅ Program details scroll initialized');

    // Scroll to program section when button is clicked
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Smooth scroll to section
        programSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Optional: add a highlight pulse to draw attention
        programSection.classList.add('highlight');
        setTimeout(() => {
            programSection.classList.remove('highlight');
        }, 2000);
    });
})();

