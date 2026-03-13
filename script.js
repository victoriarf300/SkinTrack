// Load saved routines from localStorage or start empty
let routines = [];
try {
  const saved = localStorage.getItem("skintrack");
  if (saved) {
    routines = JSON.parse(saved);
  }
} catch (error) {
  console.error("Error loading data from localStorage:", error);
  routines = [];
}

// Save data to localStorage
function saveData() {
  localStorage.setItem("skintrack", JSON.stringify(routines));
}

// Add a new skincare step
function addStep() {
  const input = document.getElementById("stepInput");
  const routineType = document.getElementById("routineSelect").value;

  if (input.value.trim() === "") return;

  const step = {
    id: Date.now(),
    name: input.value,
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

// Load steps when page opens
document.addEventListener("DOMContentLoaded", () => {
  renderSteps();
});
