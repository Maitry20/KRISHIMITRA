import { useEffect } from 'react';

/**
 * useCinematicStoryScroll - Cinematic Scroll Animation Controller for KRISHI-MITRA
 * 
 * Connects the sections into one continuous story:
 * Farm → Sensors → Data → AI → Decision → Irrigation → Plant Health → Sustainability
 * 
 * Handles:
 * - Scroll-triggered section reveals with IntersectionObserver
 * - Soil moisture and Water Saving count-up animations on scroll
 * - Flowing data stream connections between sensors and AI node
 * - Smooth section progress tracking with requestAnimationFrame
 */
export function useCinematicStoryScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery && mediaQuery.matches) return;

    // 1. Intersection Observer for Scroll-Triggered Section Reveals
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15
    };

    const revealElements = document.querySelectorAll(
      '.story-reveal, .card-elevated, .badge-gcet, .section-title, .section-subtitle'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('story-active');
          
          // Trigger number counter animations if element contains counter target
          const counterEl = entry.target.querySelector('[data-counter-target]');
          if (counterEl && !counterEl._hasAnimated) {
            counterEl._hasAnimated = true;
            animateCounter(counterEl);
          }
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => observer.observe(el));

    // 2. Dynamic Number Counter Helper
    function animateCounter(el) {
      const target = parseFloat(el.getAttribute('data-counter-target') || '0');
      const suffix = el.getAttribute('data-counter-suffix') || '';
      const prefix = el.getAttribute('data-counter-prefix') || '';
      const duration = 1200; // ms
      const startTimestamp = performance.now();

      const step = (now) => {
        const elapsed = now - startTimestamp;
        const progress = Math.min(1, elapsed / duration);
        // Ease-out cubic formula
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeProgress * target);

        el.textContent = `${prefix}${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = `${prefix}${target}${suffix}`;
        }
      };

      requestAnimationFrame(step);
    }

    // 3. Continuous Scroll Listener for Parallax & Connection Streams
    let animFrameId = null;

    const handleContinuousScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;

      // Hero Parallax shifts
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        if (heroRect.bottom > 0) {
          const progress = Math.min(1, scrollY / (heroRect.height || 1));
          const heroText = heroSection.querySelector('h1');
          if (heroText) {
            heroText.style.transform = `translate3d(0, ${-progress * 25}px, 0)`;
          }
        }
      }

      // Moisture counter continuous scroll binding (if present)
      const moistureCard = document.querySelector('[data-moisture-scroll-target]');
      if (moistureCard) {
        const rect = moistureCard.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
          const startVal = 22;
          const endVal = 48;
          const currentMoisture = Math.round(startVal + progress * (endVal - startVal));
          const valueTextNode = moistureCard.querySelector('.moisture-value-text');
          if (valueTextNode) {
            valueTextNode.textContent = `${currentMoisture}%`;
          }
        }
      }
    };

    const onScrollOrResize = () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(handleContinuousScroll);
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);
}
