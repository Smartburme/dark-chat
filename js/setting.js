// ======================
// Dark Chat - setting.js
// ======================

// Theme toggle
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
});

// Load saved theme
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.className = savedTheme;
  }
});

// Language change
const languageSelect = document.getElementById("languageSelect");
languageSelect.addEventListener("change", (e) => {
  const lang = e.target.value;
  localStorage.setItem("language", lang);
  alert("Language changed to: " + (lang === "en" ? "English" : "မြန်မာ"));
});

// Storage accept
const storageBtn = document.getElementById("storageBtn");
storageBtn.addEventListener("click", () => {
  localStorage.setItem("storageAccepted", "true");
  alert("Storage Accepted ✅");
});