// ======================
// Dark Chat - firebase.js
// ======================

// Initialize Firebase (replace with your own config)
const firebaseConfig = {
    apiKey: "AIzaSyAr7Hv2ApKtNTxF11MhT5cuWeg_Dgsh0TY",
    authDomain: "smart-burme-app.firebaseapp.com",
    projectId: "smart-burme-app",
    storageBucket: "smart-burme-app.appspot.com",
    messagingSenderId: "851502425686",
    appId: "1:851502425686:web:f29e0e1dfa84794b4abdf7"
  };

// Mock Firebase Auth (for demo without real API)
const auth = {
  users: [],
  createUserWithEmailAndPassword: function(email, password, extra) {
    if (this.users.find(u => u.email === email)) return Promise.reject("Email already exists");
    const user = { email, password, ...extra };
    this.users.push(user);
    return Promise.resolve(user);
  },
  signInWithEmailAndPassword: function(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) return Promise.reject("Invalid email or password");
    return Promise.resolve(user);
  },
  sendPasswordResetEmail: function(email) {
    const user = this.users.find(u => u.email === email);
    if (!user) return Promise.reject("Email not found");
    return Promise.resolve("Reset link sent to " + email);
  }

};
