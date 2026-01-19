// ==============================
// script.js (Bootstrap-first final)
// Handles:
//   • reveal-in-view animations
//   • typing effect for profession
//   • footer year auto-update
// ==============================

document.addEventListener("DOMContentLoaded", function () {
  // ---------------------------------
  // Reveal on scroll using IntersectionObserver
  // ---------------------------------
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // ---------------------------------
  // Footer year auto-update
  // ---------------------------------
  const elYear = document.getElementById("this_year");
  if (elYear) {
    elYear.innerText = new Date().getFullYear();
  }

  // ---------------------------------
  // Smooth scroll on page load if hash present
  // ---------------------------------
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }

  // Dark Mode Toggle
  const about = document.getElementById("about");
  const portfolio = document.getElementById("portfolio");
  const toggleBtn = document.getElementById("darkModeToggle");

  // helper: apply a saved mode value: "enable" => dark, "disable" => light
  function applyMode(modeValue) {
    const isDark = modeValue === "enable";

    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    if (toggleBtn) toggleBtn.innerText = isDark ? "Light Mode" : "Dark Mode";

    [about, portfolio].forEach((el) => {
      if (!el) return;
      if (isDark) {
        if (el.classList.contains("bg-light")) {
          el.classList.replace("bg-light", "section-gradient-dark");
        } else {
          el.classList.add("section-gradient-dark");
        }
      } else {
        if (el.classList.contains("section-gradient-dark")) {
          el.classList.replace("section-gradient-dark", "bg-light");
        } else {
          el.classList.add("bg-light");
        }
      }
    });
  }

  // Read stored preference, fall back to OS preference, then default to light
  const stored = localStorage.getItem("mode"); // "enable" | "disable" | null
  if (stored === "enable" || stored === "disable") {
    applyMode(stored);
  } else {
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyMode(prefersDark ? "enable" : "disable");
  }

  // Wire up toggle (safe-guard if the button isn't on the page)
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nowDark = document.body.classList.contains("dark-mode");
      const newMode = nowDark ? "disable" : "enable"; // flip
      localStorage.setItem("mode", newMode);
      applyMode(newMode);
      console.log(newMode === "enable" ? "dark mode clicked" : "light mode clicked");
    });
  }
  // auto close in menu when items clicked in mobile
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false,
      });
      bsCollapse.hide();
    });
  });
});

// ---------------------------------
// Typing Effect for Profession
// ---------------------------------
const typedText = document.getElementById("typed-text");
const professions = [
  "Full Stack Web Developer",
  "Frontend Developer",
  "Backend Developer",
];
let currentIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100; // ms per character

function typeEffect() {
  const currentText = professions[currentIndex];

  if (!isDeleting) {
    typedText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200); // pause before deleting
      return;
    }
  } else {
    typedText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % professions.length;
    }
  }

  const delay = isDeleting ? 60 : typingSpeed;
  setTimeout(typeEffect, delay);
}

document.addEventListener("DOMContentLoaded", typeEffect);
