/* -----------------------------
   Data model
----------------------------- */

const currentUserId = "you";

const users = {
  u1: {
    name: "Noah",
    avatar: "🌿",
    bio: "CS junior in UV3 who loves coffee chats and late-night LeetCode."
  },
  u2: {
    name: "Maya",
    avatar: "🌸",
    bio: "Atec & UX student who sketches app ideas and grows too many plants."
  },
  u3: {
    name: "Leo",
    avatar: "🦊",
    bio: "Night-owl who lives in Phase 8 and always knows when free food drops."
  },
  u4: {
    name: "Sana",
    avatar: "🌙",
    bio: "Data science major running spontaneous study groups in ECSW."
  },
  u5: {
    name: "Ray",
    avatar: "🌊",
    bio: "Gym regular & intramural champ, usually at Rec or on the courts."
  },
  you: {
    name: "You",
    avatar: "⭐️",
    bio: "The cloud thinker behind this account."
  }
};

const reactionOptions = ["👍", "❤️", "😂", "😮", "👎"];

// Hardcoded pins around UTD
let pins = [
  {
    id: "pin1",
    lat: 32.984746,
    lng: -96.752568,
    text: "Anyone want a coffee by UV3?",
    baseLikes: 7,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "u1",
        text: "I’m headed to Starbucks in JSOM in 10 mins.",
        baseReactions: { "👍": 3, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "u2",
        text: "Can we go to Study Grounds instead? It’s quieter.",
        baseReactions: { "👍": 2, "❤️": 2, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "u3",
        text: "If someone brings me a latte, I’ll trade notes.",
        baseReactions: { "👍": 1, "❤️": 0, "😂": 2, "😮": 0, "👎": 0 },
        myReactions: {}
      }
    ]
  },
  {
    id: "pin2",
    lat: 32.9852,
    lng: -96.7519,
    text: "CS 2336 study group tonight?",
    baseLikes: 5,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "u4",
        text: "Let’s meet in ECSW 2nd floor booths.",
        baseReactions: { "👍": 3, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "u5",
        text: "I can help with linked lists if someone explains AVL trees.",
        baseReactions: { "👍": 2, "❤️": 0, "😂": 1, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "u2",
        text: "Bring laptops + chargers, outlets go fast.",
        baseReactions: { "👍": 1, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      }
    ]
  },
  {
    id: "pin3",
    lat: 32.9856,
    lng: -96.753,
    text: "Free snacks in ECSW lobby!",
    baseLikes: 9,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "u3",
        text: "There are still granola bars + chips.",
        baseReactions: { "👍": 4, "❤️": 1, "😂": 0, "😮": 1, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "u1",
        text: "Cookies are gone, but drinks left.",
        baseReactions: { "👍": 2, "❤️": 0, "😂": 1, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "u5",
        text: "Someone save me a snack, I’m in class.",
        baseReactions: { "👍": 1, "❤️": 0, "😂": 2, "😮": 0, "👎": 0 },
        myReactions: {}
      }
    ]
  },
  {
    id: "pin4",
    lat: 32.9861,
    lng: -96.7521,
    text: "Lost AirPods near SU stairs :(",
    baseLikes: 3,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "u2",
        text: "Check the Info Desk, they keep lost items.",
        baseReactions: { "👍": 4, "❤️": 0, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "u4",
        text: "Put a note in other Think Cloud pins around SU.",
        baseReactions: { "👍": 2, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "u1",
        text: "If I see any, I’ll DM you here.",
        baseReactions: { "👍": 3, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      }
    ]
  },
  {
    id: "pin5",
    lat: 32.9843,
    lng: -96.7534,
    text: "Anyone going to the gym at 7?",
    baseLikes: 4,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "u5",
        text: "I’m doing legs today if anyone wants a buddy.",
        baseReactions: { "👍": 3, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "u3",
        text: "Can someone show me how to use the squat rack?",
        baseReactions: { "👍": 2, "❤️": 1, "😂": 1, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "u4",
        text: "Let’s meet by the front desk at 6:55.",
        baseReactions: { "👍": 2, "❤️": 0, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      }
    ]
  },
  {
    id: "pin6",
    lat: 32.9859,
    lng: -96.7515,
    text: "Looking for a quiet spot to write essay.",
    baseLikes: 2,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "u2",
        text: "McDermott 4th floor is usually chill.",
        baseReactions: { "👍": 3, "❤️": 0, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "u1",
        text: "ATEC lobby couches are nice too.",
        baseReactions: { "👍": 1, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "u4",
        text: "Noise-cancelling headphones + SU atrium also works.",
        baseReactions: { "👍": 1, "❤️": 0, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      }
    ]
  },
  {
    id: "pin7",
    lat: 32.9863,
    lng: -96.7532,
    text: "Anyone free for a quick walk around campus?",
    baseLikes: 6,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "u3",
        text: "I need a break from coding, I’m in.",
        baseReactions: { "👍": 3, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "u5",
        text: "Let’s do a loop around the plinth.",
        baseReactions: { "👍": 2, "❤️": 0, "😂": 1, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "u2",
        text: "I’ll bring my camera for sunset pics.",
        baseReactions: { "👍": 1, "❤️": 2, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      }
    ]
  },
  {
    id: "pin8",
    lat: 32.9841,
    lng: -96.7518,
    text: "Any recs for good vegetarian food nearby?",
    baseLikes: 8,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "u4",
        text: "Madurai Mes has great dosas if you can Uber.",
        baseReactions: { "👍": 4, "❤️": 2, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "u1",
        text: "SU has decent veggie options if you mix sides.",
        baseReactions: { "👍": 2, "❤️": 0, "😂": 1, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "u2",
        text: "There’s also a food truck near UV sometimes.",
        baseReactions: { "👍": 2, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      }
    ]
  },
  {
    id: "pin9",
    lat: 32.985,
    lng: -96.754,
    text: "Anyone working on HCI project today?",
    baseLikes: 3,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "u2",
        text: "I’m prototyping in Figma in the ATEC labs.",
        baseReactions: { "👍": 2, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "u3",
        text: "We’re doing user interviews at the SU couches.",
        baseReactions: { "👍": 1, "❤️": 0, "😂": 0, "😮": 1, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "u4",
        text: "Drop your Figma link here and we can swap feedback.",
        baseReactions: { "👍": 2, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      }
    ]
  },
  {
    id: "pin10",
    lat: 32.9839,
    lng: -96.752,
    text: "Anyone selling old textbooks this semester?",
    baseLikes: 4,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "u1",
        text: "I have CS 2336 and Discrete Math books.",
        baseReactions: { "👍": 2, "❤️": 0, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "u5",
        text: "I have a slightly cursed copy of DB book with notes.",
        baseReactions: { "👍": 2, "❤️": 0, "😂": 2, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "u3",
        text: "Trade only, no one wants to pay bookstore prices lol.",
        baseReactions: { "👍": 1, "❤️": 0, "😂": 2, "😮": 0, "👎": 0 },
        myReactions: {}
      }
    ]
  },
  {
    id: "pin11",
    lat: 32.9864,
    lng: -96.7511,
    text: "Late-night coding session after 10pm?",
    baseLikes: 6,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "u3",
        text: "I’ll be in the ATEC lab until 1am probably.",
        baseReactions: { "👍": 3, "❤️": 0, "😂": 0, "😮": 1, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "u4",
        text: "Bring snacks, I have extra extension cords.",
        baseReactions: { "👍": 2, "❤️": 1, "😂": 1, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "u2",
        text: "Lo-fi playlist + silent study pact?",
        baseReactions: { "👍": 2, "❤️": 2, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      }
    ]
  }
];

const markers = {};
let activePinId = null;

/* -----------------------------
   Map setup
----------------------------- */

const map = L.map("map").setView([32.985, -96.752], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// Create all markers
pins.forEach((pin) => {
  const marker = L.marker([pin.lat, pin.lng]).addTo(map);
  markers[pin.id] = marker;
  updateMarkerPopup(pin.id);
});

/* -----------------------------
   Helpers
----------------------------- */

function getPin(pinId) {
  return pins.find((p) => p.id === pinId);
}

function countComments(pin) {
  return pin.comments.length;
}

function likeCount(pin) {
  return pin.baseLikes + (pin.liked ? 1 : 0);
}

/* Update Leaflet popup HTML for a pin */
function updateMarkerPopup(pinId) {
  const pin = getPin(pinId);
  const likes = likeCount(pin);
  const comments = countComments(pin);

  const html = `
    <div>
      <div class="pin-title">${pin.text}</div>
      <div class="pin-meta-line">
        Likes: <span id="like-count-${pin.id}">${likes}</span> ·
        Comments: <span id="comment-count-${pin.id}">${comments}</span>
      </div>
      <div class="pin-actions">
        <button onclick="handleLikePin('${pin.id}', event)">
          ${pin.liked ? "Unlike" : "Like"}
        </button>
        <button onclick="openCommentsOverlay('${pin.id}')">
          Comments
        </button>
      </div>
    </div>
  `;

  markers[pin.id].bindPopup(html);
}

/* -----------------------------
   Pin like handler
----------------------------- */

function handleLikePin(pinId, ev) {
  if (ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  const pin = getPin(pinId);
  pin.liked = !pin.liked; // toggle

  updateMarkerPopup(pinId);
  markers[pinId].openPopup(); // keep it open
}

/* -----------------------------
   Comments overlay logic
----------------------------- */

const overlay = document.getElementById("overlay");
const commentsListEl = document.getElementById("commentsList");
const commentsPinTextEl = document.getElementById("comments-pin-text");
const commentsMetaEl = document.getElementById("comments-meta");
const newCommentInput = document.getElementById("newCommentInput");
const postCommentBtn = document.getElementById("postCommentBtn");
const closeOverlayBtn = document.getElementById("closeOverlayBtn");

// profile card refs
const profileCard = document.getElementById("profileCard");
const profileAvatar = document.getElementById("profileAvatar");
const profileName = document.getElementById("profileName");
const profileBio = document.getElementById("profileBio");

function openCommentsOverlay(pinId) {
  activePinId = pinId;
  const pin = getPin(pinId);

  commentsPinTextEl.textContent = pin.text;
  commentsMetaEl.textContent = `Likes: ${likeCount(pin)} · Comments: ${countComments(
    pin
  )}`;

  newCommentInput.value = "";
  hideProfile();
  renderComments();
  overlay.classList.add("show");
}

function closeCommentsOverlay() {
  overlay.classList.remove("show");
  activePinId = null;
}

closeOverlayBtn.addEventListener("click", closeCommentsOverlay);

overlay.addEventListener("click", (e) => {
  // click outside the modal closes it
  if (e.target === overlay) {
    closeCommentsOverlay();
  }
});

postCommentBtn.addEventListener("click", () => {
  const text = newCommentInput.value.trim();
  if (!text || !activePinId) return;

  const pin = getPin(activePinId);
  pin.comments.push({
    id: "c" + Date.now(),
    userId: currentUserId,
    text,
    baseReactions: {},
    myReactions: {}
  });

  newCommentInput.value = "";
  renderComments();
  updateOverlayCounts();
  updateMarkerPopup(activePinId);
  markers[activePinId].openPopup();
});

newCommentInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    postCommentBtn.click();
  }
});

/* Render comments for currently active pin */
function renderComments() {
  commentsListEl.innerHTML = "";
  if (!activePinId) return;

  const pin = getPin(activePinId);

  pin.comments.forEach((c, index) => {
    const user = users[c.userId] || users["you"];

    // compute reaction counts visible to user
    const counts = {};
    reactionOptions.forEach((e) => (counts[e] = c.baseReactions[e] || 0));
    // add "your" reactions if present
    reactionOptions.forEach((e) => {
      if (c.myReactions && c.myReactions[e]) counts[e] += 1;
    });

    const card = document.createElement("div");
    card.className = "comment-card";

    const avatarDiv = document.createElement("div");
    avatarDiv.className = "comment-avatar";
    avatarDiv.textContent = user.avatar;
    avatarDiv.onclick = () => showProfile(c.userId);

    const mainDiv = document.createElement("div");
    mainDiv.className = "comment-main";

    const headerLine = document.createElement("div");
    headerLine.className = "comment-header-line";

    const userName = document.createElement("div");
    userName.className = "comment-user";
    userName.textContent = user.name;
    userName.onclick = () => showProfile(c.userId);

    const time = document.createElement("div");
    time.className = "comment-time";
    time.textContent = "just now";

    headerLine.appendChild(userName);
    headerLine.appendChild(time);

    const textDiv = document.createElement("div");
    textDiv.className = "comment-text";
    textDiv.textContent = c.text;

    const actionsRow = document.createElement("div");
    actionsRow.className = "comment-actions-row";

    const reactionsRow = document.createElement("div");
    reactionsRow.className = "reactions-row";

    reactionOptions.forEach((emoji) => {
      const pill = document.createElement("span");
      pill.className = "reaction-pill";
      const active = c.myReactions && c.myReactions[emoji];
      if (active) pill.classList.add("active");
      pill.textContent = `${emoji} ${counts[emoji]}`;
      pill.onclick = () => toggleReaction(index, emoji);
      reactionsRow.appendChild(pill);
    });

    const replyBtn = document.createElement("button");
    replyBtn.className = "reply-button";
    replyBtn.textContent = "Reply";
    replyBtn.onclick = () => {
      newCommentInput.value = `@${user.name} ` + newCommentInput.value;
      newCommentInput.focus();
    };

    actionsRow.appendChild(reactionsRow);
    actionsRow.appendChild(replyBtn);

    mainDiv.appendChild(headerLine);
    mainDiv.appendChild(textDiv);
    mainDiv.appendChild(actionsRow);

    card.appendChild(avatarDiv);
    card.appendChild(mainDiv);

    commentsListEl.appendChild(card);
  });

  updateOverlayCounts();
}

/* Toggle reaction for current user on a specific comment & emoji */
function toggleReaction(commentIndex, emoji) {
  if (!activePinId) return;
  const pin = getPin(activePinId);
  const comment = pin.comments[commentIndex];

  if (!comment.myReactions) {
    comment.myReactions = {};
  }

  // if emoji already chosen, remove it (double-click behavior)
  if (comment.myReactions[emoji]) {
    delete comment.myReactions[emoji];
  } else {
    comment.myReactions[emoji] = true;
  }

  renderComments();
}

/* Update counts in overlay header + marker popup */
function updateOverlayCounts() {
  if (!activePinId) return;
  const pin = getPin(activePinId);
  commentsMetaEl.textContent = `Likes: ${likeCount(
    pin
  )} · Comments: ${countComments(pin)}`;
  updateMarkerPopup(activePinId);
}

/* -----------------------------
   Profile mini-card
----------------------------- */

function showProfile(userId) {
  const user = users[userId] || users["you"];
  profileAvatar.textContent = user.avatar;
  profileName.textContent = user.name;
  profileBio.textContent = user.bio;
  profileCard.classList.add("show");
}

function hideProfile() {
  profileCard.classList.remove("show");
}