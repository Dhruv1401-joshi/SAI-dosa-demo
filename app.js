/**
 * SAI DOSA — CLIENT SCRIPTS
 * Includes: Scroll Reveal, Menu Category Filtering,
 * Table Reservation Modal, Mobile Drawer, and Smooth Scroll Highlighting.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Sticky Navbar & Active Navigation Highlighting ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Update active nav link on scroll
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // --- Mobile Drawer Navigation ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --- Scroll Reveal Animations (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback
    revealElements.forEach(el => el.classList.add('active'));
  }

  // --- Menu Category Filtering ---
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuCards = document.querySelectorAll('.menu-card');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Switch active tab styling
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selectedCategory = tab.getAttribute('data-category');

      menuCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category') || '';
        if (selectedCategory === 'all' || cardCategories.includes(selectedCategory)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --- Toast Notification Helper ---
  const toast = document.getElementById('toast');
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // --- Table Reservation Modal ---
  const reserveModal = document.getElementById('reserve-modal');
  const openReserveBtn = document.getElementById('open-reserve-btn');
  const reserveClose = document.getElementById('reserve-close');
  const reserveForm = document.getElementById('reserve-form');

  function openReservation() {
    if (reserveModal) {
      // Default to today's date
      const dateInput = document.getElementById('res-date');
      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.min = today;
      }
      reserveModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeReservation() {
    if (reserveModal) {
      reserveModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (openReserveBtn) openReserveBtn.addEventListener('click', openReservation);
  if (reserveClose) reserveClose.addEventListener('click', closeReservation);
  if (reserveModal) {
    reserveModal.addEventListener('click', (e) => {
      if (e.target === reserveModal) closeReservation();
    });
  }

  if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('res-name')?.value || 'Guest';
      const guests = document.getElementById('res-guests')?.value || 'Guests';
      const date = document.getElementById('res-date')?.value || '';
      const time = document.getElementById('res-time')?.value || '';

      closeReservation();
      showToast(`Table reserved for ${name} (${guests}) on ${date} at ${time}! 🎉`);
      reserveForm.reset();
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeReservation();
      closeDrawer();
    }
  });
});
