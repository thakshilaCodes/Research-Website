const nav = document.getElementById("navmenu");
const navToggle = document.getElementById("nav-toggle");
const navCollapse = document.getElementById("navbarSupportedContent");
const mainEl = document.getElementById("main-content");
const navItems = document.querySelectorAll(".navbar-nav .nav-item");
const contactForm = document.querySelector(".contact-form");
const contactFeedback = document.getElementById("contact-feedback");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateNavBackground() {
  nav.classList.toggle("nav-bg-light", window.scrollY > 40);
}

function updateActiveNavItem() {
  const sections = [...document.querySelectorAll("section[id]")];
  const current = sections
    .filter((section) => section.offsetTop <= window.scrollY + 160)
    .at(-1);

  navItems.forEach((item) => item.classList.remove("active"));

  if (!current) return;

  const activeAnchor = document.querySelector(`.navbar-nav a[href="#${current.id}"]`);
  const activeItem = activeAnchor?.closest(".nav-item");
  activeItem?.classList.add("active");
}

function initSectionReveal() {
  if (!mainEl || prefersReducedMotion) return;

  mainEl.classList.add("reveal-on-scroll");
  const sections = mainEl.querySelectorAll(":scope > section");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { root: null, rootMargin: "0px 0px -5% 0px", threshold: 0.06 },
  );

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      section.classList.add("is-visible");
    }
    io.observe(section);
  });
}

navToggle.addEventListener("click", () => {
  const isOpen = navCollapse.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll('.navbar-nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", () => {
    navCollapse.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (contactFeedback) {
      contactFeedback.hidden = false;
      contactFeedback.textContent =
        "Thanks — we received your message. The team will get back to you when possible.";
    } else {
      contactForm.insertAdjacentText(
        "afterbegin",
        "Thanks — we received your message. The team will get back to you when possible.",
      );
    }
    contactForm.reset();
  });
}

window.addEventListener("scroll", () => {
  updateNavBackground();
  updateActiveNavItem();
});

initSectionReveal();
updateNavBackground();
updateActiveNavItem();
