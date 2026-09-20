document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CURSOR GLOW
  ========================= */

  const root = document.documentElement;

  document.addEventListener("pointermove", (e) => {
    root.style.setProperty("--mouse-x", `${e.clientX}px`);
    root.style.setProperty("--mouse-y", `${e.clientY}px`);
  });


  /* =========================
     PROFILE PHOTO 3D EFFECT
  ========================= */

  const profilePhoto = document.querySelector(".profile-photo");

  if (profilePhoto) {

    profilePhoto.addEventListener("mousemove", (e) => {

      const rect = profilePhoto.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;

      profilePhoto.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`;
    });

    profilePhoto.addEventListener("mouseleave", () => {

      profilePhoto.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  }


  /* =========================
     SMOKE / BACKGROUND PARALLAX
  ========================= */

  const smokeLayers = document.querySelectorAll(".smoke-layer");

  document.addEventListener("pointermove", (e) => {

    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);

    smokeLayers.forEach((layer, index) => {

      const amount = (index + 1) * 8;

      layer.style.transform =
        `translate(${x * amount}px, ${y * amount}px)`;
    });
  });


  /* =========================
     SCROLL REVEAL
  ========================= */

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
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }


  /* =========================
     MOBILE MENU
  ========================= */

  const menuButton = document.querySelector(".menu");
  const nav = document.querySelector(".nav nav");

  if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

      const isOpen = nav.classList.contains("mobile-open");

      if (isOpen) {

        nav.classList.remove("mobile-open");

        nav.style.display = "";
        nav.style.position = "";
        nav.style.top = "";
        nav.style.right = "";
        nav.style.flexDirection = "";
        nav.style.background = "";
        nav.style.padding = "";
        nav.style.gap = "";

      } else {

        nav.classList.add("mobile-open");

        nav.style.display = "flex";
        nav.style.position = "absolute";
        nav.style.top = "70px";
        nav.style.right = "6vw";
        nav.style.flexDirection = "column";
        nav.style.background = "#10090b";
        nav.style.padding = "20px";
        nav.style.gap = "18px";
      }
    });


    /* Close menu after clicking a link */

    nav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        nav.classList.remove("mobile-open");

        nav.style.display = "";
        nav.style.position = "";
        nav.style.top = "";
        nav.style.right = "";
        nav.style.flexDirection = "";
        nav.style.background = "";
        nav.style.padding = "";
        nav.style.gap = "";
      });
    });
  }


  /* =========================
     ACTIVE NAVIGATION
  ========================= */

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav nav a");

  if (sections.length && navLinks.length) {

    const updateActiveNav = () => {

      let currentSection = "";

      sections.forEach((section) => {

        const sectionTop = section.offsetTop - 180;
        const sectionBottom =
          sectionTop + section.offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionBottom
        ) {
          currentSection = section.getAttribute("id");
        }
      });


      navLinks.forEach((link) => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", updateActiveNav, {
      passive: true
    });

    updateActiveNav();
  }


  /* =========================
     CERTIFICATE LINKS
  ========================= */

  const certificateLinks =
    document.querySelectorAll(".certificate-link");

  certificateLinks.forEach((link) => {

    link.addEventListener("click", (e) => {

      const href = link.getAttribute("href");

      if (!href || href === "#" || href.trim() === "") {

        e.preventDefault();

        alert(
          "Certificate file abhi upload nahi ki gayi hai."
        );
      }
    });
  });


  /* =========================
     LINK MAGNET EFFECT
  ========================= */

  const magneticElements =
    document.querySelectorAll(
      ".certificate-link, .contact-link"
    );

  magneticElements.forEach((element) => {

    element.addEventListener("mousemove", (e) => {

      const rect = element.getBoundingClientRect();

      const x =
        e.clientX -
        rect.left -
        rect.width / 2;

      const y =
        e.clientY -
        rect.top -
        rect.height / 2;

      element.style.transform =
        `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    element.addEventListener("mouseleave", () => {

      element.style.transform = "translate(0, 0)";
    });
  });


  /* =========================
     MUN CARD TILT
  ========================= */

  const munCards =
    document.querySelectorAll(".mun-card");

  munCards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY =
        ((x / rect.width) - 0.5) * 5;

      const rotateX =
        ((y / rect.height) - 0.5) * -5;

      card.style.transform =
        `perspective(800px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {

      card.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });


  /* =========================
     SKILL CARD HOVER
  ========================= */

  const skillCards =
    document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

      card.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", () => {

      card.style.transform = "translateY(0)";
    });
  });


  /* =========================
     ACHIEVEMENT PHOTO
  ========================= */

  const achievementPhoto =
    document.querySelector(".achievement-photo-inner");

  if (achievementPhoto) {

    achievementPhoto.addEventListener("mousemove", (e) => {

      const rect =
        achievementPhoto.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY =
        ((x / rect.width) - 0.5) * 4;

      const rotateX =
        ((y / rect.height) - 0.5) * -4;

      achievementPhoto.style.transform =
        `perspective(700px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         scale(1.01)`;
    });

    achievementPhoto.addEventListener("mouseleave", () => {

      achievementPhoto.style.transform =
        "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  }


  /* =========================
     ESCAPE KEY
     CLOSES MOBILE MENU
  ========================= */

  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

      if (nav) {

        nav.classList.remove("mobile-open");

        nav.style.display = "";
        nav.style.position = "";
        nav.style.top = "";
        nav.style.right = "";
        nav.style.flexDirection = "";
        nav.style.background = "";
        nav.style.padding = "";
        nav.style.gap = "";
      }
    }
  });


  /* =========================
     REDUCED MOTION SUPPORT
  ========================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (reducedMotion) {

    document.querySelectorAll(".reveal").forEach((element) => {

      element.style.transition = "none";
      element.style.opacity = "1";
      element.style.transform = "none";
    });

    smokeLayers.forEach((layer) => {
      layer.style.animation = "none";
    });
  }

});
