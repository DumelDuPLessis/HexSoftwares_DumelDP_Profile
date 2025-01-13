// Select DOM elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button onclick="removeTask(this)">Remove</button>
        `;
        li.addEventListener('click', markCompleted);
        taskList.appendChild(li);
        saveTaskToLocalStorage(taskText);
        taskInput.value = '';
    }
}

// Mark task as completed
function markCompleted(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
        updateTaskCompletion(e.target);
    }
}

// Remove task function
function removeTask(button) {
    const taskItem = button.parentElement;
    const taskText = taskItem.querySelector('span').textContent;
    taskItem.remove();
    removeTaskFromLocalStorage(taskText);
}

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
