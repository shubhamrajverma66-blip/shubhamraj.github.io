document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     CUSTOM CURSOR
     ========================================================= */

  const cursor = document.querySelector(".cursor-glow");

  const interactiveBlocks = document.querySelectorAll(
    ".timeline-item, .mun-card, .skill-card, .achievement-item, .contact-card, .university-card, .achievement-photo-box, .section-photo, .contact-photo, .primary-btn, .secondary-btn, .certificate-link"
  );

  if (
    cursor &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener("pointermove", (event) => {

      mouseX = event.clientX;
      mouseY = event.clientY;

      document.documentElement.style.setProperty(
        "--mouse-x",
        `${mouseX}px`
      );

      document.documentElement.style.setProperty(
        "--mouse-y",
        `${mouseY}px`
      );

    });

    function animateCursor() {

      currentX += (mouseX - currentX) * 0.14;
      currentY += (mouseY - currentY) * 0.14;

      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();


    /* =====================================================
       CURSOR → BLOCK HIGHLIGHT
       ===================================================== */

    interactiveBlocks.forEach((block) => {

      block.addEventListener("pointerenter", () => {

        document.body.classList.add("cursor-hover");

        cursor.style.width = "340px";
        cursor.style.height = "340px";

      });

      block.addEventListener("pointerleave", () => {

        document.body.classList.remove("cursor-hover");

        cursor.style.width = "250px";
        cursor.style.height = "250px";

      });

      block.addEventListener("pointermove", (event) => {

        const rect = block.getBoundingClientRect();

        const x =
          ((event.clientX - rect.left) / rect.width) * 100;

        const y =
          ((event.clientY - rect.top) / rect.height) * 100;

        block.style.setProperty(
          "--card-x",
          `${x}%`
        );

        block.style.setProperty(
          "--card-y",
          `${y}%`
        );

      });

    });
  }


  /* =========================================================
     NAVIGATION / MOBILE MENU
     ========================================================= */

  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".nav");

  if (menu && nav) {

    menu.addEventListener("click", () => {

      const isOpen =
        nav.classList.contains("mobile-open");

      if (isOpen) {

        nav.classList.remove("mobile-open");

        nav.style.display = "";

      } else {

        nav.classList.add("mobile-open");

        nav.style.display = "flex";

        nav.style.position = "absolute";

        nav.style.top = "78px";

        nav.style.right = "0";

        nav.style.width = "230px";

        nav.style.flexDirection = "column";

        nav.style.alignItems = "flex-start";

        nav.style.padding = "25px";

        nav.style.gap = "20px";

        nav.style.background =
          "rgba(15, 8, 10, 0.97)";

        nav.style.border =
          "1px solid rgba(255,255,255,0.08)";

        nav.style.boxShadow =
          "0 25px 60px rgba(0,0,0,0.5)";

        nav.style.backdropFilter =
          "blur(15px)";
      }
    });


    nav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        nav.classList.remove("mobile-open");

        if (window.innerWidth <= 950) {
          nav.style.display = "";
        }

      });

    });


    window.addEventListener("resize", () => {

      if (window.innerWidth > 950) {

        nav.classList.remove("mobile-open");

        nav.style.display = "";

        nav.style.position = "";

        nav.style.top = "";

        nav.style.right = "";

        nav.style.width = "";

        nav.style.flexDirection = "";

        nav.style.alignItems = "";

        nav.style.padding = "";

        nav.style.gap = "";

        nav.style.background = "";

        nav.style.border = "";

        nav.style.boxShadow = "";

        nav.style.backdropFilter = "";

      }

    });

  }


  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
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


  /* =========================================================
     STAGGERED CARD ANIMATION
     ========================================================= */

  const groupedSections = [
    ".skill-card",
    ".achievement-item",
    ".mun-card",
    ".timeline-item"
  ];

  groupedSections.forEach((selector) => {

    const elements =
      document.querySelectorAll(selector);

    elements.forEach((element, index) => {

      element.style.transitionDelay =
        `${Math.min(index * 0.08, 0.4)}s`;

    });

  });


  /* =========================================================
     PROFILE PHOTO 3D TILT
     ========================================================= */

  const profileFrame =
    document.querySelector(".profile-frame");

  const profilePhoto =
    document.querySelector(".profile-photo");

  if (
    profileFrame &&
    profilePhoto &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    profileFrame.addEventListener(
      "pointermove",
      (event) => {

        const rect =
          profileFrame.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateY =
          ((x - centerX) / centerX) * 3;

        const rotateX =
          ((y - centerY) / centerY) * -3;

        profilePhoto.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           scale(1.015)`;

      }
    );


    profileFrame.addEventListener(
      "pointerleave",
      () => {

        profilePhoto.style.transform =
          "perspective(900px)
           rotateX(0deg)
           rotateY(0deg)
           scale(1)";

      }
    );

  }


  /* =========================================================
     SMOKE PARALLAX
     ========================================================= */

  const smokeLayers =
    document.querySelectorAll(".smoke-layer");

  if (
    smokeLayers.length &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    window.addEventListener(
      "pointermove",
      (event) => {

        const x =
          event.clientX / window.innerWidth - 0.5;

        const y =
          event.clientY / window.innerHeight - 0.5;

        smokeLayers.forEach((layer, index) => {

          const strength =
            (index + 1) * 8;

          layer.style.marginLeft =
            `${x * strength}px`;

          layer.style.marginTop =
            `${y * strength}px`;

        });

      }
    );

  }


  /* =========================================================
     ORBIT PARALLAX
     ========================================================= */

  const orbit =
    document.querySelector(".orbit");

  const orbitRing3 =
    document.querySelector(".orbit-ring-3");

  const orbitRing4 =
    document.querySelector(".orbit-ring-4");

  if (
    orbit &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    window.addEventListener(
      "pointermove",
      (event) => {

        const x =
          event.clientX / window.innerWidth - 0.5;

        const y =
          event.clientY / window.innerHeight - 0.5;


        orbit.style.marginLeft =
          `${x * 10}px`;

        orbit.style.marginTop =
          `${y * 10}px`;


        if (orbitRing3) {

          orbitRing3.style.marginLeft =
            `${x * -7}px`;

          orbitRing3.style.marginTop =
            `${y * -7}px`;

        }


        if (orbitRing4) {

          orbitRing4.style.marginLeft =
            `${x * 12}px`;

          orbitRing4.style.marginTop =
            `${y * 12}px`;

        }

      }
    );

  }


  /* =========================================================
     MUN CARD 3D TILT
     ========================================================= */

  const munCards =
    document.querySelectorAll(".mun-card");

  if (
    munCards.length &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    munCards.forEach((card) => {

      card.addEventListener(
        "pointermove",
        (event) => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateY =
            ((x - rect.width / 2) /
              rect.width) * 2.5;

          const rotateX =
            ((y - rect.height / 2) /
              rect.height) * -2.5;

          card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

        }
      );


      card.addEventListener(
        "pointerleave",
        () => {

          card.style.transform = "";

        }
      );

    });

  }


  /* =========================================================
     SKILL CARD
     ========================================================= */

  const skillCards =
    document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {

    card.addEventListener(
      "mouseenter",
      () => {

        const number =
          card.querySelector(".skill-number");

        if (number) {

          number.style.color =
            "rgba(169, 74, 91, 0.30)";

        }

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        const number =
          card.querySelector(".skill-number");

        if (number) {

          number.style.color =
            "rgba(255,255,255,0.12)";

        }

      }
    );

  });


  /* =========================================================
     ACHIEVEMENT PHOTO
     ========================================================= */

  const achievementPhoto =
    document.querySelector(
      ".achievement-photo-inner"
    );

  if (
    achievementPhoto &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    achievementPhoto.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          achievementPhoto.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const moveX =
          ((x / rect.width) - 0.5) * 7;

        const moveY =
          ((y / rect.height) - 0.5) * 7;

        achievementPhoto.style.transform =
          `translate(${moveX}px, ${moveY}px)`;

      }
    );


    achievementPhoto.addEventListener(
      "mouseleave",
      () => {

        achievementPhoto.style.transform =
          "translate(0, 0)";

      }
    );

  }


  /* =========================================================
     CERTIFICATE LINKS
     ========================================================= */

  const certificateLinks =
    document.querySelectorAll(
      ".certificate-link"
    );

  certificateLinks.forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const href =
          link.getAttribute("href");

        if (
          !href ||
          href === "#" ||
          href.trim() === ""
        ) {

          event.preventDefault();

          alert(
            "Certificate will be available here."
          );

        }

      }
    );

  });


  /* =========================================================
     MAGNETIC BUTTON EFFECT
     ========================================================= */

  const magneticElements =
    document.querySelectorAll(
      ".primary-btn, .secondary-btn, .certificate-link"
    );

  if (
    magneticElements.length &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    magneticElements.forEach((element) => {

      element.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            element.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          element.style.transform =
            `translate(
              ${x * 0.08}px,
              ${y * 0.08}px
            )`;

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          element.style.transform = "";

        }
      );

    });

  }


  /* =========================================================
     ACTIVE NAVIGATION
     ========================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(".nav a");

  if (
    sections.length &&
    navLinks.length
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              const id =
                entry.target.getAttribute("id");

              navLinks.forEach((link) => {

                link.classList.remove("active");

                if (
                  link.getAttribute("href") ===
                  `#${id}`
                ) {

                  link.classList.add("active");

                }

              });

            }

          });

        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );

    sections.forEach((section) => {

      sectionObserver.observe(section);

    });

  }


  /* =========================================================
     ESCAPE → CLOSE MENU
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        if (
          nav &&
          nav.classList.contains("mobile-open")
        ) {

          nav.classList.remove(
            "mobile-open"
          );

          nav.style.display = "";

        }

      }

    }
  );


  /* =========================================================
     IMAGE LOADING
     ========================================================= */

  const images =
    document.querySelectorAll("img");

  images.forEach((image) => {

    if (image.complete) {

      image.classList.add("loaded");

    } else {

      image.addEventListener(
        "load",
        () => {

          image.classList.add("loaded");

        }
      );

    }

  });


  /* =========================================================
     SMOOTH ANCHOR SCROLL
     ========================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(targetId);

          if (!target) {
            return;
          }

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =========================================================
     REDUCED MOTION
     ========================================================= */

  if (
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    document
      .querySelectorAll(".reveal")
      .forEach((element) => {

        element.classList.add("visible");

      });

  }


  /* =========================================================
     PAGE READY
     ========================================================= */

  document.body.classList.add(
    "page-ready"
  );

});
