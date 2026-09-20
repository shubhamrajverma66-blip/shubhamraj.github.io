/* =========================================
   CURSOR GLOW
========================================= */

const glow = document.querySelector('.cursor-glow');

if (glow) {
  window.addEventListener('pointermove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}


/* =========================================
   SCROLL REVEAL
========================================= */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }

    });
  },
  {
    threshold: 0.12
  }
);

document
  .querySelectorAll('.reveal')
  .forEach((el) => observer.observe(el));


/* =========================================
   MOBILE MENU
========================================= */

const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');

if (menu && nav) {

  menu.addEventListener('click', () => {

    const open = nav.classList.toggle('mobile-open');

    if (open) {

      nav.style.display = 'flex';
      nav.style.position = 'absolute';
      nav.style.top = '70px';
      nav.style.right = '6vw';
      nav.style.flexDirection = 'column';
      nav.style.alignItems = 'flex-start';
      nav.style.background = '#10090b';
      nav.style.padding = '22px';
      nav.style.gap = '18px';
      nav.style.border = '1px solid rgba(255,255,255,.08)';
      nav.style.boxShadow = '0 25px 60px rgba(0,0,0,.5)';

    } else {

      nav.style.display = '';

    }

  });


  /* Close menu after clicking a link */

  nav.querySelectorAll('a').forEach((link) => {

    link.addEventListener('click', () => {

      nav.classList.remove('mobile-open');
      nav.style.display = '';

    });

  });

}


/* =========================================
   SMOKE PARALLAX
   Slightly reacts to mouse movement
========================================= */

const smokeLayer = document.querySelector('.smoke-layer');

if (smokeLayer) {

  window.addEventListener('pointermove', (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;

    smokeLayer.style.marginLeft = `${x}px`;
    smokeLayer.style.marginTop = `${y}px`;

  });

}


/* =========================================
   PHOTO TILT
   Very subtle movement on desktop
========================================= */

const profilePhoto = document.querySelector('.profile-photo');

if (profilePhoto && window.innerWidth > 800) {

  const heroMark = document.querySelector('.hero-mark');

  if (heroMark) {

    heroMark.addEventListener('mousemove', (e) => {

      const rect = heroMark.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY =
        ((x / rect.width) - 0.5) * 5;

      const rotateX =
        ((y / rect.height) - 0.5) * -5;

      profilePhoto.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         scale(1.015)`;

    });


    heroMark.addEventListener('mouseleave', () => {

      profilePhoto.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';

    });

  }

}


/* =========================================
   ACTIVE NAV LINK
========================================= */

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav nav a');

const sectionObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        navLinks.forEach((link) => {
          link.classList.remove('active');
        });

        const activeLink = document.querySelector(
          `.nav nav a[href="#${entry.target.id}"]`
        );

        activeLink?.classList.add('active');

      }

    });

  },
  {
    threshold: 0.35
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
