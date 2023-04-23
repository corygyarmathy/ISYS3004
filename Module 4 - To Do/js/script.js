function onAddTaskClicked(event) {

    let taskName = newTaskInput.value;
    /* Now clear the text box */
    newTaskInput.value = "";

    /* We have a new 'task', lets insert this into our template. In our template
    we included a "string".  We used a HTML comment so the browser would show
    (render) the string.  The idea is to search for this string in the templae
    and replace it with the 'task' the user typed in.  JavaScript like most
    languages has a string replace function, so this is pretty easy to do. */
    let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);

    /* So the HTML has been update, lets insert the HTML into the DOM tree */
    todoListContainer.insertAdjacentHTML('beforeend', taskHTML);

    // Save the task to local storage
    saveTasks(taskName, false);
}

function onTodolistClicked(event) {
    /* We need to know which element triggered the click event */
    let targetElement = event.target;


    /* Because our list items are being dynamically inserted through JavaScript
    instead of binding the click event handler to each task list item we've
    bound it to their container. When the event is triggered we walk up the DOM
    tree (using the parentElement attribute) until we find the .task element. We
    need to do this because the user could have clicked on the checkbox or on
    the text. Place a console.log(targetElement) after the second line if you
    want to see this behaviour yourself (then check the developer console). */
    while (!targetElement.classList.contains("task")) {
        targetElement = targetElement.parentElement;
    }

    /* Now we are at the parent, we retrieve the .checkbox element so that we
    can see if it is checked (because they could be checking or unchecking the
    item).*/
    let checkbox = targetElement.querySelector(".checkbox");


    /* If the task has been completed then we give it the class completed
    otherwise we remove the class completed. Adding a class multiple times or
    removing a class multiple times won't have any bad behaviour.

    Adding/removing a class will trigger the DOM to style the element as per
    the class added/removed.*/
    if (checkbox.checked) {
        targetElement.classList.add("completed");
    } else {
        targetElement.classList.remove("completed");
    }
    
    // Save new statut of task to local storage
    var taskNameElement = targetElement.querySelector("label")
    var taskName = taskNameElement.textContent.trim();
    saveTasks(taskName, checkbox.checked);
}

// Show all tasks
function showAllTasks() {
    var tasks = document.getElementsByClassName("task");

    for (let i = 0; i < tasks.length; i++) {
        tasks[i].style.display = "block";
    }
}

// Show all tasks that have not been marked as completed
function showActiveTasks() {
    var tasks = document.getElementsByClassName("task");

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].classList.contains("completed")) {
            // Hide the task item
            tasks[i].style.display = "none";
        }
        else {
            // Show the task item
            tasks[i].style.display = "block";
        }
    }
}

// Show all tasks that have been marked as completed
function showCompletedTasks() {
    var tasks = document.getElementsByClassName("task");

    for (let i = 0; i < tasks.length; i++) {
        if (!(tasks[i].classList.contains("completed"))) {
            // Hide the task item
            tasks[i].style.display = "none";
        }
        else {
            // Show the task item
            tasks[i].style.display = "block";
        }
    }
}

// Save tasks to local storage
function saveTasks(name, isCompleted) {
    localStorage.setItem(name, isCompleted);
}

// Load tasks form local storage
function renderTasks () {
    for (i = 0; i < localStorage.length; i++) {
        var taskName = localStorage.key(i);
        var isCompleted = localStorage.getItem(taskName) == "true";
        var taskHTML = template.replace("<!-- TASK_NAME -->", taskName);

        // Only add non-completed tasks to the taskListContainer
        if (!isCompleted) {
            todoListContainer.insertAdjacentHTML('afterbegin', taskHTML);
        }

    }
}

// Get elements
let addTaskButton = document.getElementById("add-task");
let newTaskInput = document.getElementById("task-input");
let todoListContainer = document.getElementById("todo-list");

var showAllButton = document.getElementById("show-all");
var showActiveButton = document.getElementById("show-active");
var showCompletedButton = document.getElementById("show-completed");


/* Locate where <script> tag which contains our template  */
let templateElement = document.getElementById("list-item-template");
/* Lets get the template, which is just all the HTML beteen the <script> tag */
let template = templateElement.innerHTML;

// Make the event trigger our functions
addTaskButton.addEventListener('click', onAddTaskClicked);
todoListContainer.addEventListener('click', onTodolistClicked);
showAllButton.addEventListener('click', showAllTasks);
showActiveButton.addEventListener('click', showActiveTasks);
showCompletedButton.addEventListener('click', showCompletedTasks);

// Onload: load tasks from local storage (only adds non-completed)
renderTasks();