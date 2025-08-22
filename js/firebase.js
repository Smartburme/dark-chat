// ======================
// Dark Chat - firebase.js
// ======================

// Initialize Firebase (replace with your own config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
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