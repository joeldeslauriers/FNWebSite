/**
 * Me Francis Renaud — Notaire · Mirabel
 * main.js — Production-ready JavaScript
 */

'use strict';

/* ── Smooth Scroll ──────────────────────────────────────────── */
function initSmoothScroll() {
  const NAVBAR_HEIGHT = 72;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var targetTop = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });

      // Close mobile menu if open
      closeMobileMenu();
    });
  });
}

/* ── Navbar Shadow on Scroll ────────────────────────────────── */
function initNavbarScroll() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load
}

/* ── Hamburger Menu ─────────────────────────────────────────── */
var hamburgerOpen = false;

function closeMobileMenu() {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburgerOpen = false;
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('open');
}

function initHamburger() {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function () {
    hamburgerOpen = !hamburgerOpen;

    if (hamburgerOpen) {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      navLinks.classList.add('open');
    } else {
      closeMobileMenu();
    }
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (hamburgerOpen && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hamburgerOpen) {
      closeMobileMenu();
      hamburger.focus();
    }
  });
}

/* ── Toast Notification ─────────────────────────────────────── */
function showToast(message) {
  var toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove('hide');
  toast.classList.add('show');

  setTimeout(function () {
    toast.classList.remove('show');
    toast.classList.add('hide');

    setTimeout(function () {
      toast.classList.remove('hide');
      toast.textContent = '';
    }, 450);
  }, 4500);
}

/* ── Contact Form Submit ────────────────────────────────────── */
function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    var required = form.querySelectorAll('[required]');
    var valid = true;

    required.forEach(function (field) {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#c0392b';
        valid = false;
      }
    });

    // Email format check
    var emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailField.value.trim())) {
        emailField.style.borderColor = '#c0392b';
        valid = false;
      }
    }

    if (!valid) {
      showToast('⚠️ Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Simulate form submission (replace with real endpoint)
    var submitBtn = form.querySelector('.btn-submit');
    submitBtn.textContent = 'Envoi en cours…';
    submitBtn.disabled = true;

    setTimeout(function () {
      showToast('✅ Votre demande a été envoyée! Nous vous répondrons sous 24h.');
      form.reset();
      submitBtn.textContent = 'Envoyer ma demande';
      submitBtn.disabled = false;
    }, 1200);
  });
}

/* ── Intersection Observer (scroll animations) ──────────────── */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: make everything visible
    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  var observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Stagger siblings within the same parent
        var siblings = entry.target.parentElement
          ? Array.from(entry.target.parentElement.querySelectorAll('.animate-on-scroll:not(.visible)'))
          : [];

        var index = siblings.indexOf(entry.target);
        if (index < 0) index = 0;

        setTimeout(function () {
          entry.target.classList.add('visible');
        }, index * 90);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
    observer.observe(el);
  });
}

/* ── Footer Year ────────────────────────────────────────────── */
function setFooterYear() {
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ── Init ───────────────────────────────────────────────────── */
function init() {
  setFooterYear();
  initNavbarScroll();
  initSmoothScroll();
  initHamburger();
  initContactForm();
  initScrollAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
