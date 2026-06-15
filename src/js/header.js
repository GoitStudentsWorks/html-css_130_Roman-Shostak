// Hide the header on scroll down, reveal it on scroll up.
const header = document.querySelector(".header");
const burgerMenu = document.querySelector(".burger-menu");

let lastScroll = window.scrollY;
let ticking = false;

function onScroll() {
  const current = window.scrollY;
  const scrollingDown = current > lastScroll;
  const menuOpen = burgerMenu?.classList.contains("is-open");

  header.classList.toggle(
    "is-hidden",
    scrollingDown && current > header.offsetHeight && !menuOpen,
  );

  lastScroll = current;
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  },
  { passive: true },
);
