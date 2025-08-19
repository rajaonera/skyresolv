// ==========================
// SkyResolve Website Script
// ==========================

// 🔹 1. Hover effect sur les cartes de services
document.querySelectorAll('.service-card').forEach(card => {
  let hoverTimeout;
  card.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimeout);
    card.classList.add('hovered');
  });
  card.addEventListener('mouseleave', () => {
    hoverTimeout = setTimeout(() => {
      card.classList.remove('hovered');
    }, 150);
  });
});

// 🔹 2. Animation au clic sur section
document.querySelectorAll('section').forEach(section => {
  section.addEventListener('click', () => {
    section.classList.add('section-clicked');
    setTimeout(() => section.classList.remove('section-clicked'), 500);
  });
});

// 🔹 3. Animation de révélation au scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  const revealPoint = 150;

  reveals.forEach(el => {
    const revealTop = el.getBoundingClientRect().top;
    el.classList.toggle('active', revealTop < windowHeight - revealPoint);
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// 🔹 4. Toggle menu mobile
const menuBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// 🔹 5. Soumission du formulaire (détection de candidature)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    const message = document.getElementById('message')?.value.toLowerCase() || "";
    const isJobApp = ["cv", "job", "recrutement", "candidature"].some(word => message.includes(word));

    if (isJobApp) {
      const subjectInput = document.getElementById('form-subject');
      if (subjectInput) subjectInput.value = "Job Application from Sky Resolve website";
      this.action = "https://formspree.io/f/recrutement@skyresolve.com";
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
    }
  });

  // 🔹 6. Gestion succès/échec (Formspree)
  contactForm.addEventListener('formspree', function (e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Envoyer votre message';
    }

    if (e.detail.success) {
      const successMsg = document.getElementById('form-success');
      if (successMsg) {
        successMsg.classList.remove('hidden');
        successMsg.scrollIntoView({ behavior: 'smooth' });
      }
      this.reset();
    } else {
      alert('Erreur lors de l’envoi. Veuillez réessayer plus tard.');
    }
  });
}

// 🔹 7. Scroll fluide avec offset (ancrage interne)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetID = this.getAttribute('href');
    const target = document.querySelector(targetID);
    if (!target) return;

    e.preventDefault();
    if (mobileMenu) mobileMenu.classList.add('hidden'); // ferme menu mobile

    const offset = 80; // hauteur header fixe
    const elementTop = target.getBoundingClientRect().top + window.pageYOffset;
    const scrollTo = elementTop - offset;

    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
  });
});

// 🔹 8. Intersection Observer pour fade-in
const fadeInObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in-up').forEach((el, index) => {
  el.style.transitionDelay = `${index * 0.1}s`;
  fadeInObserver.observe(el);
});

// 🔹 9. Ajout CSS dynamique pour animations
const style = document.createElement('style');
style.textContent = `
  .fade-in-up {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .fade-in-up.animate {
    opacity: 1;
    transform: translateY(0);
  }
  .service-card.hovered .service-description {
    transition-delay: 0.1s;
  }
  @media (max-width: 768px) {
    .service-description {
      opacity: 1 !important;
      transform: translateY(0) !important;
      max-height: none !important;
      transition-delay: 0s !important;
    }
    .service-card { height: auto; min-height: 400px; }
    .hover-indicator { display: none; }
  }
`;
document.head.appendChild(style);
