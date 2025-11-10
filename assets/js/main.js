// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}
// WhatsApp Sticky Icon
function createWhatsAppIcon() {
    const whatsappIcon = document.createElement('a');
    whatsappIcon.href = 'https://wa.me/256773561423?text=Hello%20Cyrstal%20Quest%20Limited,%20I%20would%20like%20to%20inquire%20about%20your%20gold%20services';
    whatsappIcon.className = 'whatsapp-float';
    whatsappIcon.target = '_blank';
    whatsappIcon.rel = 'noopener noreferrer';
    whatsappIcon.setAttribute('aria-label', 'Contact us on WhatsApp');
    
    const tooltip = document.createElement('span');
    tooltip.className = 'whatsapp-tooltip';
    tooltip.textContent = 'Chat with us on WhatsApp';
    
    const icon = document.createElement('i');
    icon.className = 'fab fa-whatsapp';
    
    whatsappIcon.appendChild(icon);
    whatsappIcon.appendChild(tooltip);
    
    document.body.appendChild(whatsappIcon);
}

// Initialize WhatsApp icon when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createWhatsAppIcon();
});

// Hero Slider
const heroSlides = document.querySelectorAll('.hero-slide');
const heroIndicators = document.querySelectorAll('.hero-indicator');
let currentSlide = 0;
const slideInterval = 5000; // 5 seconds

function showSlide(index) {
    // Hide all slides
    heroSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all indicators
    heroIndicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Show the selected slide
    heroSlides[index].classList.add('active');
    heroIndicators[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    let next = currentSlide + 1;
    if (next >= heroSlides.length) {
        next = 0;
    }
    showSlide(next);
}

// Set up automatic sliding if hero exists
if (heroSlides.length > 0) {
    let slideTimer = setInterval(nextSlide, slideInterval);
    
    // Add click events to indicators
    heroIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideTimer);
            showSlide(index);
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.padding = '10px 0';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.9)';
            header.style.padding = '15px 0';
        }
    }
});

// Smooth scrolling for anchor links
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
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        }
    });
});

// Contact Form Handling (if on contact page)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    const formLoading = document.getElementById('form-loading');
    const submitBtn = document.getElementById('submit-btn');
    
    // Hide all status messages initially
    if (formSuccess) formSuccess.style.display = 'none';
    if (formError) formError.style.display = 'none';
    if (formLoading) formLoading.style.display = 'none';
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Show loading state
        if (submitBtn) submitBtn.disabled = true;
        if (formLoading) formLoading.style.display = 'block';
        if (formSuccess) formSuccess.style.display = 'none';
        if (formError) formError.style.display = 'none';
        
        // In a real Netlify deployment, the form would be automatically handled
        // This is just a simulation for demonstration purposes
        setTimeout(() => {
            // Simulate successful form submission
            if (formLoading) formLoading.style.display = 'none';
            if (formSuccess) formSuccess.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Re-enable submit button
            if (submitBtn) submitBtn.disabled = false;
            
            // Scroll to success message
            if (formSuccess) {
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 2000);
    });
}

// FAQ Accordion (if on about page)
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Stats Counter Animation (if on about page)
function animateStats() {
    const statElements = document.querySelectorAll('.stat-number');
    if (statElements.length === 0) return;
    
    const stats = [
        { target: 10, current: 0, increment: 1 },
        { target: 1000, current: 0, increment: 50 },
        { target: 200, current: 0, increment: 10 },
        { target: 4, current: 0, increment: 1 }
    ];
    
    let interval = setInterval(() => {
        let allCompleted = true;
        
        stats.forEach((stat, index) => {
            if (stat.current < stat.target) {
                stat.current += stat.increment;
                if (stat.current > stat.target) stat.current = stat.target;
                statElements[index].textContent = stat.current + (index === 0 ? '+' : '+');
                allCompleted = false;
            }
        });
        
        if (allCompleted) clearInterval(interval);
    }, 50);
}

// Initialize stats animation when section comes into view
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(statsSection);
}

// Product Tabs (if on products page)
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}