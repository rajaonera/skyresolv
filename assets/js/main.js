
// Add hover-grow class to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.classList.add('hover-grow');
});

// Section click animation
document.querySelectorAll('section').forEach(section => {
    section.addEventListener('click', function() {
        this.classList.add('section-clicked');
        setTimeout(() => {
            this.classList.remove('section-clicked');
        }, 500);
    });
});

// Scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Form submission with job application detection
document.getElementById('contact-form').addEventListener('submit', function(e) {
    const message = document.getElementById('message').value.toLowerCase();
    const isJobApplication = message.includes('cv') || message.includes('job') || 
                            message.includes('recrutement') || message.includes('candidature');
    
    if (isJobApplication) {
        document.getElementById('form-subject').value = "Job Application from Sky Resolve website";
        this.action = "https://formspree.io/f/recrutement@skyresolve.com";
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
});

// Form submission success/error handling
document.getElementById('contact-form').addEventListener('formspree', function(e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Envoyer votre message';
    
    if (e.detail.success) {
        document.getElementById('form-success').classList.remove('hidden');
        document.getElementById('form-success').scrollIntoView({ behavior: 'smooth' });
        this.reset();
    } else {
        alert('Error sending message. Please try again later.');
    }
});
// Smooth scrolling for anchor links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();

// Close mobile menu if open
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenu) mobileMenu.classList.add('hidden');

const targetID = this.getAttribute('href');
const targetElement = document.querySelector(targetID);

if (targetElement) {
    const offset = 80; // décalage en pixels (ajuste selon ta hauteur de header fixe)

    // Calcul de la position à atteindre en tenant compte du décalage
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}
});
});

// Animation on scroll remains unchanged
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
    entry.target.classList.add('animate-fade-in');
    observer.unobserve(entry.target);
}
});
}, {
threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
observer.observe(section);
});