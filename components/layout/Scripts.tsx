'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Scripts() {
  const pathname = usePathname();

  useEffect(() => {
    // ---------- NAVBAR SCROLL EFFECT ----------
    const navbar = document.getElementById('navbar') as HTMLElement | null;
    const topBar = document.getElementById('topBar') as HTMLElement | null;

    if (navbar && topBar) {
      const handleScroll = () => {
        if (window.scrollY > 40) {
          navbar.classList.add('scrolled');
          topBar.classList.add('hidden');
        } else {
          navbar.classList.remove('scrolled');
          topBar.classList.remove('hidden');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // ---------- MOBILE MENU ----------
    const mobileToggle = document.getElementById('mobileToggle') as HTMLElement | null;
    const mobileMenu = document.getElementById('mobileMenu') as HTMLElement | null;
    const mobileOverlay = document.getElementById('mobileOverlay') as HTMLElement | null;

    if (mobileToggle && mobileMenu && mobileOverlay) {
      const openMenu = () => {
        mobileMenu.classList.add('open');
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      };

      const closeMenu = () => {
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
        document.querySelectorAll('.mobile-submenu.open').forEach((sub) => sub.classList.remove('open'));
        document.querySelectorAll('.mobile-dropdown-btn.active').forEach((btn) => btn.classList.remove('active'));
      };

      mobileToggle.addEventListener('click', openMenu);
      mobileOverlay.addEventListener('click', closeMenu);

      document.querySelectorAll('.mobile-menu a').forEach((link) => {
        link.addEventListener('click', closeMenu);
      });

      document.querySelectorAll('.mobile-dropdown-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetId = (btn as HTMLElement).getAttribute('data-target');
          const submenu = document.getElementById(targetId || '');
          if (!submenu) return;

          const isActive = btn.classList.contains('active');

          document.querySelectorAll('.mobile-submenu.open').forEach((sub) => {
            if (sub.id !== targetId) sub.classList.remove('open');
          });
          document.querySelectorAll('.mobile-dropdown-btn.active').forEach((otherBtn) => {
            if (otherBtn !== btn) otherBtn.classList.remove('active');
          });

          if (!isActive) {
            btn.classList.add('active');
            submenu.classList.add('open');
          } else {
            btn.classList.remove('active');
            submenu.classList.remove('open');
          }
        });
      });
    }

    // ---------- HERO SLIDER ----------
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots') as HTMLElement | null;

    if (slides.length > 0 && dotsContainer) {
      let currentSlide = 0;
      let slideInterval: ReturnType<typeof setInterval> | null = null;
      const dots: HTMLSpanElement[] = [];

      dotsContainer.innerHTML = '';

      slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => {
          showSlide(i);
          resetInterval();
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
      });

      function showSlide(index: number) {
        slides.forEach((s) => s.classList.remove('active'));
        dots.forEach((d) => d.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
      }

      function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
      }

      function resetInterval() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 6000);
      }

      resetInterval();

      // Cleanup
      return () => {
        if (slideInterval) clearInterval(slideInterval);
      };
    }

    // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
    const handleSmoothScroll = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId) as HTMLElement | null;
      if (target) {
        e.preventDefault();
        const navbarEl = document.getElementById('navbar') as HTMLElement | null;
        const topBarEl = document.getElementById('topBar') as HTMLElement | null;
        const offset = (navbarEl?.offsetHeight || 80) + (topBarEl?.offsetHeight || 40) + 16;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    // ---------- DESKTOP DROPDOWN TOUCH ENHANCEMENT ----------
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector('.nav-link') as HTMLElement | null;
      const menu = dropdown.querySelector('.dropdown-menu') as HTMLElement | null;
      if (!toggle || !menu) return;

      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) return;
        const isVisible = menu.style.opacity === '1';
        if (!isVisible) {
          e.preventDefault();
          e.stopPropagation();
          menu.style.opacity = '1';
          menu.style.visibility = 'visible';
          menu.style.transform = 'translateY(0)';
          menu.style.pointerEvents = 'auto';
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) return;
      dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(e.target as Node)) {
          const menu = dropdown.querySelector('.dropdown-menu') as HTMLElement | null;
          if (menu) {
            menu.style.opacity = '';
            menu.style.visibility = '';
            menu.style.transform = '';
            menu.style.pointerEvents = '';
          }
        }
      });
    });

    // Cleanup event listeners on route change
    return () => {
      if (navbar && topBar) {
        window.removeEventListener('scroll', () => {});
      }
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, [pathname]);

  return null;
}