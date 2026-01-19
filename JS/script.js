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

  const savedMode = localStorage.getItem("mode");
  if (savedMode === "enable") {
    document.body.classList.add("dark-mode");
    [about, portfolio].forEach((el) =>
      el.classList.replace("bg-light", "section-gradient-dark"),
    );
  } else if (savedMode === "disable") {
    [about, portfolio].forEach((el) => el.classList.add("bg-light"));
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("mode", "enable");
      [about, portfolio].forEach((el) =>
        el.classList.replace("bg-light", "section-gradient-dark"),
      );
    } else {
      localStorage.setItem("mode", "disable");
      [about, portfolio].forEach((el) =>
        el.classList.replace("section-gradient-dark", "bg-light"),
      );
    }
  });
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

  const toggle = document.getElementById("darkModeToggle");
  const icon = toggle.querySelector("i");

  toggle.addEventListener("click", () => {
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");

    icon.style.transform = "rotate(180deg)";
    setTimeout(() => (icon.style.transform = "rotate(0)"), 200);
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
