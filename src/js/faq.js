/* FAQ accordion */

const faqItems = document.querySelectorAll(".faq-item");

// Animate an answer open: pin 0 → its full height, then release to CSS `auto`.
const openItem = (item) => {
  const answer = item.querySelector(".faq-answer");
  const button = item.querySelector(".faq-question");

  answer.style.height = "0px";
  answer.offsetHeight; // force reflow so the next change animates

  item.classList.add("active");
  button.setAttribute("aria-expanded", "true");
  answer.style.height = `${answer.scrollHeight}px`;
};

// Animate an answer closed: pin its current height, then collapse to 0.
const closeItem = (item) => {
  const answer = item.querySelector(".faq-answer");
  const button = item.querySelector(".faq-question");

  answer.style.height = `${answer.scrollHeight}px`;
  answer.offsetHeight; // force reflow

  item.classList.remove("active");
  button.setAttribute("aria-expanded", "false");
  answer.style.height = "0px";
};

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  // Sync ARIA with the initial (HTML) state — first item is open by default.
  button.setAttribute("aria-expanded", item.classList.contains("active"));

  // After each transition drop the inline height so CSS owns the resting
  // state again: `auto` while active (adapts to resize), `0` while closed.
  answer.addEventListener("transitionend", (event) => {
    if (event.propertyName === "height") {
      answer.style.height = "";
    }
  });

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Single-open accordion: collapse any other open item.
    faqItems.forEach((other) => {
      if (other !== item && other.classList.contains("active")) {
        closeItem(other);
      }
    });

    if (isActive) {
      closeItem(item);
    } else {
      openItem(item);
    }
  });
});
