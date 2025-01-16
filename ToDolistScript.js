// Select DOM elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task function
function addTask() {
    const taskText = taskInput.value.trim(); // Get input and trim spaces
    if (taskText !== '') {
        // Create a new list item (li)
        const li = document.createElement('li');
        li.classList.add('todo-item'); // Add the todo-item class for correct styling

        // Create a span for the task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', removeTask);

        // Append the task text and delete button to the list item
        li.appendChild(taskSpan);
        li.appendChild(deleteButton);

        // Append the list item to the task list (ul)
        taskList.appendChild(li);

        // Clear the input field after adding
        taskInput.value = '';
    }
}

// Remove task function
function removeTask(event) {
    const taskItem = event.target.parentElement; // Get the parent li
    taskList.removeChild(taskItem); // Remove the li from the ul
}

// Mark task as completed by toggling the class
taskList.addEventListener('click', function(event) {
    if (event.target.tagName === 'SPAN') {
        event.target.parentElement.classList.toggle('completed');
    }
});

// Save tasks to local storage
function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push({ text: task, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Remove task from local storage
function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t.text !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task completion in local storage
function updateTaskCompletion(taskElement) {
    const taskText = taskElement.querySelector('span').textContent;
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="removeTask(this)">Remove</button>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.addEventListener('click', markCompleted);
        taskList.appendChild(li);
    });
}
