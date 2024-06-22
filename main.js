document.addEventListener("DOMContentLoaded", function () {
  // Get the elements
  const taskList = document.getElementById("task-list");
  const addButton = document.getElementById("add-button");
  const taskInput = document.getElementById("task-input");

  loadTasks;

  // Add a new task event
  addButton.addEventListener("click", function () {
    // Get the task text
    const taskText = taskInput.value.trim();

    // Check if the task text is empty
    if (taskText === "") {
      return;
    } else {
      // Add the task
      addTask(taskText);
    }
    // Clear the input
    taskInput.value = "";
  });

  // Add a new task function
  function addTask(taskText, save = false) {
    // Create a new div and button
    const newDiv = document.createElement("div");
    const newButton = document.createElement("button");

    // Add the text to the div and button
    newDiv.textContent = taskText;
    newButton.textContent = "x";

    // Create a new task element
    const taskElement = document.createElement("li");

    // Add the class to the li and button
    taskElement.classList.add("task-item");
    newButton.classList.add("remove-btn");

    // Append the div and button to the task element
    taskElement.appendChild(newDiv);
    taskElement.appendChild(newButton);

    // Add the task to the task list
    taskList.appendChild(taskElement);
    if (save) {
      saveTaskToLocalStorage(taskText);
    }
  }
  // Add event listener to the task list
  taskList.addEventListener("click", (event) => {
    // If the clicked element has the remove-task-btn class then remove the task
    if (event.target.classList.contains("remove-btn")) {
      event.target.parentElement.remove();
      removeTaskFromLocalStorage(event.target.previousElementSibling.innerText);
    } else if (event.target.classList.contains("task-item")) {
      // Toggle the completed class on the task item
      event.target.classList.toggle("completed");
      event.target.children[0].classList.toggle("completed-task-txt");
      updateTaskInLocalStorage(
        event.target.children[0].textContent,
        event.target.classList.contains("completed")
      );
    } else if (event.target.parentElement.classList.contains("task-item")) {
      // Toggle the completed class on the task item
      event.target.parentElement.classList.toggle("completed");
      event.target.parentElement.children[0].classList.toggle(
        "completed-task-txt"
      );
      updateTaskInLocalStorage(
        event.target.parentElement.children[0].textContent,
        event.target.parentElement.classList.contains("completed")
      );
    }
  });
  function saveTaskToLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      addTask(task.text);
      if (task.completed) {
        // Mark the task as completed
        const lastAddedTask = taskList.lastElementChild;
        lastAddedTask.classList.add("completed");
        lastAddedTask.children[0].classList.add("completed-task-txt");
      }
    });
  }
});
