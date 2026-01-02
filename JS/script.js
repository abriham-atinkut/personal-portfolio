// /* ==============================
//    script.js
//    - Handles:
//      • mobile menu toggle
//      • active nav link on scroll
//      • reveal-in-view animations
//      • simple contact form behavior
//      • year auto-update
//    Edit the values and placeholder links in the HTML.
//    ============================== */

document.addEventListener("DOMContentLoaded", function () {
  // ---------------------------------
  // MENU TOGGLE LOGIC
  // ---------------------------------
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("overlay");

  // When hamburger (☰) is clicked
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active"); // change icon to X
    mobileMenu.classList.toggle("active"); // show/hide menu
    overlay.classList.toggle("active"); // show/hide overlay
  });

  // Close menu when overlay (outside area) is clicked
  overlay.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
  
  // Close menu and smooth scroll when clicking a link inside mobile menu
  const menuLinks = document.querySelectorAll("#mobile-menu a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default jump

      // Get target section from href
      const targetId = link.getAttribute("href").substring(1); // remove '#'
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Smooth scroll to section
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Close the mobile menu
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      overlay.classList.remove("active");
    });
  });

  // Active nav links while scrolling
  const sections = Array.from(document.querySelectorAll("main section"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));

  function onScroll() {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    let current = sections[0].id;

    for (const sec of sections) {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    }

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll();

  // Reveal on scroll using IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          // once revealed, stop observing
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  //   let abriham = document.getElementsByClassName("brand-name");
  // if (entry.target.id === "home") {
  //   abriham.style.display = "none";
  // }
  const logo = document.querySelector(".logo");
  const sections2 = document.querySelectorAll("section");
  const observer2 = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "home") {
            logo.classList.add("hidden");
          } else {
            logo.classList.remove("hidden");
          }
        }
      });
    },
    { threshold: 0.6 }
  );
  sections2.forEach((section) => observer2.observe(section));

  document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // Contact form handlers
  window.handleContactSubmit = function (ev) {
    ev.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !message) {
      alert("Please complete all fields.");
      return;
    }

    // For now we open mailto as a simple fallback — replace with real backend integration
    const mailto = `mailto:you@example.com?subject=${encodeURIComponent(
      "Contact from " + name
    )}&body=${encodeURIComponent(
      message + "\n\n— " + name + " (" + email + ")"
    )}`;
    window.location.href = mailto;
  };

  // Mailto fallback button (opens default email client)
  const mailtoBtn = document.getElementById("mailto-fallback");
  mailtoBtn.addEventListener("click", () => {
    const subject = encodeURIComponent("Contact via Portfolio");
    window.location.href = `mailto:abrihamatinkut@gmail.com?subject=${subject}`;
  });

  // Download resume placeholder - change href in HTML to your resume file
  const resumeBtn = document.getElementById("download-resume");
  resumeBtn.addEventListener("click", (e) => {
    // If you want it to trigger a download of a file in the site, set href to '/files/resume.pdf' etc.
    // This simple demo will just console log; remove if you set direct link in HTML.
    console.log(
      "Download resume button clicked — replace href with your resume file link."
    );
  });

  // Footer year
  const elYear = document.getElementById("year");
  if (elYear) elYear.textContent = new Date().getFullYear();

  // Smoothly scroll to section on page load if hash present
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }
});

// Typing Effect for Profession
const typedText = document.getElementById("typed-text");
const professions = [
  "Full Stack Web Developer",
  "MERN Stack Developer",
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
    // Typing forward
    typedText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      // Pause at full text
      isDeleting = true;
      setTimeout(typeEffect, 1200); // wait before deleting
      return;
    }
  } else {
    // Deleting
    typedText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % professions.length; // next profession
    }
  }

  const delay = isDeleting ? 60 : typingSpeed;
  setTimeout(typeEffect, delay);
}

document.addEventListener("DOMContentLoaded", typeEffect);
