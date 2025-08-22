// ======================
// Dark Chat - frame.js
// ======================

let selectedFrame = localStorage.getItem("profileFrame") || null;
let frameSize = 'medium';

const frameEls = document.querySelectorAll(".frame");
const customUpload = document.getElementById("customFrameUpload");
const applyBtn = document.getElementById("applyFrameBtn");
const previewProfile = document.getElementById("previewProfile");
const previewFrame = document.getElementById("previewFrame");
const frameSizeSelect = document.getElementById("frameSizeSelect");

// Initialize previously selected frame
frameEls.forEach(frameEl => {
  if (frameEl.getAttribute("data-frame") === selectedFrame) {
    frameEl.classList.add("selected");
    previewFrame.src = frameEl.querySelector("img").src;
  }
});

// Frame selection
frameEls.forEach(frameEl => {
  frameEl.addEventListener("click", () => {
    frameEls.forEach(f => f.classList.remove("selected"));
    frameEl.classList.add("selected");
    selectedFrame = frameEl.getAttribute("data-frame");
    previewFrame.src = frameEl.querySelector("img").src;
  });
});

// Custom frame upload
customUpload.addEventListener("change", e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      selectedFrame = "customFrame";
      previewFrame.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Frame size change
frameSizeSelect.addEventListener("change", e => {
  frameSize = e.target.value;
  let size = 120;
  if (frameSize === 'small') size = 80;
  if (frameSize === 'medium') size = 120;
  if (frameSize === 'large') size = 150;

  previewProfile.style.width = size + 'px';
  previewProfile.style.height = size + 'px';
  previewFrame.style.width = size + 'px';
  previewFrame.style.height = size + 'px';
});

// Apply frame
applyBtn.addEventListener("click", () => {
  if (!selectedFrame) {
    alert("Please select or upload a frame!");
    return;
  }
  localStorage.setItem("profileFrame", selectedFrame);
  localStorage.setItem("profileFrameSize", frameSize);
  showToast("Frame applied successfully!");

  setTimeout(() => {
    window.location.href = "profile.html";
  }, 500);
});

// Toast notification
function showToast(message) {
  let toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.backgroundColor = "#0f0";
  toast.style.color = "#000";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "8px";
  toast.style.fontWeight = "bold";
  toast.style.boxShadow = "0 0 10px #0f0";
  toast.style.zIndex = 1000;
  toast.style.opacity = 0;
  toast.style.transition = "opacity 0.3s";

  document.body.appendChild(toast);
  setTimeout(() => toast.style.opacity = 1, 50);
  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => toast.remove(), 500);
  }, 2000);
}