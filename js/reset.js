document.getElementById("resetBtn").addEventListener("click", () => {
  const email = document.getElementById("resetEmail").value.trim();

  auth.sendPasswordResetEmail(email)
    .then(msg => alert(msg))
    .catch(err => alert(err));
});