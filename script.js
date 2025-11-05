// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(44, 62, 80, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(44, 62, 80, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling - SERÁ MANEJADO MÁS ABAJO CON VALIDACIÓN COMPLETA
console.log('Cargando script.js...');

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        font-family: 'Roboto', sans-serif;
    `;
    
    // Add animation styles to head if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                margin-left: 15px;
                padding: 0;
                width: 25px;
                height: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.3s ease;
            }
            .notification-close:hover {
                background: rgba(255,255,255,0.2);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .program-card, .testimonial-card, .about-text, .about-image');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                stat.textContent = '0' + (text.includes('+') ? '+' : text.includes('%') ? '%' : '');
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Add active class styles
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
    .nav-link.active {
        color: #ff6b35 !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeNavStyle);

// Testimonials slider functionality (optional enhancement)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            testimonial.style.display = 'block';
            testimonial.style.opacity = '1';
        } else {
            testimonial.style.opacity = '0.7';
        }
    });
}

// Auto-rotate testimonials every 5 seconds (optional)
if (testimonials.length > 1) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 8000);
}

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid #ff6b35;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10001;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    body.loaded::before,
    body.loaded::after {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    }
`;
document.head.appendChild(loadingStyle);

// Form validation
function validateForm(form) {
    console.log('=== INICIANDO VALIDACIÓN ===');
    
    const inputs = form.querySelectorAll('input[required]');
    const selects = form.querySelectorAll('select[required]');
    const textareas = form.querySelectorAll('textarea[required]');
    
    let isValid = true;
    let invalidFields = [];
    
    console.log(`Encontrados: ${inputs.length} inputs, ${selects.length} selects, ${textareas.length} textareas requeridos`);
    
    // Validar inputs de texto
    inputs.forEach((input, index) => {
        const value = input.value.trim();
        const fieldName = input.name || input.placeholder || input.tagName;
        
        console.log(`Input ${index + 1} (${fieldName}): "${value}" - Longitud: ${value.length}`);
        
        if (!value) {
            isValid = false;
            invalidFields.push(fieldName);
            input.style.borderColor = '#f44336';
            input.style.boxShadow = '0 0 10px rgba(244, 67, 54, 0.3)';
            console.log(`❌ Input ${fieldName} está vacío`);
        } else {
            input.style.borderColor = '';
            input.style.boxShadow = '';
            console.log(`✅ Input ${fieldName} válido`);
        }
    });
    
    // Validar selects
    selects.forEach((select, index) => {
        const value = select.value;
        const fieldName = select.name || 'select';
        
        console.log(`Select ${index + 1} (${fieldName}): "${value}"`);
        
        if (!value || value === '') {
            isValid = false;
            invalidFields.push(fieldName);
            select.style.borderColor = '#f44336';
            select.style.boxShadow = '0 0 10px rgba(244, 67, 54, 0.3)';
            console.log(`❌ Select ${fieldName} no seleccionado`);
        } else {
            select.style.borderColor = '';
            select.style.boxShadow = '';
            console.log(`✅ Select ${fieldName} válido`);
        }
    });
    
    // Validar textareas
    textareas.forEach((textarea, index) => {
        const value = textarea.value.trim();
        const fieldName = textarea.name || textarea.placeholder || 'textarea';
        
        console.log(`Textarea ${index + 1} (${fieldName}): "${value}" - Longitud: ${value.length}`);
        
        if (!value) {
            isValid = false;
            invalidFields.push(fieldName);
            textarea.style.borderColor = '#f44336';
            textarea.style.boxShadow = '0 0 10px rgba(244, 67, 54, 0.3)';
            console.log(`❌ Textarea ${fieldName} está vacío`);
        } else {
            textarea.style.borderColor = '';
            textarea.style.boxShadow = '';
            console.log(`✅ Textarea ${fieldName} válido`);
        }
    });
    
    // Validación específica del email
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim()) {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(emailValue);
        
        console.log(`Email encontrado: "${emailValue}"`);
        console.log(`Email válido según regex: ${isEmailValid}`);
        
        if (!isEmailValid) {
            isValid = false;
            invalidFields.push('email format');
            emailInput.style.borderColor = '#f44336';
            emailInput.style.boxShadow = '0 0 10px rgba(244, 67, 54, 0.3)';
            console.log(`❌ Formato de email inválido`);
        } else {
            console.log(`✅ Email formato válido`);
        }
    }
    
    console.log(`=== RESULTADO VALIDACIÓN ===`);
    console.log(`Válido: ${isValid}`);
    console.log(`Campos inválidos: [${invalidFields.join(', ')}]`);
    console.log(`===============================`);
    
    return isValid;
}

// Enhanced form submission
const contactForm = document.querySelector('.contact-form form');
console.log('Formulario encontrado:', contactForm);

if (contactForm) {
    console.log('Agregando event listener al formulario');
    
    contactForm.addEventListener('submit', function(e) {
        console.log('=== FORMULARIO ENVIADO ===');
        e.preventDefault();
        
        // Debug: mostrar el formulario que se está validando
        console.log('Formulario recibido en event listener:', this);
        
        if (!validateForm(this)) {
            showNotification('Por favor, completa todos los campos correctamente.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(this);
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const telefono = formData.get('telefono');
        const objetivo = formData.get('objetivo');
        const mensaje = formData.get('mensaje');
        
        // Create email content
        const emailSubject = 'Nueva consulta desde AUGE - ' + nombre;
        const emailBody = `Hola Emiliano,

Has recibido una nueva consulta desde tu sitio web AUGE:

DATOS DEL CLIENTE:
- Nombre: ${nombre}
- Email: ${email}
- Teléfono: ${telefono}
- Objetivo: ${objetivo}

MENSAJE:
${mensaje}

---
Este email fue generado automáticamente desde el formulario de contacto de AUGE Entrenamientos.`;
        
        const mailtoLink = `mailto:emiliano.grella@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form after a short delay
        setTimeout(() => {
            showNotification('Se abrió tu cliente de email para enviar la consulta.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// WhatsApp floating button scroll animation
let isScrolling = false;
let scrollTimer = null;

window.addEventListener('scroll', () => {
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Add scrolling class
        whatsappButton.classList.add('scrolling');
        
        // Clear existing timer
        clearTimeout(scrollTimer);
        
        // Remove scrolling class after scroll stops
        scrollTimer = setTimeout(() => {
            whatsappButton.classList.remove('scrolling');
        }, 150);
    }
});

// Add click animation to WhatsApp button
document.addEventListener('DOMContentLoaded', () => {
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
});

// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption-text');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let currentImageIndex = 0;
    const images = Array.from(document.querySelectorAll('.gallery-image'));
    
    // Open lightbox when clicking on gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox();
        });
    });
    
    function openLightbox() {
        const currentImage = images[currentImageIndex];
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
        lightboxCaption.textContent = currentImage.dataset.caption || currentImage.alt;
        
        // Update navigation buttons
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === images.length - 1;
        
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    // Close lightbox events
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    openLightbox();
                }
                break;
            case 'ArrowRight':
                if (currentImageIndex < images.length - 1) {
                    currentImageIndex++;
                    openLightbox();
                }
                break;
        }
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            openLightbox();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            openLightbox();
        }
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    lightboxImage.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    lightboxImage.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentImageIndex < images.length - 1) {
                // Swipe left - next image
                currentImageIndex++;
                openLightbox();
            } else if (diff < 0 && currentImageIndex > 0) {
                // Swipe right - previous image
                currentImageIndex--;
                openLightbox();
            }
        }
    }
});