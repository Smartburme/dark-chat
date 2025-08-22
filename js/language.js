const lang = localStorage.getItem("language") || "en";
document.documentElement.lang = lang;

// Example text translation (mock)
const texts = {
  en: { welcome: "Welcome" },
  my: { welcome: "ကြိုဆိုပါသည်" }
};

document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelectorAll("[data-text]");
  el.forEach(e => {
    const key = e.getAttribute("data-text");
    e.textContent = texts[lang][key] || e.textContent;
  });
});