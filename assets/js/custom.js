/**
 * DEV HOUSE - Custom JavaScript
 * ========================================
 */

(function() {
    'use strict';

    // ========================================
    // DOM Ready Function
    // ========================================
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            document.attachEvent('onreadystatechange', function() {
                if (document.readyState !== 'loading') {
                    fn();
                }
            });
        }
    }

    // ========================================
    // Header Scroll Effect
    // ========================================
    function initHeaderScroll() {
        const header = document.getElementById('header');
        let lastScrollTop = 0;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                // Show header when scrolling down
                header.style.background = 'rgba(28, 29, 38, 0.98)';
                header.style.transform = 'translateY(0)';
            } else {
                // Hide header when at top
                header.style.background = 'rgba(28, 29, 38, 0.95)';
                header.style.transform = 'translateY(-100%)';
            }

            lastScrollTop = scrollTop;
        });
    }

    // ========================================
    // WhatsApp Button Analytics
    // ========================================
    function initWhatsAppAnalytics() {
        const whatsappButton = document.querySelector('.whatsapp-button');
        
        if (whatsappButton) {
            whatsappButton.addEventListener('click', function() {
                // Track WhatsApp clicks (you can integrate with Google Analytics here)
                console.log('WhatsApp button clicked');
                
                // Optional: Add a small delay to ensure the link opens
                setTimeout(function() {
                    // You can add additional tracking here
                }, 100);
            });
        }
    }

    // ========================================
    // Smooth Scrolling for Anchor Links
    // ========================================
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========================================
    // Performance Optimizations
    // ========================================
    function initPerformanceOptimizations() {
        // Lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ========================================
    // Accessibility Improvements
    // ========================================
    function initAccessibility() {
        // Skip link is now handled in CSS for better control
        // No dynamic creation to avoid scroll issues
    }

    // ========================================
    // Pull to Refresh Prevention
    // ========================================
    function initPullToRefreshPrevention() {
        let startY = 0;
        let currentY = 0;
        
        document.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
        }, { passive: false });
        
        document.addEventListener('touchmove', function(e) {
            currentY = e.touches[0].clientY;
            
            // Prevent pull to refresh
            if (window.scrollY === 0 && currentY > startY) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Prevent context menu on long press
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    }

    // ========================================
    // Error Handling
    // ========================================
    function initErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('JavaScript error:', e.error);
        });

        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }

    // ========================================
    // Initialize All Functions
    // ========================================
    ready(function() {
        initHeaderScroll();
        initWhatsAppAnalytics();
        initSmoothScrolling();
        initPerformanceOptimizations();
        initAccessibility();
        initPullToRefreshPrevention();
        initErrorHandling();
        
        console.log('DEV HOUSE - Custom JavaScript loaded successfully');
    });

})(); 