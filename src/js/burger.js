// Burger menu: open/close (slide + fade come from CSS), lock scroll while open.
const toggle = document.getElementById("burger-toggle");
const menu = document.querySelector(".burger-menu");
const overlay = document.querySelector(".menu-overlay");

function setMenu(open) {
  menu.classList.toggle("is-open", open);
  overlay.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open); // lock scroll + swap icon
}

// Burger / × button (both live inside #burger-toggle).
toggle.addEventListener("click", () =>
  setMenu(!menu.classList.contains("is-open")),
);

// Click on a menu link → close.
menu.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});

// Click on the backdrop (outside the panel) → close.
overlay.addEventListener("click", () => setMenu(false));

// Header "Order" button (sits above the menu on tablet) → close.
document
  .querySelector("header .a-wrapper-92-32 a")
  ?.addEventListener("click", () => setMenu(false));
