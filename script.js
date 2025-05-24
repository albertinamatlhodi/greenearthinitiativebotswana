// Enhanced script.js for Green Earth Initiative Botswana

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling (contact & feedback)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const thankYou = form.querySelector('#thankYouMessage') || document.getElementById('thankYouMessage');
            if (thankYou) {
                form.style.display = 'none';
                thankYou.style.display = 'block';
            }
            form.reset();
            console.log('Form submitted:', new FormData(this));
        });
    });

    // Lazy loading images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .option-card, .info-item, .stat-item');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial run

    // Donation buttons
    const donateButtons = document.querySelectorAll('.donate-btn');
    donateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            donateButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            console.log('Selected donation amount:', this.textContent);
        });
    });

    // Archive dropdown
    const archiveDropdown = document.querySelector('.archive-dropdown');
    if (archiveDropdown) {
        archiveDropdown.addEventListener('change', function() {
            if (this.value !== 'Select Month') {
                console.log('Selected archive:', this.value);
            }
        });
    }

    // Tabs functionality
    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.tabTarget);
            tabContents.forEach(tabContent => tabContent.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));
            tab.classList.add('active');
            target.classList.add('active');
        });
    });

    // Footer year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
