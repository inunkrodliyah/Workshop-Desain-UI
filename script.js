document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Carousel functionality
    function setupCarousel(carouselElements) {
        carouselElements.forEach(carousel => {
            const slides = carousel.querySelectorAll('.carousel-slide');
            const prevBtn = carousel.parentElement.querySelector('.prev-btn');
            const nextBtn = carousel.parentElement.querySelector('.next-btn');
            const indicator = carousel.parentElement.querySelector('.carousel-indicator');
            
            // Product info elements
            const productNames = {
                'quote-carousel': [
                    "Miss Dior Blooming Bouquet",
                    "Dior Homme Parfum",
                    "J'adore l'Or"
                ],
                'split-carousel-for-him': [
                    "Sauvage Elixir",
                    "Ambre Nuit",
                    "Dior Homme Parfum"
                ],
                'split-carousel-for-her': [
                    "J'adore Eau de Parfum Set",
                    "Miss Dior Parfum",
                    "Miss Dior Blooming Bouquet Set"
                ]
            };
            const productAromas = {
                'quote-carousel': [
                    "Floral fragrance with notes of rose, damascus and peony",
                    "Fragrance - Ambery, Woody and Floral Notes",
                    "Fragrance - Solar and Intense Floral Notes"
                ],
                'split-carousel-for-him': [
                    "Elixir - Spicy, Fresh and Woody Notes",
                    "Amber floral fragrance with subtle spicy aroma",
                    "Fragrance - Ambery, Woody and Floral Notes"
                ],
                'split-carousel-for-her': [
                    "Eau de Parfum and Travel Spray",
                    "Parfum - intense floral, fruity and woody notes",
                    "Eau de Toilette and Travel Spray"
                ]
            };
            const productDescs = {
                'quote-carousel': [
                    "A delicate and romantic fragrance that captures the essence of a blooming bouquet. Perfect for daytime wear and special occasions.",
                    "A sophisticated scent that combines amber warmth with woody depth and floral elegance for the modern man.",
                    "A luxurious golden fragrance that radiates with solar warmth and intense floral notes for a truly glamorous effect."
                ],
                'split-carousel-for-him': [
                    "A bold and intense fragrance for the modern man. Combines spicy freshness with woody depth for a captivating scent.",
                    "An elegant amber fragrance that blends floral notes with a subtle spicy warmth for a sophisticated evening scent.",
                    "A refined masculine fragrance that combines woody depth with floral elegance and amber warmth."
                ],
                'split-carousel-for-her': [
                    "A luxurious floral bouquet that celebrates femininity. The perfect combination for women who appreciate timeless elegance.",
                    "An intense floral fragrance with fruity accents and woody depth, perfect for the confident modern woman.",
                    "A delicate floral fragrance set that's perfect for travel, featuring the romantic Miss Dior Blooming Bouquet."
                ]
            };
            const productPrices = {
                'quote-carousel': [
                    "Rp 1.800.000",
                    "Rp 2.250.000",
                    "Rp 5.050.000"
                ]
            };

            let currentSlide = 0;
            const container = carousel.closest('.feature-container, .split-container');
            const carouselType = carousel.classList.contains('quote-carousel') ? 'quote-carousel' :
                                container.querySelector('h2').textContent === 'For Him' ? 'split-carousel-for-him' : 'split-carousel-for-her';

            function updateSlide() {
                slides.forEach((slide, index) => {
                    slide.classList.toggle('active', index === currentSlide);
                });
                
                indicator.textContent = `${currentSlide + 1}/${slides.length}`;
                
                // Update product info based on current slide
                if (container) {
                    const productName = container.querySelector('.product-name');
                    const productAroma = container.querySelector('.product-aroma');
                    const productDesc = container.querySelector('.product-desc');
                    const price = container.querySelector('.price');
                    
                    if (productName) productName.textContent = productNames[carouselType][currentSlide];
                    if (productAroma) productAroma.textContent = productAromas[carouselType][currentSlide];
                    if (productDesc) productDesc.textContent = productDescs[carouselType][currentSlide];
                    if (price && carouselType === 'quote-carousel') price.textContent = productPrices[carouselType][currentSlide];
                }
            }

            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlide();
            });

            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlide();
            });

            // Initialize
            updateSlide();
        });
    }

    // Setup all carousels
    const quoteCarousels = document.querySelectorAll('.quote-carousel');
    const splitCarousels = document.querySelectorAll('.split-carousel');

    setupCarousel(quoteCarousels);
    setupCarousel(splitCarousels);

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                history.pushState(null, null, targetId);
            }
        });
    });

    // Navbar background change on scroll
    const handleNavbarScroll = function() {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    };

    // Initialize
    handleNavbarScroll();
    window.addEventListener('scroll', handleNavbarScroll);

    // Form submission handling
    const ctaForm = document.querySelector('.cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;

            localStorage.setItem('userEmail', email);
            alert('Thank you for signing up! You will receive our newsletter soon.');
            this.reset();
        });
    }
});