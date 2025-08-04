// 🔹 1. Hover effect sur les cartes de services
document.querySelectorAll('.service-card').forEach(card => {
    card.classList.add('hover-grow');
  });
  
  // 🔹 2. Animation au clic sur section
  document.querySelectorAll('section').forEach(section => {
    section.addEventListener('click', () => {
      section.classList.add('section-clicked');
      setTimeout(() => {
        section.classList.remove('section-clicked');
      }, 500);
    });
  });
  
  // 🔹 3. Animation de révélation au scroll
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
  
    reveals.forEach(el => {
      const revealTop = el.getBoundingClientRect().top;
      const revealPoint = 150;
  
      if (revealTop < windowHeight - revealPoint) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
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
  
      // Ferme le menu mobile si ouvert
      if (mobileMenu) mobileMenu.classList.add('hidden');
  
      const offset = 80;
      const elementTop = target.getBoundingClientRect().top + window.pageYOffset;
      const scrollTo = elementTop - offset;
  
      window.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
      });
    });
  });
  
  // 🔹 8. Animation d’apparition avec IntersectionObserver
  const observer = new IntersectionObserver(entries => {
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
  document.querySelectorAll('a.scroll-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
  
      const targetID = this.getAttribute('href');
      const targetElement = document.querySelector(targetID);
      if (!targetElement) return;
  
      const offset = 80; // ajuster selon la hauteur de ton header fixe
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
  