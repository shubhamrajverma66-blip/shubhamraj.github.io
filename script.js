/* =========================================================
   SHUBHAM RAJ — PORTFOLIO INTERACTIONS
========================================================= */


/* =========================================================
   1. CURSOR GLOW
========================================================= */

const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow) {

  let mouseX = 0;
  let mouseY = 0;

  let glowX = 0;
  let glowY = 0;

  window.addEventListener('pointermove', (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

  });

  function animateCursor() {

    glowX += (mouseX - glowX) * 0.16;
    glowY += (mouseY - glowY) * 0.16;

    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;

    requestAnimationFrame(animateCursor);

  }

  animateCursor();
}


/* =========================================================
   2. DIFFERENT CURSOR EFFECTS
========================================================= */

function addCursorEffect(selector, className) {

  document.querySelectorAll(selector).forEach((element) => {

    element.addEventListener('mouseenter', () => {

      document.body.classList.add(className);

    });

    element.addEventListener('mouseleave', () => {

      document.body.classList.remove(className);

    });

  });

}


/* Profile photo */

addCursorEffect(
  '.profile-photo',
  'cursor-photo'
);


/* Achievements */

addCursorEffect(
  '#achievements, .achievement-item, .achievement-photo-box',
  'cursor-achievement'
);


/* Experience */

addCursorEffect(
  '#experience, .timeline-item',
  'cursor-experience'
);


/* Skills */

addCursorEffect(
  '#skills, .skill-card',
  'cursor-skills'
);


/* =========================================================
   3. PROFILE PHOTO — SUBTLE 3D TILT
========================================================= */

const profilePhoto =
  document.querySelector('.profile-photo');

const heroMark =
  document.querySelector('.hero-mark');


if (
  profilePhoto &&
  heroMark &&
  window.innerWidth > 800
) {

  heroMark.addEventListener(
    'mousemove',
    (e) => {

      const rect =
        heroMark.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;


      const rotateY =
        ((x / rect.width) - 0.5) * 4;

      const rotateX =
        ((y / rect.height) - 0.5) * -4;


      profilePhoto.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         scale(1.012)`;

    }
  );


  heroMark.addEventListener(
    'mouseleave',
    () => {

      profilePhoto.style.transform =
        `perspective(1000px)
         rotateX(0deg)
         rotateY(0deg)
         scale(1)`;

    }
  );

}


/* =========================================================
   4. SMOKE — VERY SUBTLE MOUSE PARALLAX
========================================================= */

const smokeLayer =
  document.querySelector('.smoke-layer');

if (smokeLayer) {

  window.addEventListener(
    'pointermove',
    (e) => {

      const x =
        (e.clientX / window.innerWidth - 0.5) * 12;

      const y =
        (e.clientY / window.innerHeight - 0.5) * 12;


      smokeLayer.style.marginLeft =
        `${x}px`;

      smokeLayer.style.marginTop =
        `${y}px`;

    }
  );

}


/* =========================================================
   5. SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll('.reveal');


const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            'visible'
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold:0.12
    }
  );


revealElements.forEach((element) => {

  revealObserver.observe(element);

});


/* =========================================================
   6. MOBILE MENU
========================================================= */

const menu =
  document.querySelector('.menu');

const nav =
  document.querySelector('.nav nav');


if (menu && nav) {

  menu.addEventListener(
    'click',
    () => {

      const isOpen =
        nav.classList.toggle(
          'mobile-open'
        );


      if (isOpen) {

        nav.style.display = 'flex';

        nav.style.position =
          'absolute';

        nav.style.top =
          '68px';

        nav.style.right =
          '6vw';

        nav.style.flexDirection =
          'column';

        nav.style.alignItems =
          'flex-start';

        nav.style.background =
          '#10090b';

        nav.style.padding =
          '20px';

        nav.style.gap =
          '18px';

        nav.style.border =
          '1px solid rgba(255,255,255,.08)';

        nav.style.boxShadow =
          '0 20px 50px rgba(0,0,0,.5)';

      } else {

        nav.style.display = '';

      }

    }
  );


  /* Close menu after clicking a link */

  nav.querySelectorAll('a')
    .forEach((link) => {

      link.addEventListener(
        'click',
        () => {

          nav.classList.remove(
            'mobile-open'
          );

          nav.style.display = '';

        }
      );

    });

}


/* =========================================================
   7. ACTIVE NAVIGATION
========================================================= */

const sections =
  document.querySelectorAll(
    'main section[id]'
  );

const navLinks =
  document.querySelectorAll(
    '.nav nav a'
  );


if (
  sections.length &&
  navLinks.length
) {

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          navLinks.forEach((link) => {

            link.classList.remove(
              'active'
            );

          });


          const activeLink =
            document.querySelector(
              `.nav nav a[href="#${entry.target.id}"]`
            );


          if (activeLink) {

            activeLink.classList.add(
              'active'
            );

          }

        });

      },
      {
        threshold:0.35
      }
    );


  sections.forEach((section) => {

    sectionObserver.observe(section);

  });

}


/* =========================================================
   8. INTERNSHIP CERTIFICATE LINKS
========================================================= */

/*
   IMPORTANT:

   Abhi certificate upload nahi kiya hai,
   isliye existing links ko disturb nahi karenge.

   Baad mein HTML mein:

   href="#"

   ko certificate file ke naam se replace karna:

   href="certificate-bijay-mohan.jpg"

   ya:

   href="certificate-bijay-mohan.pdf"

   target="_blank" hone par certificate
   new tab mein open hoga.
*/


document
  .querySelectorAll('.certificate-link')
  .forEach((link) => {

    link.addEventListener(
      'click',
      (event) => {

        const href =
          link.getAttribute('href');


        /* Agar certificate abhi upload nahi hua */

        if (
          !href ||
          href === '#' ||
          href.trim() === ''
        ) {

          event.preventDefault();

          alert(
            'Certificate upload karne ke baad yahan click karke certificate open hoga.'
          );

        }

      }
    );

  });


/* =========================================================
   9. SUBTLE BUTTON MAGNET EFFECT
========================================================= */

document
  .querySelectorAll(
    '.certificate-link, .contact-link'
  )
  .forEach((element) => {

    element.addEventListener(
      'mousemove',
      (e) => {

        const rect =
          element.getBoundingClientRect();


        const x =
          e.clientX -
          rect.left -
          rect.width / 2;


        const y =
          e.clientY -
          rect.top -
          rect.height / 2;


        element.style.transform =
          `translate(
            ${x * 0.035}px,
            ${y * 0.035}px
          )`;

      }
    );


    element.addEventListener(
      'mouseleave',
      () => {

        element.style.transform = '';

      }
    );

  });


/* =========================================================
   10. INTERNSHIP CARD HOVER
========================================================= */

document
  .querySelectorAll('.timeline-item')
  .forEach((card) => {

    card.addEventListener(
      'mouseenter',
      () => {

        card.style.zIndex = '5';

      }
    );


    card.addEventListener(
      'mouseleave',
      () => {

        card.style.zIndex = '';

      }
    );

  });


/* =========================================================
   11. MUN CARD SUBTLE INTERACTION
========================================================= */

document
  .querySelectorAll('.mun-card')
  .forEach((card) => {

    card.addEventListener(
      'mousemove',
      (e) => {

        if (window.innerWidth <= 800) {
          return;
        }


        const rect =
          card.getBoundingClientRect();


        const x =
          (e.clientX - rect.left) /
          rect.width -
          0.5;


        const y =
          (e.clientY - rect.top) /
          rect.height -
          0.5;


        card.style.transform =
          `translateY(-4px)
           rotateX(${y * -2}deg)
           rotateY(${x * 2}deg)`;

      }
    );


    card.addEventListener(
      'mouseleave',
      () => {

        card.style.transform = '';

      }
    );

  });


/* =========================================================
   12. SKILL CARD INTERACTION
========================================================= */

document
  .querySelectorAll('.skill-card')
  .forEach((card) => {

    card.addEventListener(
      'mouseenter',
      () => {

        card.style.zIndex = '5';

      }
    );


    card.addEventListener(
      'mouseleave',
      () => {

        card.style.zIndex = '';

      }
    );

  });


/* =========================================================
   13. ACHIEVEMENT PHOTO HOVER
========================================================= */

const achievementPhoto =
  document.querySelector(
    '.achievement-photo-box'
  );


if (achievementPhoto) {

  achievementPhoto.addEventListener(
    'mousemove',
    (e) => {

      if (window.innerWidth <= 800) {
        return;
      }


      const rect =
        achievementPhoto.getBoundingClientRect();


      const x =
        (e.clientX - rect.left) /
        rect.width -
        0.5;


      const y =
        (e.clientY - rect.top) /
        rect.height -
        0.5;


      achievementPhoto.style.transform =
        `perspective(900px)
         rotateX(${y * -1.5}deg)
         rotateY(${x * 1.5}deg)`;

    }
  );


  achievementPhoto.addEventListener(
    'mouseleave',
    () => {

      achievementPhoto.style.transform =
        '';

    }
  );

}


/* =========================================================
   14. ESC KEY — CLOSE MOBILE MENU
========================================================= */

document.addEventListener(
  'keydown',
  (e) => {

    if (
      e.key === 'Escape' &&
      nav
    ) {

      nav.classList.remove(
        'mobile-open'
      );

      nav.style.display = '';

    }

  }
);


/* =========================================================
   15. REDUCED MOTION
========================================================= */

const reducedMotion =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );


if (reducedMotion.matches) {

  document
    .querySelectorAll('*')
    .forEach((element) => {

      element.style.animationDuration =
        '0.01ms';

      element.style.transitionDuration =
        '0.01ms';

    });

}
