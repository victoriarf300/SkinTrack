// ---------------- AUTH ----------------

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");

const authSection = document.getElementById("auth-section");
const appSection = document.getElementById("app-section");
const userEmail = document.getElementById("user-email");
const authMessage = document.getElementById("auth-message");

// Get current logged in user
function getCurrentUser() {
  return localStorage.getItem("skintrackCurrentUser");
}

// Get storage key for current user's routines
function getUserRoutineKey() {
  const currentUser = getCurrentUser();
  return currentUser ? `skintrack_${currentUser}` : "skintrack";
}

// Sign up
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!email || !password) {
    authMessage.textContent = "Please enter an email and password.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("skintrackUsers")) || [];

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    authMessage.textContent = "That account already exists.";
    return;
  }

  users.push({ email, password });
  localStorage.setItem("skintrackUsers", JSON.stringify(users));

  authMessage.textContent = "Account created. You can now log in.";
  signupForm.reset();
});

// Log in
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const users = JSON.parse(localStorage.getItem("skintrackUsers")) || [];
  const matchedUser = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!matchedUser) {
    authMessage.textContent = "Invalid email or password.";
    return;
  }

  localStorage.setItem("skintrackLoggedIn", "true");
  localStorage.setItem("skintrackCurrentUser", email);

  authMessage.textContent = "";
  loginForm.reset();

  loadUserRoutines();
  showApp();
});

// Log out
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("skintrackLoggedIn");
  localStorage.removeItem("skintrackCurrentUser");
  routines = [];
  showAuth();
});

// Check login state
function checkAuth() {
  const loggedIn = localStorage.getItem("skintrackLoggedIn");

  if (loggedIn === "true" && getCurrentUser()) {
    loadUserRoutines();
    showApp();
  } else {
    showAuth();
  }
}

function showApp() {
  authSection.classList.add("hidden");
  appSection.classList.remove("hidden");
  userEmail.textContent = `Logged in as: ${getCurrentUser()}`;
  renderSteps();
}

function showAuth() {
  authSection.classList.remove("hidden");
  appSection.classList.add("hidden");
  userEmail.textContent = "";
}

// ---------------- SKINTRACK ROUTINES ----------------

// Load saved routines from localStorage or start empty
let routines = [];

function loadUserRoutines() {
  try {
    const saved = localStorage.getItem(getUserRoutineKey());
    routines = saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    routines = [];
  }
}

// Save data to localStorage
function saveData() {
  localStorage.setItem(getUserRoutineKey(), JSON.stringify(routines));
}

// Add a new skincare step
function addStep() {
  const input = document.getElementById("stepInput");
  const routineType = document.getElementById("routineSelect").value;

  if (input.value.trim() === "") return;

  const step = {
    id: Date.now(),
    name: input.value.trim(),
    routine: routineType,
    completed: false,
  };

  routines.push(step);

  saveData();
  renderSteps();

  input.value = "";
}

// Toggle completed status
function toggleComplete(id) {
  routines = routines.map((step) => {
    if (step.id === id) {
      step.completed = !step.completed;
    }
    return step;
  });

  saveData();
  renderSteps();
}

// Delete a skincare step
function deleteStep(id) {
  routines = routines.filter((step) => step.id !== id);

  saveData();
  renderSteps();
}

// Edit a skincare step
function editStep(id) {
  const step = routines.find((step) => step.id === id);
  if (step) {
    const newName = prompt("Edit step name:", step.name);
    if (newName && newName.trim() !== "") {
      step.name = newName.trim();
      saveData();
      renderSteps();
    }
  }
}

// Render routine lists
function renderSteps() {
  const morningList = document.getElementById("morningList");
  const nightList = document.getElementById("nightList");

  if (!morningList || !nightList) return;

  morningList.innerHTML = "";
  nightList.innerHTML = "";

  routines.forEach((step) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span style="text-decoration:${step.completed ? "line-through" : "none"}">
        ${step.name}
      </span>

      <div class="actions">
        <button onclick="toggleComplete(${step.id})">✓</button>
        <button onclick="editStep(${step.id})">Edit</button>
        <button onclick="deleteStep(${step.id})">X</button>
      </div>
    `;

    if (step.routine === "morning") {
      morningList.appendChild(li);
    } else {
      nightList.appendChild(li);
    }
  });
}

// ---------------- LOAD + DARK MODE ----------------

document.addEventListener("DOMContentLoaded", () => {
  checkAuth();

  const toggleBtn = document.getElementById("dark-mode-toggle");

  // Load saved dark mode
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }

  // Toggle dark mode
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("darkMode", isDark);
    });
  }
});
