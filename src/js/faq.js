/* FAQ accordion */

const list = document.querySelector(".faq-list");

if (list) {
  // Slide an answer between height:0 and its content height. The transitionend
  // handler then clears the inline height so CSS owns the resting state
  // (auto while open, 0 while closed) and it stays responsive to resize.
  const toggle = (item, open) => {
    const answer = item.querySelector(".faq-answer");

    item.querySelector(".faq-question").setAttribute("aria-expanded", open);
    answer.style.height = `${open ? 0 : answer.scrollHeight}px`;
    answer.offsetHeight; // force reflow so the next change animates
    item.classList.toggle("active", open);
    answer.style.height = `${open ? answer.scrollHeight : 0}px`;
  };

  // Sync initial ARIA with the HTML (first item is open by default).
  list
    .querySelectorAll(".faq-item")
    .forEach((item) =>
      item
        .querySelector(".faq-question")
        .setAttribute("aria-expanded", item.classList.contains("active")),
    );

  list.addEventListener("transitionend", (event) => {
    if (event.propertyName === "height") event.target.style.height = "";
  });

  list.addEventListener("click", (event) => {
    const item = event.target.closest(".faq-question")?.closest(".faq-item");
    if (!item) return;

    const open = !item.classList.contains("active");

    // Single-open accordion: collapse whichever item is currently open.
    list
      .querySelectorAll(".faq-item.active")
      .forEach((other) => other !== item && toggle(other, false));

    toggle(item, open);
  });
}
