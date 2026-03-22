/**
 * Alan James Portfolio — AngularJS App
 * Lightweight layer for scroll reveals, card interactions, and nav state.
 */

(function () {
  'use strict';

  var app = angular.module('portfolio', []);


  /* ─── Main Controller ─── */

  app.controller('PortfolioCtrl', ['$window', function ($window) {
    var vm = this;

    // Force scroll to top on page load (prevents browser restoring scroll position)
    $window.scrollTo(0, 0);

    // Nav scroll state
    vm.scrolled = false;

    // Project expand/collapse state (keyed by project id)
    vm.expanded = {};

    vm.toggle = function (id) {
      vm.expanded[id] = !vm.expanded[id];
    };

    vm.isExpanded = function (id) {
      return !!vm.expanded[id];
    };

    // Listen for scroll to update nav
    angular.element($window).on('scroll', function () {
      var shouldBeScrolled = $window.pageYOffset > 50;
      if (shouldBeScrolled !== vm.scrolled) {
        vm.scrolled = shouldBeScrolled;
        // We're outside Angular's digest cycle, so trigger one
        vm.$apply();
      }
    });

    // Detect when nav overlaps a dark section and swap the fade gradient
    var nav = document.querySelector('.nav');
    var darkSections = document.querySelectorAll('.section--dark');
    if (nav && darkSections.length) {
      angular.element($window).on('scroll', function () {
        var navBottom = nav.getBoundingClientRect().bottom + 32; // include fade height
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
  }]);


  /* ─── Scroll Reveal Directive ─── */

  app.directive('reveal', ['$window', function ($window) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        var el = element[0];
        var revealed = false;

        // Use IntersectionObserver if available (all modern browsers)
        if ('IntersectionObserver' in $window) {
          var observer = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting && !revealed) {
              revealed = true;
              el.classList.add('reveal--visible');
              observer.unobserve(el);
            }
          }, { threshold: 0.12 });

          observer.observe(el);

          // Cleanup on scope destroy
          scope.$on('$destroy', function () {
            observer.disconnect();
          });
        } else {
          // Fallback: just show immediately
          el.classList.add('reveal--visible');
        }
      }
    };
  }]);


  /* ─── Smooth scroll for nav links ─── */

  app.directive('smoothScroll', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.on('click', function (e) {
          e.preventDefault();
          var targetId = attrs.href.replace('#', '');
          var target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    };
  });

})();
