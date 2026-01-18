// Smooth scrolling and active navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scroll with animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // Enhanced Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards with stagger effect
    const allCards = document.querySelectorAll('.service-card, .advantage-item, .why-card, .team-card');
    allCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Simple form validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Create mailto link
            const subject = encodeURIComponent('New Contact Form Submission from ECW Development Website');
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:info@ecwdevelopment.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            alert('Thank you for your message! Your email client should open shortly. If not, please contact us directly at 087 969 3195.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Enhanced navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.06)';
        }
    });

    // Add stagger animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        if (card.style.opacity === '') {
            card.style.transitionDelay = `${index * 0.05}s`;
        }
    });

    // Smooth hover animations for cards
    const allHoverCards = document.querySelectorAll('.service-card, .advantage-item, .why-card, .team-card');
    allHoverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Icon animations on hover
    const iconContainers = document.querySelectorAll('.service-icon, .why-icon, .team-image');
    iconContainers.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Button ripple effect (Stripe-style)
    document.querySelectorAll('.btn').forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Smooth number animations (for advantage numbers if needed)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Advantage numbers animation is handled below with numberObserver

    // Add parallax effect to background shapes (subtle)
    const heroShapes = document.querySelectorAll('.shape');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        heroShapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translate(${scrolled * speed * 0.5}px, ${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Enhanced smooth scrolling with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Text letter-by-letter animation
    function animateText(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.animation = `fadeIn 0.5s ease forwards ${index * 0.03}s`;
            element.appendChild(span);
        });
    }

    // Animate section titles on scroll
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.style.animation = 'slideUp 0.8s ease-out';
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => titleObserver.observe(title));

    // Stagger animation for service cards
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        staggerObserver.observe(card);
    });

    // 3D tilt effect on cards
    const cards = document.querySelectorAll('.service-card, .advantage-item, .why-card, .team-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Counter animation for numbers
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Animate advantage numbers on scroll (already handled above, so removed duplicate)

    // Logo animation on scroll
    const logo = document.querySelector('.logo h2');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            logo.style.transform = 'scale(0.95)';
            logo.style.transition = 'transform 0.3s ease';
        } else {
            logo.style.transform = 'scale(1)';
        }
    });

    // Navbar background animation
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Hero text reveal animation
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const words = heroTitle.textContent.split(' ');
        heroTitle.innerHTML = words.map((word, index) => 
            `<span style="opacity: 0; animation: slideUp 0.8s ease forwards ${index * 0.1}s;">${word}</span>`
        ).join(' ');
    }

    // Button magnetic effect
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // Icon spin on hover
    document.querySelectorAll('.service-icon i, .why-icon i, .team-image i').forEach(icon => {
        icon.parentElement.addEventListener('mouseenter', function() {
            icon.style.animation = 'rotate 0.5s ease-in-out';
        });
    });

    // Form input label animation
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #635bff, #7c3aed);
        z-index: 9999;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Smooth reveal animation for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        sectionObserver.observe(section);
    });

    // Make first section (hero) visible immediately
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }

    // Parallax effect for hero shapes (subtle)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            const rotation = scrolled * 0.05 * (index + 1);
            shape.style.transform = `translate(${scrolled * speed * 0.3}px, ${scrolled * speed}px) rotate(${rotation}deg)`;
        });
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);