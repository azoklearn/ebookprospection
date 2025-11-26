// Smooth scroll animations
document.addEventListener('DOMContentLoaded', function() {
    
    // CTA Button Click Handler
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Animation du bouton
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                // Redirection vers Stripe
                window.location.href = 'https://buy.stripe.com/cNi28r1OF8UX21q2OK43S00';
            }, 200);
        });
    });

    // Intersection Observer pour les animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes de fonctionnalités
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });

    // Observer les cartes de témoignages
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        observer.observe(card);
    });

    // Effet de parallaxe léger sur le scroll
    let scrollPosition = 0;
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        scrollPosition = window.scrollY;
        
        if (scrollPosition < window.innerHeight) {
            hero.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            hero.style.opacity = 1 - (scrollPosition / 800);
        }
    });

    // Animation des prix
    const currentPrice = document.querySelector('.current-price');
    if (currentPrice) {
        animateValue(currentPrice, 0, 19.99, 1500);
    }

    // Animation des stats avec Intersection Observer
    const statsSection = document.querySelector('.stats-section');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                
                // Animer les nombres de stats
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    const finalValue = stat.textContent.includes('+') ? 50 : 100;
                    const suffix = stat.textContent.includes('+') ? '+' : '%';
                    
                    animateStatValue(stat, 0, finalValue, 1500, suffix);
                });
            }
        });
    }, { threshold: 0.3 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Fonction pour animer les stats
    function animateStatValue(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const value = Math.floor(start + (end - start) * easeOutQuad(progress));
            element.textContent = value + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // Fonction pour animer les nombres
    function animateValue(element, start, end, duration) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const value = start + (end - start) * easeOutQuad(progress);
            element.textContent = value.toFixed(2) + '€';
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // Fonction d'easing
    function easeOutQuad(t) {
        return t * (2 - t);
    }

    // Effet de hover sur les cartes de fonctionnalités
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#333333';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '#000000';
        });
    });

    // Effet de hover sur les cartes de témoignages
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#333333';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '#000000';
        });
    });

    // Ajout d'une classe pour les éléments visibles
    const allAnimatedElements = document.querySelectorAll('.hero, .features, .value-section, .cta-section');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    allAnimatedElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Cursor personnalisé au survol des boutons (optionnel)
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        
        button.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    });
});

// Prévenir le zoom sur mobile lors du double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

