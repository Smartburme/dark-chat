document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 0;
  setTimeout(() => document.body.style.transition = "opacity 0.5s", 50);
  setTimeout(() => document.body.style.opacity = 1, 100);
});