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
          // Animation d'apparition au scroll avec Intersection Observer
          const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
  
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);
  
        // Observer tous les éléments avec fade-in-up
        document.querySelectorAll('.fade-in-up').forEach((el, index) => {
            // Délai progressif pour les cartes
            el.style.transitionDelay = `${index * 0.1}s`;
            fadeInObserver.observe(el);
        });
  
        // Amélioration du hover avec debounce pour éviter les animations trop rapides
        document.querySelectorAll('.service-card').forEach(card => {
            let hoverTimeout;
            
            card.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                card.classList.add('hovered');
            });
            
            card.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    card.classList.remove('hovered');
                }, 150); // Petit délai pour éviter les clignotements
            });
        });
  
        // Animation CSS additionnelle pour les éléments fade-in-up
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
            
            /* Amélioration responsive */
            @media (max-width: 768px) {
                .service-description {
                    opacity: 1;
                    transform: translateY(0);
                    max-height: none;
                    transition-delay: 0s;
                }
                
                .service-card {
                    height: auto;
                    min-height: 400px;
                }
                
                .hover-indicator {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
  