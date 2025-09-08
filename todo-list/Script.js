// ====== Array to store tasks ======
// Each task is an object { text: "Task name", completed: false }
let tasks = [];

/**
 * Add new task to the list
 */
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  // If input is empty, show alert
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Push new task object into array
  tasks.push({ text: taskText, completed: false });

  // Clear input field
  taskInput.value = "";

  // Render updated tasks
  renderTasks();
}

/**
 * Toggle task status (completed <-> pending)
 * @param {number} index - position of the task in array
 */
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

/**
 * Delete a task from the list
 * @param {number} index - position of the task in array
 */
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

/**
 * Render tasks on UI
 * Applies search and filter options
 */
function renderTasks() {
  const list = document.getElementById("taskList");
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const filter = document.getElementById("filterSelect").value;

  // Clear previous list
  list.innerHTML = "";

  // Filter tasks based on search + filter type
  tasks
    .filter(task => task.text.toLowerCase().includes(searchText))
    .filter(task => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true; // show all
    })
    .forEach((task, index) => {
      // Create <li> element
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      // Add task text + action buttons
      li.innerHTML = `
        <span>${task.text}</span>
        <div class="actions">
          <button class="complete-btn" onclick="toggleTask(${index})">
            ${task.completed ? "Undo" : "Done"}
          </button>
          <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        </div>
      `;

      // Append <li> to <ul>
      list.appendChild(li);
    });
}
