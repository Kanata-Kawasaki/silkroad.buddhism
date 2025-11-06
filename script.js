// Function to set up parallax scrolling effect
function setupParallaxEffect() {
    // Get all slider items
    const sliderItems = document.querySelectorAll('.bg-slider-item');
    
    // Set higher depth values for more pronounced effect
    const baseDepths = [0.2, 0.25, 0.3, 0.35, 0.4, 0.3, 0.25, 0.2];
    
    // Get data-depth attributes for each item or use our enhanced values
    const depths = Array.from(sliderItems).map((item, index) => {
        return parseFloat(item.getAttribute('data-depth') || baseDepths[index % baseDepths.length]);
    });
    
    // Add scroll event listener with throttling for better performance
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallax(lastScrollY);
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // Function to update parallax effect
    function updateParallax(scrollY) {
        // Apply parallax effect to each slider item
        sliderItems.forEach((item, index) => {
            // Only apply effect to visible items
            if (parseFloat(item.style.opacity) > 0) {
                // Calculate transform based on scroll position and depth
                const depth = depths[index];
                
                // Create more dynamic movement with horizontal shift and rotation
                const moveY = scrollY * depth;
                const moveX = Math.sin(scrollY * 0.001) * 10; // Subtle horizontal movement
                const rotate = Math.sin(scrollY * 0.0005) * 0.5; // Very subtle rotation
                
                // Add scale effect based on scroll position
                const scale = 1.05 + (scrollY * 0.0001);
                
                // Apply transform with easing for smoother effect
                item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)
                                       rotate(${rotate}deg)
                                       scale(${scale})`;
                
                // Adjust opacity to make background more visible during scroll
                const baseOpacity = 1;
                item.style.opacity = baseOpacity.toString();
                
                // Log for debugging (only occasionally)
                if (index === 0 && scrollY % 2000 === 0) {
                    console.log(`Enhanced parallax effect: scrollY=${scrollY}, depth=${depth}, moveY=${moveY}, moveX=${moveX}`);
                }
            }
        });
    }
    
    // Initial update
    updateParallax(lastScrollY);
    
    // Log setup
    console.log('Enhanced parallax effect set up');
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Set up the background slider
    setupBackgroundSlider();
    
    // Set up smooth scrolling
    setupSmoothScrolling();
    
    // Set up back to top button
    setupBackToTopButton();
    
    // Set up parallax scrolling effect
    setupParallaxEffect();
});

// Function to set up the background slider
function setupBackgroundSlider() {
    console.log('Setting up background slider');
    
    // Image paths and captions (all captions removed)
    // Using available background images
    const slides = [
        { image: 'images/bg-1.jpg', caption: '' },
        { image: 'images/bg-3.jpg', caption: '' }
    ];
    
    // Start with bg-1 as requested
    let currentIndex = 0;
    
    // Create HTML for slider items with data-depth attributes for parallax effect
    let sliderHTML = '';
    // Use the same depth values as in setupParallaxEffect for consistency
    const baseDepths = [0.2, 0.25, 0.3, 0.35, 0.4, 0.3, 0.25, 0.2];
    
    slides.forEach((slide, index) => {
        // Assign different depths to create varied parallax effect
        const depth = baseDepths[index % baseDepths.length];
        
        sliderHTML += `
            <div class="bg-slider-item ${index === currentIndex ? 'active' : ''}"
                 data-depth="${depth}"
                 style="background-image: url('${slide.image}'); opacity: ${index === currentIndex ? 1 : 0};">
                ${slide.caption ? `<div class="bg-caption">${slide.caption}</div>` : ''}
            </div>
        `;
    });
    
    // Insert the HTML into the slider container
    const sliderContainer = document.querySelector('.bg-slider');
    sliderContainer.innerHTML = sliderHTML;
    
    console.log('Created slider items for', slides.length, 'images');
    
    // Get all slider items
    const sliderItems = document.querySelectorAll('.bg-slider-item');
    // currentIndex is already declared above
    
    // Function to change slides
    function changeSlide() {
        // Hide current slide and remove active class
        sliderItems[currentIndex].style.opacity = 0;
        sliderItems[currentIndex].classList.remove('active');
        // console.log('Hiding slide', currentIndex + 1);
        
        // Move to next slide
        currentIndex = (currentIndex + 1) % sliderItems.length;
        
        // Show next slide and add active class
        sliderItems[currentIndex].style.opacity = 1; // Full opacity for active slide
        sliderItems[currentIndex].classList.add('active');
        // console.log('Showing slide', currentIndex + 1);
        
        // Apply initial parallax effect to the new active slide
        const depth = parseFloat(sliderItems[currentIndex].getAttribute('data-depth') || 0.2);
        const scrollY = window.scrollY;
        const moveX = Math.sin(scrollY * 0.001) * 10;
        const rotate = Math.sin(scrollY * 0.0005) * 0.5;
        const scale = 1.05 + (scrollY * 0.0001);
        
        sliderItems[currentIndex].style.transform = `translate3d(${moveX}px, ${scrollY * depth}px, 0)
                                                    rotate(${rotate}deg)
                                                    scale(${scale})`;
        
        // Caption handling (if needed in the future)
    }
    
    // Change slide every 4 seconds
    console.log('Starting slide interval (4 seconds)');
    const slideInterval = setInterval(changeSlide, 4000);
    
    // Log when slides change
    setTimeout(() => {
        console.log('First slide change should happen now');
    }, 4000);
    
    // Function to jump to a specific slide (for testing)
    window.jumpToSlide = function(index) {
        if (index >= 0 && index < sliderItems.length) {
            // Hide current slide and remove active class
            sliderItems[currentIndex].style.opacity = 0;
            sliderItems[currentIndex].classList.remove('active');
            
            // Show requested slide and add active class
            currentIndex = index;
            sliderItems[currentIndex].style.opacity = 1;
            sliderItems[currentIndex].classList.add('active');
            
            // Apply initial parallax effect to the new active slide
            const depth = parseFloat(sliderItems[currentIndex].getAttribute('data-depth') || 0.2);
            const scrollY = window.scrollY;
            const moveX = Math.sin(scrollY * 0.001) * 10;
            const rotate = Math.sin(scrollY * 0.0005) * 0.5;
            const scale = 1.05 + (scrollY * 0.0001);
            
            sliderItems[currentIndex].style.transform = `translate3d(${moveX}px, ${scrollY * depth}px, 0)
                                                        rotate(${rotate}deg)
                                                        scale(${scale})`;
            
            // console.log('Jumped to slide', currentIndex + 1);
        }
    };
    
    // Keep the jumpToSlide function for future use, but don't auto-jump to bg-6
}

// Function to set up smooth scrolling
function setupSmoothScrolling() {
    // Log all section IDs for debugging
    console.log('Available sections:');
    document.querySelectorAll('section[id]').forEach(section => {
        console.log(`- #${section.id} (${section.offsetTop}px from top)`);
    });
    
    // Set up click handlers for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // console.log('Setting up click handler for:', anchor.getAttribute('href'));
        
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            // console.log('Link clicked:', targetId);
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // console.log('Target found:', targetId);
                
                // Force scroll to element directly
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // console.log('Scrolling to position:', targetPosition);
                
                // Use both methods for better compatibility
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Alternative method as fallback
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // console.log('Used scrollIntoView as fallback');
                }, 100);
            } else {
                // console.error('Target element not found:', targetId);
            }
        });
    });
    
    // Check for hash in URL on page load
    window.addEventListener('load', function() {
        // console.log('Page fully loaded, checking for hash');
        if (window.location.hash) {
            // console.log('Found hash in URL:', window.location.hash);
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                setTimeout(() => {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    // console.log('Scrolling to hash position:', targetPosition);
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 500);
            }
        }
    });
}

// Function to set up back to top button
function setupBackToTopButton() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}