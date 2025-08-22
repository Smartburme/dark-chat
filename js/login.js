document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      alert("Login successful! Welcome " + user.email);
      window.location.href = "main.html";
    })
    .catch(err => alert(err));
});