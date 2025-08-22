// ======================
// Dark Chat - group.js
// ======================

// Selectors
const groupMsgContainer = document.querySelector(".chat-messages");
const groupInput = document.querySelector(".chat-input input");
const groupSendBtn = document.querySelector(".chat-input .send-btn");

// Add message to chat
function addGroupMessage(text, sender = "user") {
  if (!text.trim()) return;

  const msg = document.createElement("div");
  msg.classList.add("msg", sender);

  msg.innerHTML = `
    <p>${text}</p>
    <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
  `;

  groupMsgContainer.appendChild(msg);
  groupMsgContainer.scrollTop = groupMsgContainer.scrollHeight;
}

// Send message on button click
if (groupSendBtn) {
  groupSendBtn.addEventListener("click", () => {
    addGroupMessage(groupInput.value, "user");
    groupInput.value = "";
  });
}

// Send message on Enter key
if (groupInput) {
  groupInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addGroupMessage(groupInput.value, "user");
      groupInput.value = "";
    }
  });
}

// Fake receive demo message
setTimeout(() => {
  addGroupMessage("Welcome to Dark Chat Group 🔥", "friend");
}, 1500);

// Emoji picker demo
document.querySelector(".chat-input .emoji-btn")?.addEventListener("click", () => {
  addGroupMessage("😀😂👍", "user");
});

// Microphone demo
document.querySelector(".chat-input .mic-btn")?.addEventListener("click", () => {
  addGroupMessage("🎤 Voice message (demo)", "user");
});

// Attachment demo
document.querySelector(".chat-input .attach-btn")?.addEventListener("click", () => {
  addGroupMessage("📎 File attached (demo)", "user");
});