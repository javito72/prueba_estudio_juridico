// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(30, 60, 114, 0.95) 0%, rgba(42, 82, 152, 0.95) 100%)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const email = formData.get('email');
    
    // Basic email validation
    if (!isValidEmail(email)) {
        showAlert('Por favor, ingrese un email válido.', 'error');
        return;
    }
    
    // Show loading state
    showLoadingState();
    
    // Submit to Netlify
    fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    })
    .then(response => {
        if (response.ok) {
            hideLoadingState();
            showSuccessMessage();
            contactForm.reset();
            
            // Auto hide success message after 5 seconds
            setTimeout(function() {
                hideSuccessMessage();
            }, 5000);
            
            console.log('Formulario enviado exitosamente a Netlify');
        } else {
            throw new Error('Error en el envío');
        }
    })
    .catch(error => {
        hideLoadingState();
        showAlert('Hubo un error al enviar el formulario. Por favor, intente nuevamente.', 'error');
        console.error('Error:', error);
    });
});
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show loading state
    function showLoadingState() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    }
    
    // Hide loading state
    function hideLoadingState() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Enviar Consulta';
    }
    
    // Show success message
    function showSuccessMessage() {
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Hide success message
    function hideSuccessMessage() {
        successMessage.style.display = 'none';
    }
    
    // Show alert function
    function showAlert(message, type = 'info') {
        // Remove existing alerts
        const existingAlerts = document.querySelectorAll('.custom-alert');
        existingAlerts.forEach(alert => alert.remove());
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `custom-alert alert-${type}`;
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="alert-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add styles
        alert.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'error' ? '#f8d7da' : '#d4edda'};
            color: ${type === 'error' ? '#721c24' : '#155724'};
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid ${type === 'error' ? '#f5c6cb' : '#c3e6cb'};
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(alert);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentElement) {
                alert.remove();
            }
        }, 5000);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .contact-item, .location-info').forEach(el => {
        observer.observe(el);
    });
    
    // Form input enhancements
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        // Add focus and blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time email validation
        if (input.type === 'email') {
            input.addEventListener('input', function() {
                const isValid = isValidEmail(this.value);
                if (this.value && !isValid) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = this.value ? '#28a745' : '#e0e0e0';
                }
            });
        }
    });
    
    // WhatsApp click tracking
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('WhatsApp contact initiated');
            // Here you could add analytics tracking
        });
    });
    
    // Scroll to top functionality
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #1e3c72;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effects to scroll top button
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.background = '#ffd700';
        this.style.color = '#1e3c72';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.background = '#1e3c72';
        this.style.color = 'white';
        this.style.transform = 'scale(1)';
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .form-group.focused label {
            color: #1e3c72;
            font-weight: 700;
        }
        
        .alert-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .alert-close {
            background: none;
            border: none;
            cursor: pointer;
            margin-left: auto;
            padding: 5px;
            border-radius: 3px;
            opacity: 0.7;
        }
        
        .alert-close:hover {
            opacity: 1;
            background: rgba(0,0,0,0.1);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
    
    // Console welcome message
    console.log('%c🏛️ Estudio Jurídico Buenos Aires', 'color: #1e3c72; font-size: 20px; font-weight: bold;');
    console.log('%cSitio web desarrollado con HTML, CSS y JavaScript', 'color: #666; font-size: 14px;');
    console.log('%cPara consultas: info@estudiojuridicoBA.com.ar', 'color: #666; font-size: 14px;');
});

// Additional utility functions
function detectMobile() {
    return window.innerWidth <= 768;
}

function getFormattedDate() {
    return new Date().toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Página cargada en ${Math.round(loadTime)}ms`);
});