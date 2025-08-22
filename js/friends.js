// ======================
// Dark Chat - friends.js
// ======================

// Selectors
const friendMsgContainer = document.querySelector(".chat-messages");
const friendInput = document.querySelector(".chat-input input");
const friendSendBtn = document.querySelector(".chat-input .send-btn");
const blockBtn = document.querySelector(".chat-header .chat-actions button:first-child");
const bgBtn = document.querySelector(".chat-header .chat-actions button:last-child");

let isBlocked = false;

// Add message
function addFriendMessage(text, sender = "user") {
  if (!text.trim() || isBlocked) return;

  const msg = document.createElement("div");
  msg.classList.add("msg", sender);

  msg.innerHTML = `
    <p>${text}</p>
    <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
  `;

  friendMsgContainer.appendChild(msg);
  friendMsgContainer.scrollTop = friendMsgContainer.scrollHeight;
}

// Send msg (button)
if (friendSendBtn) {
  friendSendBtn.addEventListener("click", () => {
    addFriendMessage(friendInput.value, "user");
    friendInput.value = "";
  });
}

// Send msg (Enter)
if (friendInput) {
  friendInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addFriendMessage(friendInput.value, "user");
      friendInput.value = "";
    }
  });
}

// Block system
if (blockBtn) {
  blockBtn.addEventListener("click", () => {
    isBlocked = !isBlocked;
    blockBtn.innerHTML = isBlocked ? '<i class="fa fa-unlock"></i> Unblock' : '<i class="fa fa-ban"></i> Block';
    addFriendMessage(isBlocked ? "🚫 You blocked this user" : "✅ You unblocked this user", "friend");
  });
}

// Change background image (toggle demo)
if (bgBtn) {
  let bgToggle = false;
  bgBtn.addEventListener("click", () => {
    bgToggle = !bgToggle;
    document.querySelector(".friend-chat").style.backgroundImage = bgToggle
      ? "url('../assets/img/alt-bg.png')"
      : "url('../assets/img/chat-bg.png')";
  });
}

// Emoji demo
document.querySelector(".chat-input .emoji-btn")?.addEventListener("click", () => {
  addFriendMessage("😎🔥💚", "user");
});

// Mic demo
document.querySelector(".chat-input .mic-btn")?.addEventListener("click", () => {
  addFriendMessage("🎤 Private voice message (demo)", "user");
});

// Attach demo
document.querySelector(".chat-input .attach-btn")?.addEventListener("click", () => {
  addFriendMessage("📎 Private file attached (demo)", "user");
});

// Fake incoming msg
setTimeout(() => {
  addFriendMessage("Hello 👋 Testing private chat!", "friend");
}, 2000);