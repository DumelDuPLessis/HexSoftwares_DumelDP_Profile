// Select DOM elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task function
function addTask() {
    const taskText = taskInput.value.trim(); // Get input and trim spaces
    if (taskText !== '') {
        // Create a new task object
        const task = {
            text: taskText,
            completed: false
        };

        // Add the task to the local storage
        saveTaskToLocalStorage(task);

        // Create and display the task in the UI
        createTaskElement(task);

        // Clear the input field after adding
        taskInput.value = '';
    }
}

// Function to create a task element in the UI
function createTaskElement(task) {
    // Create a new list item (li)
    const li = document.createElement('li');
    li.classList.add('todo-item');

    // If the task is marked as completed, apply the completed class
    if (task.completed) {
        li.classList.add('completed');
    }

    // Create a span for the task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        removeTask(task.text);
    });

    // Append the task text and delete button to the list item
    li.appendChild(taskSpan);
    li.appendChild(deleteButton);

    // Append the list item to the task list (ul)
    taskList.appendChild(li);

    // Toggle the completed state on clicking the task
    taskSpan.addEventListener('click', function() {
        li.classList.toggle('completed');
        toggleTaskCompletion(task.text);
    });
}

// Save task to local storage
function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Load tasks from local storage and display them in the UI
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(function(task) {
        createTaskElement(task);
    });
}

// Remove task from local storage and the UI
function removeTask(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Remove the task from the UI
    const taskItems = document.querySelectorAll('.todo-item');
    taskItems.forEach(function(taskItem) {
        if (taskItem.querySelector('span').textContent === taskText) {
            taskItem.remove();
        }
    });
}

// Toggle task completion in local storage
function toggleTaskCompletion(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
