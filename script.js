// =========================================================
// SHUBHAM RAJ — FINAL PORTFOLIO SCRIPT
// =========================================================


// =========================================================
// CURSOR GLOW
// =========================================================

const glow = document.querySelector(".cursor-glow");

if (glow) {

  window.addEventListener("pointermove", (event) => {

    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";

  });

}


// =========================================================
// CURSOR EFFECTS
// =========================================================

const photoElements = document.querySelectorAll(
  ".profile-photo, .contact-photo img, .university-photo img, .section-photo img, .achievement-photo-inner img"
);

const cardElements = document.querySelectorAll(
  ".timeline-item, .mun-card, .skill-card, .achievement-item"
);


photoElements.forEach((element) => {

  element.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-photo");
  });

  element.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-photo");
  });

});


cardElements.forEach((element) => {

  element.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-card");
  });

  element.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-card");
  });

});


// =========================================================
// SCROLL REVEAL
// =========================================================
//
// Content remains visible even if observer fails.
// When supported, elements receive a small reveal animation.
//

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );


  revealElements.forEach((element) => {

    observer.observe(element);

  });

}


// =========================================================
// MOBILE MENU
// =========================================================

const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav nav");

if (menu && nav) {

  menu.addEventListener("click", () => {

    const isOpen = nav.classList.contains("mobile-open");

    if (isOpen) {

      nav.classList.remove("mobile-open");
      nav.style.display = "";

    } else {

      nav.classList.add("mobile-open");

      nav.style.display = "flex";
      nav.style.position = "absolute";
      nav.style.top = "68px";
      nav.style.right = "5%";
      nav.style.flexDirection = "column";

    }

  });


  // Close menu when a navigation link is clicked

  nav.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      nav.classList.remove("mobile-open");

      if (window.innerWidth <= 850) {
        nav.style.display = "none";
      }

    });

  });

}


// =========================================================
// ACTIVE NAVIGATION
// =========================================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav nav a");

if (sections.length && navLinks.length) {

  window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {

        currentSection = section.getAttribute("id");

      }

    });


    navLinks.forEach((link) => {

      link.classList.remove("active");

      const target = link.getAttribute("href");

      if (target === "#" + currentSection) {
        link.classList.add("active");
      }

    });

  });

}


// =========================================================
// PROFILE PHOTO — VERY SUBTLE 3D EFFECT
// =========================================================

const profilePhoto = document.querySelector(".profile-photo");

if (profilePhoto && window.matchMedia("(pointer: fine)").matches) {

  profilePhoto.addEventListener("mousemove", (event) => {

    const rect = profilePhoto.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 4;
    const rotateX = ((y / rect.height) - 0.5) * -4;

    profilePhoto.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.012)`;

  });


  profilePhoto.addEventListener("mouseleave", () => {

    profilePhoto.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";

  });

}


// =========================================================
// ORBIT — SMALL PARALLAX
// =========================================================

const heroMark = document.querySelector(".hero-mark");

if (heroMark && window.matchMedia("(pointer: fine)").matches) {

  window.addEventListener("pointermove", (event) => {

    const x = (event.clientX / window.innerWidth) - 0.5;
    const y = (event.clientY / window.innerHeight) - 0.5;

    heroMark.style.setProperty(
      "--mouse-x",
      `${x * 8}px`
    );

    heroMark.style.setProperty(
      "--mouse-y",
      `${y * 8}px`
    );

  });

}


// =========================================================
// MUN CARD TILT
// =========================================================

const munCards = document.querySelectorAll(".mun-card");

if (window.matchMedia("(pointer: fine)").matches) {

  munCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 2.5;
      const rotateX = ((y / rect.height) - 0.5) * -2.5;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

      card.style.transform = "";

    });

  });

}


// =========================================================
// SKILL CARD HOVER
// =========================================================

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card) => {

  card.addEventListener("mouseenter", () => {

    card.style.setProperty(
      "--skill-glow",
      "rgba(201,166,107,0.08)"
    );

  });

  card.addEventListener("mouseleave", () => {

    card.style.removeProperty("--skill-glow");

  });

});


// =========================================================
// IMAGE HOVER PARALLAX
// =========================================================

const galleryImages = document.querySelectorAll(
  ".university-photo img, .section-photo img, .achievement-photo-inner img, .contact-photo img"
);

if (window.matchMedia("(pointer: fine)").matches) {

  galleryImages.forEach((image) => {

    image.addEventListener("mousemove", (event) => {

      const rect = image.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width) - 0.5;
      const y = ((event.clientY - rect.top) / rect.height) - 0.5;

      image.style.transform =
        `scale(1.035) translate(${x * 5}px, ${y * 5}px)`;

    });


    image.addEventListener("mouseleave", () => {

      image.style.transform = "scale(1)";

    });

  });

}


// =========================================================
// CERTIFICATE LINKS
// =========================================================

const certificateLinks = document.querySelectorAll(".certificate-link");

certificateLinks.forEach((link) => {

  link.addEventListener("click", (event) => {

    const href = link.getAttribute("href");

    if (!href || href === "#" || href.trim() === "") {

      event.preventDefault();

      alert("Certificate file will be added here.");

    }

  });

});


// =========================================================
// SMOOTH INTERNAL LINKS
// =========================================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (
      targetId &&
      targetId !== "#" &&
      document.querySelector(targetId)
    ) {

      event.preventDefault();

      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});


// =========================================================
// CLOSE MOBILE MENU WITH ESCAPE
// =========================================================

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape" && nav) {

    nav.classList.remove("mobile-open");

    if (window.innerWidth <= 850) {
      nav.style.display = "none";
    }

  }

});


// =========================================================
// RESPONSIVE MENU RESET
// =========================================================

window.addEventListener("resize", () => {

  if (!nav) return;

  if (window.innerWidth > 850) {

    nav.style.display = "";
    nav.style.position = "";
    nav.style.top = "";
    nav.style.right = "";
    nav.style.flexDirection = "";
    nav.classList.remove("mobile-open");

  }

});


// =========================================================
// REDUCED MOTION
// =========================================================

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (reducedMotion.matches) {

  document.documentElement.style.scrollBehavior = "auto";

}


// =========================================================
// PAGE READY
// =========================================================

window.addEventListener("load", () => {

  document.body.classList.add("page-loaded");

});
