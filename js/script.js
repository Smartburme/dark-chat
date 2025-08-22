// Posts array from localStorage
let posts = JSON.parse(localStorage.getItem("posts")) || [];

// Elements
const postsFeed = document.getElementById("postsFeed");
const plusBtn = document.getElementById("plusBtn");
const newPostModal = document.getElementById("newPostModal");
const closeModal = document.querySelector(".modal .close");
const modalPostBtn = document.getElementById("modalPostBtn");
const modalPostContent = document.getElementById("modalPostContent");
const modalPostImage = document.getElementById("modalPostImage");

// Emoji list
const emojis = ["👍", "❤️", "😂", "😮", "😢", "👏"];

// Render posts
function renderPosts() {
  postsFeed.innerHTML = "";
  posts.slice().reverse().forEach((post, index) => {
    const postCard = document.createElement("div");
    postCard.className = "post-card";

    // Header
    const postHeader = document.createElement("div");
    postHeader.className = "post-header";
    postHeader.innerHTML = `
      <div style="display:flex;align-items:center;">
        <img src="${post.avatar}" class="avatar">
        <div>
          <h3>${post.author}</h3>
          <span>${post.time}</span>
        </div>
      </div>
    `;

    // Content
    const postText = document.createElement("p");
    postText.className = "post-text";
    postText.textContent = post.content;

    // Image (if exists)
    let postImage = "";
    if(post.image) {
      postImage = document.createElement("img");
      postImage.className = "post-image";
      postImage.src = post.image;
    }

    // Actions
    const postActions = document.createElement("div");
    postActions.className = "post-actions";
    postActions.innerHTML = `
      <button onclick="likePost(${index})">👍 Like (${post.likes})</button>
      <button onclick="commentPost(${index})">💬 Comment (${post.comments.length})</button>
      <button onclick="sharePost(${index})">🔗 Share</button>
      <button onclick="showEmoji(${index}, this)">😊 Emoji</button>
    `;

    postCard.append(postHeader, postText);
    if(post.image) postCard.appendChild(postImage);
    postCard.appendChild(postActions);
    postsFeed.appendChild(postCard);
  });
}

// Add new post
modalPostBtn.addEventListener("click", () => {
  const content = modalPostContent.value.trim();
  const file = modalPostImage.files[0];

  if(!content && !file) return alert("Please enter text or select an image");

  if(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      addPost(content, e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    addPost(content, null);
  }
});

// Add post function
function addPost(content, image) {
  posts.push({
    author: "You",
    avatar: "assets/img/user1.png",
    content: content,
    image: image,
    time: "Just now",
    likes: 0,
    comments: [],
    reactions: []
  });

  localStorage.setItem("posts", JSON.stringify(posts));
  modalPostContent.value = "";
  modalPostImage.value = "";
  newPostModal.style.display = "none";
  renderPosts();
}

// + Button opens modal
plusBtn.addEventListener("click", e => {
  e.preventDefault();
  newPostModal.style.display = "flex";
});

// Close modal
closeModal.addEventListener("click", () => newPostModal.style.display = "none");

// Click outside modal closes it
window.addEventListener("click", e => {
  if(e.target === newPostModal) newPostModal.style.display = "none";
});

// Post actions
function likePost(index) {
  posts[index].likes++;
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
}

function commentPost(index) {
  const comment = prompt("Enter comment:");
  if(comment) {
    posts[index].comments.push(comment);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  }
}

function sharePost(index) {
  alert("Post shared! (demo)");
}

// Emoji reactions
function showEmoji(index, btn) {
  const existing = document.querySelector(".emoji-popup");
  if(existing) existing.remove();

  const popup = document.createElement("div");
  popup.className = "emoji-popup";
  popup.style.position = "absolute";
  popup.style.bottom = "50px";
  popup.style.left = btn.getBoundingClientRect().left + "px";
  popup.style.backgroundColor = "#111";
  popup.style.border = "1px solid #0f0";
  popup.style.padding = "5px 10px";
  popup.style.borderRadius = "10px";
  popup.style.display = "flex";
  popup.style.gap = "5px";
  popup.style.zIndex = 1000;

  emojis.forEach(e => {
    const span = document.createElement("span");
    span.textContent = e;
    span.style.cursor = "pointer";
    span.style.fontSize = "18px";
    span.onclick = () => {
      posts[index].reactions.push(e);
      localStorage.setItem("posts", JSON.stringify(posts));
      renderPosts();
      popup.remove();
    };
    popup.appendChild(span);
  });

  document.body.appendChild(popup);

  document.addEventListener("click", function close(ev) {
    if(!popup.contains(ev.target) && ev.target !== btn) {
      popup.remove();
      document.removeEventListener("click", close);
    }
  });
}

// Initial render
renderPosts();