document.getElementById("registerBtn").addEventListener("click", () => {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const mobile = document.getElementById("regMobile").value.trim();

  auth.createUserWithEmailAndPassword(email, password, {name, mobile})
    .then(user => {
      alert("Registration successful!");
      window.location.href = "login.html";
    })
    .catch(err => alert(err));
});