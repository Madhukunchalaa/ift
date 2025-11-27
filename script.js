document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.card, .feature-item, .sauce-box, .image-stack');
    animatedElements.forEach(el => {
        el.style.opacity = '0'; // Hide initially
        el.style.animationFillMode = 'forwards'; // Keep state after animation
        observer.observe(el);
    });

    // Truck Animation Sync
    const truck = document.querySelector('.moving-truck');
    const roadStops = document.querySelectorAll('.road-stop');

    if (truck && roadStops.length > 0) {
        function checkTruckPosition() {
            const truckRect = truck.getBoundingClientRect();
            const truckCenterY = truckRect.top + truckRect.height / 2;

            roadStops.forEach(stop => {
                const stopRect = stop.getBoundingClientRect();
                // Check if truck center is within the vertical range of the stop with some buffer
                if (truckCenterY >= stopRect.top - 50 && truckCenterY <= stopRect.bottom + 50) {
                    stop.classList.add('active');
                } else {
                    stop.classList.remove('active');
                }
            });

            requestAnimationFrame(checkTruckPosition);
        }

        // Start the loop
        requestAnimationFrame(checkTruckPosition);
    }
});
