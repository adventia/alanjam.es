/**
 * Alan James Portfolio
 * Lightweight vanilla JS for scroll reveals, nav state, and smooth scrolling.
 */

(function () {
  'use strict';

  // Force scroll to top on page load (prevents browser restoring scroll position)
  window.scrollTo(0, 0);

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ─── Nav scroll state ─── */

  var nav = document.querySelector('.nav');
  var scrolled = false;
  var ticking = false;

  function onScroll() {
    var shouldBeScrolled = window.pageYOffset > 50;
    if (shouldBeScrolled !== scrolled) {
      scrolled = shouldBeScrolled;
      if (scrolled) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }
    ticking = false;
  }

  if (nav) {
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    });
  }


  /* ─── Nav dark section detection ─── */

  var darkSections = document.querySelectorAll('.section--dark');

  if (nav && darkSections.length) {
    var darkObserver = new IntersectionObserver(function (entries) {
      for (var d = 0; d < entries.length; d++) {
        if (entries[d].isIntersecting) {
          entries[d].target._isVisible = true;
        } else {
          entries[d].target._isVisible = false;
        }
      }
      updateDarkNav();
    }, { rootMargin: '0px 0px -80% 0px', threshold: 0 });

    for (var s = 0; s < darkSections.length; s++) {
      darkSections[s]._isVisible = false;
      darkObserver.observe(darkSections[s]);
    }

    function updateDarkNav() {
      var navBottom = nav.getBoundingClientRect().bottom + 32;
      var overDark = false;
      for (var d = 0; d < darkSections.length; d++) {
        if (darkSections[d]._isVisible) {
          var rect = darkSections[d].getBoundingClientRect();
          if (rect.top < navBottom && rect.bottom > 0) {
            overDark = true;
            break;
          }
        }
      }
      if (overDark) {
        nav.classList.add('nav--over-dark');
      } else {
        nav.classList.remove('nav--over-dark');
      }
    }

    // Still need scroll-based check for precise nav overlap, but throttled via rAF
    var darkTicking = false;
    window.addEventListener('scroll', function () {
      if (!darkTicking) {
        darkTicking = true;
        requestAnimationFrame(function () {
          updateDarkNav();
          darkTicking = false;
        });
      }
    });
  }


  /* ─── Scroll reveal ─── */

  var revealEls = document.querySelectorAll('[reveal]');

  if (prefersReducedMotion) {
    // Skip animation entirely — show everything immediately
    for (var m = 0; m < revealEls.length; m++) {
      revealEls[m].classList.add('reveal--visible');
    }
  } else if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      for (var e = 0; e < entries.length; e++) {
        if (entries[e].isIntersecting) {
          entries[e].target.classList.add('reveal--visible');
          observer.unobserve(entries[e].target);
        }
      }
    }, { threshold: 0.12 });

    for (var r = 0; r < revealEls.length; r++) {
      observer.observe(revealEls[r]);
    }
  } else {
    // Fallback for browsers without IntersectionObserver
    for (var f = 0; f < revealEls.length; f++) {
      revealEls[f].classList.add('reveal--visible');
    }
  }


  /* ─── Smooth scroll for nav links ─── */

  var smoothLinks = document.querySelectorAll('[smooth-scroll]');

  for (var k = 0; k < smoothLinks.length; k++) {
    smoothLinks[k].addEventListener('click', function (e) {
      e.preventDefault();
      var href = this.getAttribute('href');
      var targetId = href.replace('#', '');
      var target = document.getElementById(targetId);
      if (target) {
        if (prefersReducedMotion) {
          target.scrollIntoView({ block: 'start' });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }


  /* ─── Pause autoplay videos for reduced motion ─── */

  if (prefersReducedMotion) {
    var videos = document.querySelectorAll('video[autoplay]');
    for (var v = 0; v < videos.length; v++) {
      videos[v].pause();
    }
  }

})();
