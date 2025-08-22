// ======================
// Dark Chat - profile.js
// ======================

let profileData = {
  name: "Anonymous User",
  gender: "Not set",
  age: 0,
  gmail: "example@gmail.com",
  password: "******",
  mobile: "+95",
  photo: "../assets/default-avatar.png",
  frame: localStorage.getItem("profileFrame") || null
};

const profileImg = document.getElementById("profileImg");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");

const detailName = document.getElementById("detailName");
const detailGender = document.getElementById("detailGender");
const detailAge = document.getElementById("detailAge");
const detailGmail = document.getElementById("detailGmail");
const detailPassword = document.getElementById("detailPassword");
const detailMobile = document.getElementById("detailMobile");

const editBtn = document.getElementById("editBtn");     // Edit Profile
const frameBtn = document.getElementById("frameBtn");   // Edit Frame

// Render profile function
function renderProfile() {
  profileImg.src = profileData.photo;
  profileName.textContent = profileData.name;
  profileEmail.textContent = profileData.gmail;

  detailName.textContent = profileData.name;
  detailGender.textContent = profileData.gender;
  detailAge.textContent = profileData.age;
  detailGmail.textContent = profileData.gmail;
  detailPassword.textContent = profileData.password;
  detailMobile.textContent = profileData.mobile;

  // Apply frame if exists
  if (profileData.frame) {
    profileImg.style.border = "5px solid transparent";
    profileImg.className = profileData.frame; // frame class from frame.css
  } else {
    profileImg.style.border = "3px solid #0f0";
    profileImg.className = "";
  }
}

// Upload new profile photo
document.getElementById("uploadPhoto").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      profileData.photo = event.target.result;
      renderProfile();
    };
    reader.readAsDataURL(file);
  }
});

// ======================
// Editing Profile Button
// ======================
editBtn.addEventListener("click", function() {
  const name = prompt("Enter your name:", profileData.name);
  const gender = prompt("Enter your gender (Male/Female):", profileData.gender);
  const age = prompt("Enter your age:", profileData.age);
  const gmail = prompt("Enter your Gmail:", profileData.gmail);
  const password = prompt("Enter new password:", profileData.password);
  const mobile = prompt("Enter your mobile:", profileData.mobile);

  if (name) profileData.name = name;
  if (gender) profileData.gender = gender;
  if (age) profileData.age = age;
  if (gmail) profileData.gmail = gmail;
  if (password) profileData.password = password;
  if (mobile) profileData.mobile = mobile;

  renderProfile();
});

// ======================
// Editing Frame Button → frame-editing.html
// ======================
frameBtn.addEventListener("click", function() {
  window.location.href = "frame-editing.html";
});

// On load, get saved frame
window.addEventListener("load", () => {
  profileData.frame = localStorage.getItem("profileFrame") || null;
  renderProfile();
});