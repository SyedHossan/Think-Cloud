// GLOBAL MESSAGE SYSTEM
let activeMsgUserId = null;

const modal = document.getElementById("globalMessageModal");
const msgAvatar = document.getElementById("msgAvatar");
const msgRecipient = document.getElementById("msgRecipient");
const msgMeta = document.getElementById("msgMeta");
const msgThread = document.getElementById("msgThread");
const msgInput = document.getElementById("msgInput");
const msgSendBtn = document.getElementById("msgSendBtn");
const msgCloseBtn = document.getElementById("msgCloseBtn");

function getCurrentUserProfile() {
  try {
    return JSON.parse(localStorage.getItem("tc_currentUser")) || {};
  } catch {
    return {};
  }
}

function getCurrentUserId(profile) {
  if (profile && profile.userId) return profile.userId;
  if (profile && profile.email) {
    return profile.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }
  return "anya-patel";
}

const miniProfile = getCurrentUserProfile();
const MINI_USER_ID = getCurrentUserId(miniProfile);
const GLOBAL_CONNECTIONS_KEY = "tc_globalConnections_v1";
const GLOBAL_THREADS_KEY = "tc_globalThreads_v1";

// Basic connection guard: only allow messaging with connected users
function loadMiniConnections() {
  try {
    const raw = localStorage.getItem(GLOBAL_CONNECTIONS_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();

    const result = new Set();
    parsed.forEach((conn) => {
      if (!conn || !conn.aId || !conn.bId) return;
      if (conn.aId === MINI_USER_ID) result.add(conn.bId);
      else if (conn.bId === MINI_USER_ID) result.add(conn.aId);
    });
    return result;
  } catch {
    return new Set();
  }
}

const miniConnections = loadMiniConnections();

// Shared global conversation threads (symmetric between users)
function loadGlobalThreads() {
  try {
    const raw = localStorage.getItem(GLOBAL_THREADS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveGlobalThreads() {
  try {
    localStorage.setItem(GLOBAL_THREADS_KEY, JSON.stringify(globalThreads));
  } catch {
    // ignore storage errors in this demo
  }
}

function normalizePair(aId, bId) {
  const pair = [aId, bId].sort();
  return { aId: pair[0], bId: pair[1], key: `${pair[0]}::${pair[1]}` };
}

let globalThreads = loadGlobalThreads();

function getThreadBetween(userA, userB, createIfMissing) {
  if (!userA || !userB) return null;
  const pair = normalizePair(userA, userB);
  let thread = globalThreads.find((t) => t && t.key === pair.key);
  if (!thread && createIfMissing) {
    thread = {
      key: pair.key,
      aId: pair.aId,
      bId: pair.bId,
      updatedAt: 0,
      lastMessage: "",
      messages: []
    };
    globalThreads.push(thread);
  }
  return thread || null;
}

// OPEN modal
function openMessageComposer(userId) {
  if (!miniConnections.has(userId)) {
    if (typeof showToast === "function") {
      showToast("Connect with this user before messaging.", "info");
    }
    return;
  }
  const user = users[userId];

  activeMsgUserId = userId;
  msgAvatar.textContent = user.avatar;
  msgRecipient.textContent = user.name;
  msgMeta.textContent = user.bio;

  msgInput.value = "";
  msgSendBtn.disabled = true;

  loadExistingMessages();

  modal.classList.add("show");
}

// MINI MAP MESSAGE MODAL 
function openMiniMessage(userId) {
  if (!miniConnections.has(userId)) {
    if (typeof showToast === "function") {
      showToast("Connect with this user before messaging.", "info");
    }
    return;
  }
  const user = users[userId];
  activeMsgUserId = userId;

  // Fill in UI
  document.getElementById("msgAvatar").textContent = user.avatar;
  document.getElementById("msgRecipient").textContent = user.name;
  document.getElementById("msgMeta").textContent = user.bio;

  msgInput.value = "";
  msgSendBtn.disabled = true;

  loadExistingMessages();

  // Show mini modal instead of big one
  document.getElementById("globalMessageModal").classList.add("show");
}
window.openMiniMessage = openMiniMessage;


// CLOSE modal
msgCloseBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

// Input listener
msgInput.addEventListener("input", () => {
  msgSendBtn.disabled = msgInput.value.trim().length === 0;
});

// Load old messages
function loadExistingMessages() {
  msgThread.innerHTML = "";

  const thread = getThreadBetween(MINI_USER_ID, activeMsgUserId, false);
  if (!thread) return;

  (thread.messages || []).forEach((m) => renderMsgBubble(m));

  msgThread.scrollTop = msgThread.scrollHeight;
}

// Render a bubble
function renderMsgBubble(msg) {
  const row = document.createElement("div");
  
  // Check if message is from current user or other user
  const isFromMe = msg.senderId === MINI_USER_ID || msg.senderId === "you";
  
  if (isFromMe) {
    // User's own messages - RIGHT SIDE, NO TIME, NO DELETE
    row.className = "mini-msg-row-out";

    const bubble = document.createElement("div");
    bubble.className = "mini-msg-bubble-out";
    bubble.textContent = msg.text;

    row.appendChild(bubble);
  } else {
    // Other user's messages - LEFT SIDE, WITH TIME
    row.className = "mini-msg-row-in";

    const bubble = document.createElement("div");
    bubble.className = "mini-msg-bubble-in";
    bubble.textContent = msg.text;

    const time = document.createElement("div");
    time.className = "mini-msg-time";
    time.textContent = new Date(msg.ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    row.appendChild(bubble);
    row.appendChild(time);
  }

  msgThread.appendChild(row);
}

// Save a message
function sendMessage() {
  const text = msgInput.value.trim();
  if (!text) return;

  const now = Date.now();
  const id = "m" + now;

  const thread = getThreadBetween(MINI_USER_ID, activeMsgUserId, true);
  if (!thread.messages) thread.messages = [];
  thread.messages.push({
    id,
    text,
    ts: now,
    senderId: MINI_USER_ID
  });

  thread.lastMessage = text;
  thread.updatedAt = now;
  saveGlobalThreads();

  renderMsgBubble({ id, text, ts: now, senderId: MINI_USER_ID });
  msgInput.value = "";
  msgSendBtn.disabled = true;
  msgThread.scrollTop = msgThread.scrollHeight;
}

msgSendBtn.addEventListener("click", sendMessage);

// MAKE FUNCTION GLOBAL
window.openMessageComposer = openMessageComposer;
