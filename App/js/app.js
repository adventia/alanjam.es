/**
 * Alan James Portfolio
 * Lightweight vanilla JS for scroll reveals, nav state, and smooth scrolling.
 */

(function () {
  'use strict';

  // Force scroll to top on page load (prevents browser restoring scroll position)
  window.scrollTo(0, 0);


  /* ─── Nav scroll state ─── */

  var nav = document.querySelector('.nav');
  var scrolled = false;

  if (nav) {
    window.addEventListener('scroll', function () {
      var shouldBeScrolled = window.pageYOffset > 50;
      if (shouldBeScrolled !== scrolled) {
        scrolled = shouldBeScrolled;
        if (scrolled) {
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }
      }
    });
  }


  /* ─── Nav dark section detection ─── */

  var darkSections = document.querySelectorAll('.section--dark');
  if (nav && darkSections.length) {
    window.addEventListener('scroll', function () {
      var navBottom = nav.getBoundingClientRect().bottom + 32;
      var overDark = false;
      for (var i = 0; i < darkSections.length; i++) {
        var rect = darkSections[i].getBoundingClientRect();
        if (rect.top < navBottom && rect.bottom > 0) {
          overDark = true;
          break;
        }
      }
      if (overDark) {
        nav.classList.add('nav--over-dark');
      } else {
        nav.classList.remove('nav--over-dark');
      }
    });
  }


  /* ─── Scroll reveal ─── */

  var revealEls = document.querySelectorAll('[reveal]');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('reveal--visible');
          observer.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.12 });

    for (var i = 0; i < revealEls.length; i++) {
      observer.observe(revealEls[i]);
    }
  } else {
    for (var j = 0; j < revealEls.length; j++) {
      revealEls[j].classList.add('reveal--visible');
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
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

})();
