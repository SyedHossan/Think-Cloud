/* -----------------------------
   Data model
----------------------------- */

const currentUserId = "you";

const users = {
    u1: {
  name: "Noah",
  avatar: "🌿",
  bio: "CS junior in UV3 who loves coffee chats and late-night LeetCode.",
  status: "current",
  year: "Junior (BS)"
},
u2: {
  name: "Maya",
  avatar: "🌸",
  bio: "Atec & UX student who sketches app ideas and grows too many plants.",
  status: "current",
  year: "Senior (BS)"
},
u3: {
  name: "Leo",
  avatar: "🦊",
  bio: "Night-owl who lives in Phase 8 and always knows when free food drops.",
  status: "alumni",
  year: "Alumni"
},
u4: {
  name: "Sana",
  avatar: "🌙",
  bio: "Data science major joining ECSW soon.",
  status: "incoming",
  year: "Incoming Freshman"
},
u5: {
  name: "Ray",
  avatar: "🌊",
  bio: "Gym regular & intramural champ, usually at Rec or on the courts.",
  status: "prospective",
  year: "Admitted Fall 2025"
},
you: {
  name: "You",
  avatar: "⭐️",
  bio: "The cloud thinker behind this account.",
  status: "current",
  year: "Sophomore (BS)"
}

};

const reactionOptions = ["👍", "❤️", "😂", "😮", "👎"];


const CONNECTIONS_STORAGE_KEY = "tc_connections";
const CHAT_THREADS_STORAGE_KEY = "tc_conversations";

function loadConnectionsFromStorage() {
  try {
    const raw = localStorage.getItem(CONNECTIONS_STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

const connectedUsers = loadConnectionsFromStorage();

function persistConnections() {
  try {
    localStorage.setItem(
      CONNECTIONS_STORAGE_KEY,
      JSON.stringify(Array.from(connectedUsers))
    );
  } catch {
    // ignore storage errors
  }
}

function loadChatThreads() {
  try {
    const raw = localStorage.getItem(CHAT_THREADS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}




function persistChatThreads() {
  try {
    localStorage.setItem(
      CHAT_THREADS_STORAGE_KEY,
      JSON.stringify(chatThreads)
    );
  } catch {
    // ignore storage errors
  }
}

function upsertChatThread({ userId, name, avatar, message }) {
  if (!userId || !message) return;
  const now = Date.now();
  let thread = chatThreads.find((t) => t.userId === userId);
  if (!thread) {
    thread = {
      userId,
      name,
      avatar,
      lastMessage: "",
      updatedAt: now,
      messages: []
    };
    chatThreads.push(thread);
  } else {
    if (!thread.name && name) thread.name = name;
    if (!thread.avatar && avatar) thread.avatar = avatar;
    thread.messages = thread.messages || [];
  }

  thread.messages.push({
    id: `m${now}`,
    text: message,
    senderId: currentUserId,
    ts: now
  });

  thread.lastMessage = message.slice(0, 160);
  thread.updatedAt = now;
  chatThreads.sort((a, b) => b.updatedAt - a.updatedAt);
  persistChatThreads();
}

// Load user-created pins from storage
const savedUserPins = JSON.parse(localStorage.getItem("userClouds") || "[]");

// Hardcoded pins around UTD
let pins = [
  ...savedUserPins,
  {
    id: "pin1",
    lat: 32.984746,
    lng: -96.752568,
    userId: "u1",
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
    userId: "u4",
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
    userId: "u3",
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
    userId: "u2",
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
    userId: "u5",
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
    userId: "u2",
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
    userId: "u3",
    text: "Anyone free for a quick walk around campus?",
    baseLikes: 6,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "u3",
        text: "I need a break from coding, I’m in.",
        baseReactions: { "👍": 5, "❤️": 3, "😂": 0, "😮": 0, "👎": 0 },
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
    userId: "u4",
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
    userId: "u2",
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
    userId: "u1",
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
    userId: "u3",
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
let addPinMode = false;
let pendingPinLatLng = null;
let draftPinMarker = null;
let activeProfileUserId = null;
let activeMessageUserId = null;

/* -----------------------------
   Map setup
----------------------------- */

const map = L.map("map").setView([32.985, -96.752], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

function getStatusColor(userId) {

  if (userId === "you") {
    return "#406fddff";  
  }

  const status = (users[userId] && users[userId].status) || "current";

  const darkColors = {
  current: "#5acd2dff",      // Strong Blue
  incoming: "#b861dbff",     // Vivid Yellow
  alumni: "#db571eff",       // Sharp Golden Orange
  prospective: "#f0de39ff", 
  };

  return darkColors[status] || "#374151"; // dark gray fallback
}



function createMarkerForPin(pin) {
  const color = getStatusColor(pin.userId);


const iconHtml = `
  <div style="
    position: relative;
    width: 44px;
    height: 40px;
    transform: translate(-12px,-26px);
  ">

    <!-- Left puff -->
    <div style="
      position:absolute;
      width: 26px;
      height: 26px;
      background:${color};
      border-radius:50%;
      top: 4px;
      left: 0px;
      filter: drop-shadow(0px 2px 3px rgba(0,0,0,0.25));
    "></div>

    <!-- Center puff (bigger) -->
    <div style="
      position:absolute;
      width: 30px;
      height: 30px;
      background:${color};
      border-radius:50%;
      top: 0px;
      left: 10px;
      filter: drop-shadow(0px 2px 3px rgba(0,0,0,0.25));
    "></div>

    <!-- Right puff -->
    <div style="
      position:absolute;
      width: 26px;
      height: 26px;
      background:${color};
      border-radius:50%;
      top: 6px;
      left: 22px;
      filter: drop-shadow(0px 2px 3px rgba(0,0,0,0.25));
    "></div>

    <!-- Pointer -->
    <div style="
      position:absolute;
      width:0;
      height:0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 14px solid ${color};
      left: 12px;
      top: 26px;
      filter: drop-shadow(0px 2px 3px rgba(0,0,0,0.25));
    "></div>

  </div>
`;

  const customIcon = L.divIcon({
    html: iconHtml,
    iconSize: [40, 40],
    className: "status-pin"
  });

  const marker = L.marker([pin.lat, pin.lng], { icon: customIcon }).addTo(map);
  markers[pin.id] = marker;
  updateMarkerPopup(pin.id);
  return marker;
}


// Create all markers
pins.forEach((pin) => {
  if (!markers[pin.id]) {
    createMarkerForPin(pin);
  }
});

/* -----------------------------
   Add pin flow
----------------------------- */

const addPinBtn = document.getElementById("addPinBtn");
const addPinPanel = document.getElementById("addPinPanel");
const cancelAddPinBtn = document.getElementById("cancelAddPinBtn");
const addPinTextInput = document.getElementById("addPinText");
const addPinCoordsEl = document.getElementById("addPinCoords");
const addPinHintEl = document.getElementById("addPinHint");
const savePinBtn = document.getElementById("savePinBtn");

if (
  addPinBtn &&
  addPinPanel &&
  addPinTextInput &&
  addPinCoordsEl &&
  addPinHintEl &&
  savePinBtn
) {
  const mapContainer = map.getContainer();

  function resetAddPinForm() {
    pendingPinLatLng = null;
    addPinCoordsEl.textContent = "No location selected yet.";
    savePinBtn.disabled = true;
    addPinTextInput.value = "";
    if (draftPinMarker) {
      map.removeLayer(draftPinMarker);
      draftPinMarker = null;
    }
  }

  function enterAddPinMode() {
  addPinMode = true;
  addPinBtn.classList.add("active");
  addPinPanel.classList.add("show");
  addPinHintEl.textContent = "Select location: Tap anywhere on the map to drop your thought.";
  resetAddPinForm();
  map.getContainer().classList.add("add-pin-cursor");
  addPinTextInput.focus();

  //  HIDE + BUTTON
  addPinBtn.style.display = "none";
}

function exitAddPinMode() {
  addPinMode = false;
  addPinBtn.classList.remove("active");
  addPinPanel.classList.remove("show");
  addPinHintEl.textContent = "Tap anywhere on the map to pick a spot.";
  resetAddPinForm();
  map.getContainer().classList.remove("add-pin-cursor");

  // SHOW + BUTTON AGAIN
  addPinBtn.style.display = "flex";
}


  addPinBtn.addEventListener("click", () => {
    if (addPinMode) {
      exitAddPinMode();
    } else {
      enterAddPinMode();
    }


  });

  if (cancelAddPinBtn) {
    cancelAddPinBtn.addEventListener("click", exitAddPinMode);
  }

  addPinTextInput.addEventListener("input", () => {
    const hasText = addPinTextInput.value.trim().length > 0;
    savePinBtn.disabled = !(hasText && pendingPinLatLng);
  });

  map.on("click", (e) => {
    if (!addPinMode) return;
    pendingPinLatLng = e.latlng;
    addPinCoordsEl.textContent = `Selected: ${e.latlng.lat.toFixed(
      5
    )}, ${e.latlng.lng.toFixed(5)}`;
    if (draftPinMarker) {
      map.removeLayer(draftPinMarker);
    }
    draftPinMarker = L.marker(e.latlng, { opacity: 0.6 }).addTo(map);
    savePinBtn.disabled = !(addPinTextInput.value.trim() && pendingPinLatLng);
  });

  savePinBtn.addEventListener("click", () => {
    const text = addPinTextInput.value.trim();
    if (!text || !pendingPinLatLng) return;

    const newPin = {
      id: `pin${Date.now()}`,
      lat: pendingPinLatLng.lat,
      lng: pendingPinLatLng.lng,
      userId: currentUserId,
      text,
      baseLikes: 0,
      liked: false,
      comments: []
    };

    pins.unshift(newPin);
    createMarkerForPin(newPin);
    markers[newPin.id].openPopup();
    localStorage.setItem("userClouds", JSON.stringify(pins.filter(p => p.userId === currentUserId)));
    exitAddPinMode();
  });
}

/* -----------------------------
   Status Filter Logic
----------------------------- */

const filterBtn = document.getElementById("filterBtn");
const filterPanel = document.getElementById("filterPanel");
const closeFilterBtn = document.getElementById("closeFilterBtn");

const filterCheckboxes = document.querySelectorAll(".status-filter");

// Toggle filter panel open/close
filterBtn.addEventListener("click", () => {
  filterPanel.style.display =
    filterPanel.style.display === "block" ? "none" : "block";
});

closeFilterBtn.addEventListener("click", () => {
  filterPanel.style.display = "none";
  applyStatusFilter();
});

// Apply filtering to markers
function applyStatusFilter() {
  const enabledStatuses = Array.from(filterCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  pins.forEach(pin => {
    const user = users[pin.userId] || { status: "current" };
    const status = user.status;

    const marker = markers[pin.id];
    if (!marker) return;

    if (enabledStatuses.includes(status)) {
      marker.addTo(map);
    } else {
      map.removeLayer(marker);
    }
  });
}


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
  const authorId = pin.userId || "you";
  const author = users[authorId] || users["you"];

  const html = `
    <div>
      <div class="pin-title">${pin.text}</div>

      <div class="pin-author">
        Posted by
        <button class="pin-author-button" onclick="showProfile('${authorId}')">
          ${author.name}
        </button>
      </div>

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

        <button onclick="showProfile('${authorId}')">
          View Profile
        </button>

        ${
          pin.userId === currentUserId
            ? `<button class="delete-pin-btn" onclick="deletePin('${pin.id}', event)">
                 Delete
               </button>`
            : ""
        }
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
Delete Pin handler
-----------------------------*/
function deletePin(pinId, ev) {
  if (ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  if (!confirm("Delete this thought cloud?")) return;

  // Remove pin from array
  pins = pins.filter(p => p.id !== pinId);

  // Remove marker from map
  if (markers[pinId]) {
    map.removeLayer(markers[pinId]);
    delete markers[pinId];
  }

  // Update localStorage only with user's own pins
  const myPins = pins.filter(p => p.userId === currentUserId);
  localStorage.setItem("userClouds", JSON.stringify(myPins));

  alert("Thought cloud deleted!");
}


/* -----------------------------
   Comments overlay logic
----------------------------- */

const overlay = document.getElementById("overlay");
const commentsListEl = document.getElementById("commentsList");
const commentsPinTextEl = document.getElementById("comments-pin-text");
const commentsMetaEl = document.getElementById("comments-meta");
const commentsAuthorEl = document.getElementById("comments-author");
const newCommentInput = document.getElementById("newCommentInput");
const postCommentBtn = document.getElementById("postCommentBtn");
const closeOverlayBtn = document.getElementById("closeOverlayBtn");

// profile card refs
const profileCard = document.getElementById("profileCard");
const profileAvatar = document.getElementById("profileAvatar");
const profileName = document.getElementById("profileName");
const profileBio = document.getElementById("profileBio");
const profileYear = document.getElementById("profileYear"); 
const profileConnectBtn = document.getElementById("profileConnectBtn");
const profileMessageBtn = document.getElementById("profileMessageBtn");

// -----------------------------
// Profile open / close
// -----------------------------
function showProfile(userId) {
  activeProfileUserId = userId;
  const u = users[userId];
  if (!u) return;

  // Fill in content
  profileAvatar.textContent = u.avatar;
  profileName.textContent = u.name;
  profileBio.textContent = u.bio;
  profileYear.textContent = u.year;

  // Connect button state
  if (connectedUsers.has(userId)) {
    profileConnectBtn.textContent = "Connected";
    profileConnectBtn.disabled = true;
  } else {
    profileConnectBtn.textContent = "Connect";
    profileConnectBtn.disabled = false;
  }

  // Show card
  profileCard.classList.add("show");

  // Optional: close comments if open
  overlay.classList.remove("show");
}

function hideProfile() {
  profileCard.classList.remove("show");
}



function openCommentsOverlay(pinId) {
  activePinId = pinId;
  const pin = getPin(pinId);

  commentsPinTextEl.textContent = pin.text;
  commentsMetaEl.textContent = `Likes: ${likeCount(pin)} | Comments: ${countComments(
    pin
  )}`;
  if (commentsAuthorEl) {
    const authorId = pin.userId || "you";
    const author = users[authorId] || users["you"];
    commentsAuthorEl.textContent = `Posted by ${author.name}`;
    commentsAuthorEl.onclick = () => showProfile(authorId);
  }

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
  commentsMetaEl.textContent = `Likes: ${likeCount(pin)} | Comments: ${countComments(pin)}`;
  updateMarkerPopup(activePinId);
}

// When clicking "Message" inside profile card
if (profileMessageBtn) {
  profileMessageBtn.onclick = () => {
    openMiniMessage(activeProfileUserId);   // use the small modal on map
  };
}

// Making functions available to inline HTML + Leaflet popups
window.showProfile = showProfile;
window.hideProfile = hideProfile;
window.openCommentsOverlay = openCommentsOverlay;
window.closeCommentsOverlay = closeCommentsOverlay;




