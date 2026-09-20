/* =========================================================
   SHUBHAM RAJ — PREMIUM INTERACTIONS
========================================================= */


/* =========================================================
   CURSOR GLOW
========================================================= */

const glow = document.querySelector('.cursor-glow');

if (glow) {
  window.addEventListener('pointermove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}


/* =========================================================
   CURSOR — DIFFERENT EFFECT FOR DIFFERENT AREAS
========================================================= */

const interactiveAreas = [
  {
    selector: '.profile-photo',
    className: 'cursor-photo'
  },
  {
    selector: '#achievements, .achievement-item, .achievement-photo-box',
    className: 'cursor-achievement'
  },
  {
    selector: '#experience, .timeline-item',
    className: 'cursor-experience'
  },
  {
    selector: '#skills, .skill-card',
    className: 'cursor-skills'
  }
];

interactiveAreas.forEach((area) => {

  document.querySelectorAll(area.selector).forEach((element) => {

    element.addEventListener('mouseenter', () => {
      document.body.classList.add(area.className);
    });

    element.addEventListener('mouseleave', () => {
      document.body.classList.remove(area.className);
    });

  });

});


/* =========================================================
   PHOTO 3D TILT
========================================================= */

const profilePhoto = document.querySelector('.profile-photo');
const heroMark = document.querySelector('.hero-mark');

if (
  profilePhoto &&
  heroMark &&
  window.innerWidth > 800
) {

  heroMark.addEventListener('mousemove', (e) => {

    const rect = heroMark.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY =
      ((x / rect.width) - 0.5) * 8;

    const rotateX =
      ((y / rect.height) - 0.5) * -8;

    profilePhoto.style.transform =
      `perspective(1000px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       scale(1.025)`;

  });

  heroMark.addEventListener('mouseleave', () => {

    profilePhoto.style.transform =
      `perspective(1000px)
       rotateX(0deg)
       rotateY(0deg)
       scale(1)`;

  });

}


/* =========================================================
   SMOKE PARALLAX
========================================================= */

const smokeLayer =
  document.querySelector('.smoke-layer');

if (smokeLayer) {

  window.addEventListener('pointermove', (e) => {

    const x =
      (e.clientX / window.innerWidth - 0.5) * 20;

    const y =
      (e.clientY / window.innerHeight - 0.5) * 20;

    smokeLayer.style.marginLeft = `${x}px`;
    smokeLayer.style.marginTop = `${y}px`;

  });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add('visible');

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold:0.12
    }
  );

document
  .querySelectorAll('.reveal')
  .forEach((element) => {

    revealObserver.observe(element);

  });


/* =========================================================
   MOBILE MENU
========================================================= */

const menu =
  document.querySelector('.menu');

const nav =
  document.querySelector('.nav nav');

if (menu && nav) {

  menu.addEventListener('click', () => {

    const open =
      nav.classList.toggle('mobile-open');

    if (open) {

      nav.style.display = 'flex';
      nav.style.position = 'absolute';
      nav.style.top = '68px';
      nav.style.right = '6vw';
      nav.style.flexDirection = 'column';
      nav.style.alignItems = 'flex-start';

      nav.style.background = '#10090b';
      nav.style.padding = '22px';

      nav.style.gap = '18px';

      nav.style.border =
        '1px solid rgba(255,255,255,.08)';

      nav.style.boxShadow =
        '0 25px 60px rgba(0,0,0,.5)';

    } else {

      nav.style.display = '';

    }

  });


  nav.querySelectorAll('a')
    .forEach((link) => {

      link.addEventListener('click', () => {

        nav.classList.remove(
          'mobile-open'
        );

        nav.style.display = '';

      });

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
  document.querySelectorAll(
    'main section[id]'
  );

const navLinks =
  document.querySelectorAll(
    '.nav nav a'
  );

const sectionObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          navLinks.forEach((link) => {
            link.classList.remove('active');
          });

          const activeLink =
            document.querySelector(
              `.nav nav a[href="#${entry.target.id}"]`
            );

          activeLink?.classList.add('active');

        }

      });

    },
    {
      threshold:.35
    }
  );

sections.forEach((section) => {

  sectionObserver.observe(section);

});


/* =========================================================
   INTERNSHIP CERTIFICATE SYSTEM
========================================================= */

/*
  IMPORTANT:

  Baad me certificates upload karne ke baad
  HTML me certificate-link ke href ko simply
  certificate filename se replace kar dena.

  Example:

  href="certificate-bijay-mohan-goswami.jpg"

  Ya agar PDF hai:

  href="certificate-bijay-mohan-goswami.pdf"

  target="_blank" ki wajah se certificate
  new tab me open hoga.
*/


document
  .querySelectorAll('.certificate-link')
  .forEach((link) => {

    link.addEventListener('click', (event) => {

      const certificate =
        link.getAttribute('href');

      if (
        !certificate ||
        certificate === '#' ||
        certificate === ''
      ) {

        event.preventDefault();

        alert(
          'Certificate upload karne ke baad yahan click karke certificate open hoga.'
        );

      }

    });

  });


/* =========================================================
   HOVER MAGNETIC EFFECT
========================================================= */

document
  .querySelectorAll(
    '.contact-link, .certificate-link'
  )
  .forEach((element) => {

    element.addEventListener(
      'mousemove',
      (e) => {

        const rect =
          element.getBoundingClientRect();

        const x =
          e.clientX - rect.left - rect.width / 2;

        const y =
          e.clientY - rect.top - rect.height / 2;

        element.style.transform =
          `translate(${x * .06}px, ${y * .06}px)`;

      }
    );

    element.addEventListener(
      'mouseleave',
      () => {

        element.style.transform =
          '';

      }
    );

  });


/* =========================================================
   SECTION ENTRY EFFECT
========================================================= */

const allSections =
  document.querySelectorAll(
    'main section'
  );

allSections.forEach((section) => {

  section.addEventListener(
    'mouseenter',
    () => {

      section.classList.add(
        'section-active'
      );

    }
  );

  section.addEventListener(
    'mouseleave',
    () => {

      section.classList.remove(
        'section-active'
      );

    }
  );

});


/* =========================================================
   REDUCE MOTION FOR ACCESSIBILITY
========================================================= */

const prefersReducedMotion =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

if (prefersReducedMotion.matches) {

  document
    .querySelectorAll('*')
    .forEach((element) => {

      element.style.animationDuration = '0.01ms';
      element.style.transitionDuration = '0.01ms';

    });

}
