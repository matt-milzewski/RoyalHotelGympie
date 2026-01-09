(() => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  const focusableSelector = "a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])";
  let lastFocused = null;

  const closeNav = () => {
    body.classList.remove("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
    if (navMenu && window.innerWidth < 768) {
      navMenu.setAttribute("aria-hidden", "true");
    }
  };

  const openNav = () => {
    body.classList.add("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "true");
    }
    if (navMenu) {
      navMenu.setAttribute("aria-hidden", "false");
    }
    if (navMenu) {
      const firstLink = navMenu.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    }
  };

  if (navToggle && navMenu) {
    if (window.innerWidth >= 768) {
      navMenu.setAttribute("aria-hidden", "false");
    } else {
      navMenu.setAttribute("aria-hidden", "true");
    }

    navToggle.addEventListener("click", () => {
      lastFocused = document.activeElement;
      if (body.classList.contains("nav-open")) {
        closeNav();
        if (lastFocused) {
          lastFocused.focus();
        }
      } else {
        openNav();
      }
    });

    document.addEventListener("click", (event) => {
      if (!body.classList.contains("nav-open")) {
        return;
      }
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        closeNav();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!body.classList.contains("nav-open")) {
        return;
      }
      if (event.key === "Escape") {
        closeNav();
        navToggle.focus();
      }
      if (event.key === "Tab") {
        const focusable = navMenu.querySelectorAll(focusableSelector);
        if (!focusable.length) {
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 768) {
          closeNav();
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        closeNav();
        navMenu.setAttribute("aria-hidden", "false");
      } else {
        navMenu.setAttribute("aria-hidden", body.classList.contains("nav-open") ? "false" : "true");
      }
    });
  }

  if (header) {
    const onScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const lightbox = document.querySelector("#lightbox");
  if (lightbox) {
    const lightboxImage = lightbox.querySelector("#lightbox-image");
    const lightboxCaption = lightbox.querySelector("#lightbox-caption");
    const closeBtn = lightbox.querySelector("[data-lightbox-close]");
    const nextBtn = lightbox.querySelector("[data-lightbox-next]");
    const prevBtn = lightbox.querySelector("[data-lightbox-prev]");
    const galleryButtons = Array.from(document.querySelectorAll("[data-lightbox-trigger]"));
    let currentIndex = 0;
    let lastActive = null;

    const updateLightbox = (index) => {
      const trigger = galleryButtons[index];
      if (!trigger || !lightboxImage) {
        return;
      }
      const src = trigger.getAttribute("data-full");
      const alt = trigger.getAttribute("data-alt") || "Gallery image";
      const caption = trigger.getAttribute("data-caption") || "";
      lightboxImage.src = src;
      lightboxImage.alt = alt;
      if (lightboxCaption) {
        lightboxCaption.textContent = caption;
      }
    };

    const openLightbox = (index) => {
      currentIndex = index;
      updateLightbox(currentIndex);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      body.classList.add("no-scroll");
      lastActive = document.activeElement;
      if (closeBtn) {
        closeBtn.focus();
      }
    };

    const closeLightbox = () => {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      body.classList.remove("no-scroll");
      if (lastActive) {
        lastActive.focus();
      }
    };

    const showNext = () => {
      currentIndex = (currentIndex + 1) % galleryButtons.length;
      updateLightbox(currentIndex);
    };

    const showPrev = () => {
      currentIndex = (currentIndex - 1 + galleryButtons.length) % galleryButtons.length;
      updateLightbox(currentIndex);
    };

    galleryButtons.forEach((button, index) => {
      button.addEventListener("click", () => openLightbox(index));
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeLightbox);
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", showNext);
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", showPrev);
    }

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("is-open")) {
        return;
      }
      if (event.key === "Escape") {
        closeLightbox();
      }
      if (event.key === "ArrowRight") {
        showNext();
      }
      if (event.key === "ArrowLeft") {
        showPrev();
      }
      if (event.key === "Tab") {
        const focusable = lightbox.querySelectorAll(focusableSelector);
        if (!focusable.length) {
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }
})();
