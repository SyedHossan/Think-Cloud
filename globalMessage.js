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

// Load chat threads
function loadChatThreads() {
  try {
    return JSON.parse(localStorage.getItem("tc_conversations")) || [];
  } catch {
    return [];
  }
}

let chatThreads = loadChatThreads();

function saveChatThreads() {
  localStorage.setItem("tc_conversations", JSON.stringify(chatThreads));
}

// OPEN modal
function openMessageComposer(userId) {
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

  const thread = chatThreads.find(t => t.userId === activeMsgUserId);
  if (!thread) return;

  thread.messages.forEach(m => renderMsgBubble(m));

  msgThread.scrollTop = msgThread.scrollHeight;
}

// Render a bubble
function renderMsgBubble(msg) {
  const row = document.createElement("div");
  row.className = "msg-row-out";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble-out";
  bubble.textContent = msg.text;

  // time
  const time = document.createElement("div");
  time.className = "msg-time";
  time.textContent = new Date(msg.ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  bubble.appendChild(time);

  // delete button
  const menuBtn = document.createElement("button");
  menuBtn.className = "msg-menu-btn";
  menuBtn.textContent = "⋮";

  const menuBox = document.createElement("div");
  menuBox.className = "msg-menu hidden";

  const delBtn = document.createElement("button");
  delBtn.className = "msg-menu-delete";
  delBtn.textContent = "Delete";

  delBtn.addEventListener("click", () => {
    if (confirm("Delete this message?")) {
      deleteMessage(msg.id, activeMsgUserId);
      row.remove();
    }
  });

  menuBox.appendChild(delBtn);

  menuBtn.addEventListener("click", () => {
    menuBox.classList.toggle("hidden");
  });

  row.appendChild(menuBtn);
  row.appendChild(menuBox);
  row.appendChild(bubble);

  msgThread.appendChild(row);
}

// Save a message
function sendMessage() {
  const text = msgInput.value.trim();
  if (!text) return;

  const id = "m" + Date.now();
  const now = Date.now();

  let thread = chatThreads.find(t => t.userId === activeMsgUserId);
  if (!thread) {
    thread = {
      userId: activeMsgUserId,
      messages: []
    };
    chatThreads.push(thread);
  }

  thread.messages.push({
    id,
    text,
    ts: now,
    senderId: "you"
  });

  saveChatThreads();

  renderMsgBubble({ id, text, ts: now });
  msgInput.value = "";
  msgSendBtn.disabled = true;
  msgThread.scrollTop = msgThread.scrollHeight;
}

msgSendBtn.addEventListener("click", sendMessage);

// Delete message from storage
function deleteMessage(msgId, userId) {
  const t = chatThreads.find(t => t.userId === userId);
  if (!t) return;

  t.messages = t.messages.filter(m => m.id !== msgId);

  saveChatThreads();
}

// MAKE FUNCTION GLOBAL
window.openMessageComposer = openMessageComposer;




