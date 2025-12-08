// Simple front-end auth + demo user model for Think Cloud
// Stores users in localStorage and exposes helpers for login/signup pages.

(function () {
  const USERS_KEY = "tc_users";
  const CURRENT_USER_KEY = "tc_currentUser";

  const demoUsers = [
    {
      id: "anya-patel",
      firstName: "Anya",
      lastName: "Patel",
      email: "anya.patel@example.com",
      password: "anya123",
      school: "UTD — The University of Texas at Dallas",
      major: "Computer Science",
      status: "Incoming",
      country: "India",
      bio: "Incoming UTD CS freshman from Mumbai, figuring out roommates and coffee spots.",
      homeCity: "Mumbai, India",
      homeLat: 19.0760,
      homeLng: 72.8777,
      allowedRadiusKm: 40,
      isDemo: true
    },
    {
      id: "li-wei",
      firstName: "Li",
      lastName: "Wei",
      email: "li.wei@example.sg",
      password: "liwei123",
      school: "National University of Singapore",
      major: "Computer Engineering",
      status: "Incoming",
      country: "Singapore",
      bio: "Exchange student from Singapore interested in AI and robotics.",
      homeCity: "Singapore",
      homeLat: 1.2966,
      homeLng: 103.7764,
      allowedRadiusKm: 40,
      isDemo: true
    },
    {
      id: "lucia-garcia",
      firstName: "Lucia",
      lastName: "Garcia",
      email: "lucia.garcia@example.es",
      password: "lucia123",
      school: "Complutense University of Madrid",
      major: "Psychology",
      status: "Prospective",
      country: "Spain",
      bio: "Prospective psychology student from Madrid visiting Texas campuses virtually.",
      homeCity: "Madrid, Spain",
      homeLat: 40.4168,
      homeLng: -3.7038,
      allowedRadiusKm: 40,
      isDemo: true
    },
    {
      id: "oliver-king",
      firstName: "Oliver",
      lastName: "King",
      email: "oliver.king@example.au",
      password: "oliver123",
      school: "UNSW Sydney",
      major: "Software Engineering",
      status: "Incoming",
      country: "Australia",
      bio: "Incoming Software Engineering major from Sydney, excited to study in Texas.",
      homeCity: "Sydney, Australia",
      homeLat: -33.8688,
      homeLng: 151.2093,
      allowedRadiusKm: 40,
      isDemo: true
    },
    {
      id: "sofia-ramirez",
      firstName: "Sofia",
      lastName: "Ramirez",
      email: "sofia.ramirez@example.mx",
      password: "sofia123",
      school: "Tecnológico de Monterrey",
      major: "Mechanical Engineering",
      status: "Current",
      country: "Mexico",
      bio: "Mechanical engineering student from Monterrey, curious about UTD life.",
      homeCity: "Monterrey, Mexico",
      homeLat: 25.6866,
      homeLng: -100.3161,
      allowedRadiusKm: 40,
      isDemo: true
    }
  ];

  function normalizeEmail(email) {
    return (email || "").trim().toLowerCase();
  }

  function loadUsers() {
    let users = [];
    try {
      const raw = localStorage.getItem(USERS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          users = parsed;
        }
      }
    } catch {
      users = [];
    }

    // Ensure demo users exist at least once
    const byId = new Map();
    users.forEach((u) => byId.set(u.id, u));
    demoUsers.forEach((demo) => {
      if (!byId.has(demo.id)) {
        users.push(demo);
      }
    });

    saveUsers(users);
    return users;
  }

  function saveUsers(users) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users || []));
    } catch {
      // ignore
    }
  }

  function findUserByEmail(email) {
    const target = normalizeEmail(email);
    if (!target) return null;
    const users = loadUsers();
    return users.find((u) => normalizeEmail(u.email) === target) || null;
  }

  function generateUserId(firstName, lastName, fallbackEmail) {
    const base =
      [firstName, lastName]
        .filter(Boolean)
        .join("-")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") ||
      (fallbackEmail || "cloud-user");

    return base;
  }

  function toCurrentUserPayload(user) {
    if (!user) return null;
    const payload = {
      id: user.id,
      userId: user.id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      school: user.school || "",
      major: user.major || "",
      status: user.status || "",
      country: user.country || "",
      bio: user.bio || "",
      homeCity: user.homeCity || "",
      homeLat: user.homeLat,
      homeLng: user.homeLng,
      allowedRadiusKm: user.allowedRadiusKm || 40,
      isDemo: !!user.isDemo
    };
    return payload;
  }

  function setCurrentUser(user) {
    const payload = toCurrentUserPayload(user);
    if (!payload) return;
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
  }

  function getCurrentUser() {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function initLoginPage() {
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const loginBtn = document.getElementById("loginBtn");
    const errorEl = document.getElementById("loginError");
    const demoList = document.getElementById("demoUserList");

    const users = loadUsers();

    // Prefill last email if available
    const current = getCurrentUser();
    if (current && current.email && emailInput) {
      emailInput.value = current.email;
    }

    function showError(msg) {
      if (errorEl) {
        errorEl.textContent = msg || "";
      }
    }

    function handleLoginClick() {
      if (!emailInput || !passwordInput) return;
      const email = normalizeEmail(emailInput.value);
      const password = passwordInput.value || "";

      showError("");

      if (!email || !password) {
        showError("Enter your email and password to sign in.");
        return;
      }

      const user = users.find((u) => normalizeEmail(u.email) === email);
      if (!user || user.password !== password) {
        showError("We couldn't find an account with that email and password.");
        return;
      }

      setCurrentUser(user);
      window.location.href = "map.html";
    }

    if (loginBtn) {
      loginBtn.addEventListener("click", handleLoginClick);
    }

    if (passwordInput) {
      passwordInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          handleLoginClick();
        }
      });
    }

    // Render demo buttons for quick testing
    if (demoList) {
      demoList.innerHTML = "";
      demoUsers.forEach((user) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "demo-user-btn";
        const locationLabel = user.homeCity || user.country || "";
        btn.textContent = locationLabel
          ? `${user.firstName} (${locationLabel})`
          : user.firstName;

        btn.addEventListener("click", () => {
          setCurrentUser(user);
          window.location.href = "map.html";
        });

        demoList.appendChild(btn);
      });
    }
  }

  function initSignupPage() {
    const form = document.getElementById("signupForm");
    const errorEl = document.getElementById("signupError");

    if (!form) return;

    function showError(msg) {
      if (errorEl) {
        errorEl.textContent = msg || "";
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const firstName = document.getElementById("firstName")?.value.trim() || "";
      const lastName = document.getElementById("lastName")?.value.trim() || "";
      const email = normalizeEmail(
        document.getElementById("email")?.value || ""
      );
      const password =
        document.getElementById("password")?.value.trim() || "";
      const school = document.getElementById("school")?.value.trim() || "";
      const major = document.getElementById("major")?.value.trim() || "";
      const status = document.getElementById("status")?.value || "";
      const country = document.getElementById("country")?.value.trim() || "";
      const bio = document.getElementById("bio")?.value.trim() || "";

      showError("");

      if (!firstName || !lastName || !email || !password) {
        showError("Please fill in your name, email, and password.");
        return;
      }

      if (password.length < 4) {
        showError("Password should be at least 4 characters for this demo.");
        return;
      }

      const users = loadUsers();
      if (users.some((u) => normalizeEmail(u.email) === email)) {
        showError("An account already exists with that email. Try logging in.");
        return;
      }

      const id = generateUserId(firstName, lastName, email);
      const newUser = {
        id,
        firstName,
        lastName,
        email,
        password,
        school,
        major,
        status,
        country,
        bio,
        homeCity: "",
        homeLat: undefined,
        homeLng: undefined,
        allowedRadiusKm: 40,
        isDemo: false
      };

      users.push(newUser);
      saveUsers(users);
      setCurrentUser(newUser);

      window.location.href = "map.html";
    });
  }

  window.Auth = {
    loadUsers,
    saveUsers,
    getCurrentUser,
    setCurrentUser,
    initLoginPage,
    initSignupPage
  };
})();

