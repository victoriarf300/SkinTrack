let routines = JSON.parse(localStorage.getItem("skintrack")) || []

function saveData() {
  localStorage.setItem("skintrack", JSON.stringify(routines))
}

function addStep() {

  const input = document.getElementById("stepInput")
  const routine = document.getElementById("routineSelect").value

  if (input.value === "") return

  const step = {
    id: Date.now(),
    name: input.value,
    routine: routine,
    completed: false
  }

  routines.push(step)

  saveData()
  renderSteps()

  input.value = ""
}

function toggleComplete(id) {

  routines = routines.map(step => {
    if (step.id === id) {
      step.completed = !step.completed
    }
    return step
  })

  saveData()
  renderSteps()
}

function deleteStep(id) {

  routines = routines.filter(step => step.id !== id)

  saveData()
  renderSteps()
}

function renderSteps() {

  const morningList = document.getElementById("morningList")
  const nightList = document.getElementById("nightList")

  morningList.innerHTML = ""
  nightList.innerHTML = ""

  routines.forEach(step => {

    const li = document.createElement("li")

    li.innerHTML = `
      <span style="text-decoration:${step.completed ? "line-through" : "none"}">
      ${step.name}
      </span>
      <button onclick="toggleComplete(${step.id})">✓</button>
      <button onclick="deleteStep(${step.id})">X</button>
    `

    if (step.routine === "morning") {
      morningList.appendChild(li)
    } else {
      nightList.appendChild(li)
    }

  })
}

renderSteps()