/* -----------------------------
   Data model
----------------------------- */

const currentUserId = "you";

const users = {
  you: {
    name: "Anya Patel",
    avatar: "??",
    bio: "Incoming UTD CS freshman from India, nervous-excited about moving to Dallas.",
    status: "incoming",
    year: "Freshman (BS)"
  },
  "manya-prakash": {
    name: "Manya Prakash",
    avatar: "MP",
    bio: "UTD CS junior organizing hackathon coffee chats.",
    status: "current",
    year: "Junior (BS)"
  },
  "arya-jonnadula": {
    name: "Arya Jonnadula",
    avatar: "AJ",
    bio: "Incoming UT Austin biology major searching for study buddies.",
    status: "incoming",
    year: "Freshman (BS)"
  },
  "robert-ly": {
    name: "Robert Ly",
    avatar: "RL",
    bio: "UNT mechanical engineer prototyping DIY electric boards.",
    status: "current",
    year: "Senior (BS)"
  },
  "sam-foster": {
    name: "Sam Foster",
    avatar: "SF",
    bio: "UTD child development alum mentoring new Comets.",
    status: "alumni",
    year: "Alumni"
  },
  "rhea-sharma": {
    name: "Rhea Sharma",
    avatar: "RS",
    bio: "UTD CS senior from Mumbai, happy to mentor incoming Comets like Anya.",
    status: "current",
    year: "Senior (BS)"
  },
  "arjun-mehta": {
    name: "Arjun Mehta",
    avatar: "AM",
    bio: "UTD Data Science grad from Delhi who mentors new CS and DS students.",
    status: "alumni",
    year: "Alumni"
  },
  "priya-iyer": {
    name: "Priya Iyer",
    avatar: "PI",
    bio: "UTD HCI student from Chennai who loves UX research and chai.",
    status: "current",
    year: "Junior (BS)"
  },
  "jordan-lee": {
    name: "Jordan Lee",
    avatar: "JL",
    bio: "UTD business analytics major who loves hosting coffee networking chats.",
    status: "current",
    year: "Senior (BS)"
  },
  "taylor-nguyen": {
    name: "Taylor Nguyen",
    avatar: "TN",
    bio: "UT Austin Design & UX student who loves sketching campus app ideas.",
    status: "current",
    year: "Junior (BS)"
  },
  "emma-cole": {
    name: "Emma Cole",
    avatar: "EC",
    bio: "Prospective UNT nursing student figuring out campus housing and roommates.",
    status: "prospective",
    year: "Admitted Fall 2025"
  },
  "sofia-ramirez": {
    name: "Sofia Ramirez",
    avatar: "SR",
    bio: "UTD mechanical engineering student from Monterrey, Mexico.",
    status: "current",
    year: "Junior (BS)"
  },
  "diego-martinez": {
    name: "Diego Martinez",
    avatar: "DM",
    bio: "Data Science sophomore from Mexico City exploring Dallas taco spots.",
    status: "current",
    year: "Sophomore (BS)"
  },
  "li-wei": {
    name: "Li Wei",
    avatar: "LW",
    bio: "Exchange student from Singapore interested in AI and robotics.",
    status: "incoming",
    year: "Exchange"
  },
  "lucia-garcia": {
    name: "Lucia Garcia",
    avatar: "LG",
    bio: "Prospective psychology student from Spain visiting Texas campuses.",
    status: "prospective",
    year: "Admitted Fall 2025"
  },
  "oliver-king": {
    name: "Oliver King",
    avatar: "OK",
    bio: "Incoming Software Engineering major from Sydney, excited for Texas.",
    status: "incoming",
    year: "Freshman (BS)"
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
    userId: "manya-prakash",
    text: "Anyone want a coffee by UV3?",
    baseLikes: 7,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "manya-prakash",
        text: "I’m headed to Starbucks in JSOM in 10 mins.",
        baseReactions: { "👍": 3, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "arya-jonnadula",
        text: "Can we go to Study Grounds instead? It’s quieter.",
        baseReactions: { "👍": 2, "❤️": 2, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "robert-ly",
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
    userId: "sam-foster",
    text: "CS 2336 study group tonight?",
    baseLikes: 5,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "sam-foster",
        text: "Let’s meet in ECSW 2nd floor booths.",
        baseReactions: { "👍": 3, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "rhea-sharma",
        text: "I can help with linked lists if someone explains AVL trees.",
        baseReactions: { "👍": 2, "❤️": 0, "😂": 1, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "arya-jonnadula",
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
    userId: "robert-ly",
    text: "Free snacks in ECSW lobby!",
    baseLikes: 9,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "robert-ly",
        text: "There are still granola bars + chips.",
        baseReactions: { "👍": 4, "❤️": 1, "😂": 0, "😮": 1, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "manya-prakash",
        text: "Cookies are gone, but drinks left.",
        baseReactions: { "👍": 2, "❤️": 0, "😂": 1, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "rhea-sharma",
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
    userId: "arya-jonnadula",
    text: "Lost AirPods near SU stairs :(",
    baseLikes: 3,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "arya-jonnadula",
        text: "Check the Info Desk, they keep lost items.",
        baseReactions: { "👍": 4, "❤️": 0, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "sam-foster",
        text: "Put a note in other Think Cloud pins around SU.",
        baseReactions: { "👍": 2, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "manya-prakash",
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
    userId: "rhea-sharma",
    text: "Anyone going to the gym at 7?",
    baseLikes: 4,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "rhea-sharma",
        text: "I’m doing legs today if anyone wants a buddy.",
        baseReactions: { "👍": 3, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "robert-ly",
        text: "Can someone show me how to use the squat rack?",
        baseReactions: { "👍": 2, "❤️": 1, "😂": 1, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "sam-foster",
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
    userId: "arjun-mehta",
    text: "Looking for a quiet spot to write essay.",
    baseLikes: 2,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "priya-iyer",
        text: "McDermott 4th floor is usually chill.",
        baseReactions: { "👍": 3, "❤️": 0, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "li-wei",
        text: "ATEC lobby couches are nice too.",
        baseReactions: { "👍": 1, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "jordan-lee",
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
    userId: "priya-iyer",
    text: "Anyone free for a quick walk around campus?",
    baseLikes: 6,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "taylor-nguyen",
        text: "I need a break from coding, I’m in.",
        baseReactions: { "👍": 5, "❤️": 3, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "diego-martinez",
        text: "Let’s do a loop around the plinth.",
        baseReactions: { "👍": 2, "❤️": 0, "😂": 1, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "sofia-ramirez",
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
    userId: "jordan-lee",
    text: "Any recs for good vegetarian food nearby?",
    baseLikes: 8,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "diego-martinez",
        text: "Madurai Mes has great dosas if you can Uber.",
        baseReactions: { "👍": 4, "❤️": 2, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "lucia-garcia",
        text: "SU has decent veggie options if you mix sides.",
        baseReactions: { "👍": 2, "❤️": 0, "😂": 1, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "li-wei",
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
    userId: "taylor-nguyen",
    text: "Anyone working on HCI project today?",
    baseLikes: 3,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "priya-iyer",
        text: "I’m prototyping in Figma in the ATEC labs.",
        baseReactions: { "👍": 2, "❤️": 1, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "manya-prakash",
        text: "We’re doing user interviews at the SU couches.",
        baseReactions: { "👍": 1, "❤️": 0, "😂": 0, "😮": 1, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "jordan-lee",
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
    userId: "emma-cole",
    text: "Anyone selling old textbooks this semester?",
    baseLikes: 4,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "emma-cole",
        text: "I have CS 2336 and Discrete Math books.",
        baseReactions: { "👍": 2, "❤️": 0, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "lucia-garcia",
        text: "I have a slightly cursed copy of DB book with notes.",
        baseReactions: { "👍": 2, "❤️": 0, "😂": 2, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "oliver-king",
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
    userId: "oliver-king",
    text: "Late-night coding session after 10pm?",
    baseLikes: 6,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "sofia-ramirez",
        text: "I’ll be in the ATEC lab until 1am probably.",
        baseReactions: { "👍": 3, "❤️": 0, "😂": 0, "😮": 1, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c2",
        userId: "diego-martinez",
        text: "Bring snacks, I have extra extension cords.",
        baseReactions: { "👍": 2, "❤️": 1, "😂": 1, "😮": 0, "👎": 0 },
        myReactions: {}
      },
      {
        id: "c3",
        userId: "li-wei",
        text: "Lo-fi playlist + silent study pact?",
        baseReactions: { "👍": 2, "❤️": 2, "😂": 0, "😮": 0, "👎": 0 },
        myReactions: {}
      }
    ]
  },
  {
    id: "india1",
    lat: 12.9716,
    lng: 77.5946,
    userId: "u4", // incoming → purple
    text: "Hello from Bangalore 🇮🇳!",
    baseLikes: 3,
    liked: false,
    comments: []
  },
  {
    id: "india2",
    lat: 19.0760,
    lng: 72.8777,
    userId: "u4", // incoming → purple
    text: "Mumbai checking in 🌊",
    baseLikes: 4,
    liked: false,
    comments: []
  },
  {
    id: "india3",
    lat: 13.0827,
    lng: 80.2707,
    userId: "u4", // incoming → purple
    text: "Chennai → UTD ✈️ Anyone else from TN?",
    baseLikes: 2,
    liked: false,
    comments: []
  },
  
  /* ===== USA PINS ===== */
  
  {
    id: "usa1",
    lat: 40.7128,
    lng: -74.0060,
    userId: "u5", // prospective → yellow
    text: "NYC! Anyone visiting during winter break?",
    baseLikes: 5,
    liked: false,
    comments: []
  },
  {
    id: "usa2",
    lat: 34.0522,
    lng: -118.2437,
    userId: "u3", // alumni → orange
    text: "LA sunshine hits different 😎",
    baseLikes: 3,
    liked: false,
    comments: []
  },
  {
    id: "usa3",
    lat: 41.8781,
    lng: -87.6298,
    userId: "u1", // current → green
    text: "Chicago downtown walk anyone? ❄️",
    baseLikes: 1,
    liked: false,
    comments: []
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

const map = L.map("map").setView([20, 0], 3);

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
        <button class="pin-author-button" onclick="goToExploreProfile('${authorId}')">
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

        <button onclick="goToExploreProfile('${authorId}')">
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
    commentsAuthorEl.onclick = () => goToExploreProfile(authorId);
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

function goToExploreProfile(userId) {
  if (!userId) return;
  try {
    localStorage.setItem("highlightProfileId", userId);
  } catch (err) {
    // ignore storage issues
  }
  window.location.href = "explore.html";
}

// Making functions available to inline HTML + Leaflet popups
window.showProfile = showProfile;
window.hideProfile = hideProfile;
window.openCommentsOverlay = openCommentsOverlay;
window.closeCommentsOverlay = closeCommentsOverlay;
window.goToExploreProfile = goToExploreProfile;




