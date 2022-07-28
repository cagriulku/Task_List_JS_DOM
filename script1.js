
const form = document.querySelector('.task-form');
const addedTasks = document.querySelector('.added-tasks');
const clearBtn = document.querySelector('.clear-btn');
const filter = document.querySelector('.filter-task-input');
const newTaskInput = document.querySelector('.task');

// const addBtn = document.querySelector('.add-btn');

let a = 0;
let counter = 0;

loadEventListener();



loadEventListener();

function loadEventListener() {

    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', newTaskAdded);
    addedTasks.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

//Get Tasks From Local Storage


function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // counter++;

        //Create Element
        const li = document.createElement('li');
        const span = document.createElement('span');
        // const remove = document.createElement('a');

        //Add Class
        // span.className = 'counter';
        li.className = 'collection-item';
        // remove.className = 'remove';

        // remove.innerHTML = '<i class="fa-solid fa-xmark fa-l"></i>';

        //Append to Element
        // span.appendChild(document.createTextNode(counter));
        li.appendChild(span);
        // li.appendChild(remove);
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        //Appent li to ul
        addedTasks.appendChild(li);

    });
}


// Add Task
function newTaskAdded(e) {

    if (newTaskInput.value === '') {
        alert('Please add Task!');
        // counter--;
        li.lastChild.remove();
    }

    counter++;

    //Create Element
    const li = document.createElement('li');
    const span = document.createElement('span');
    // const remove = document.createElement('a');
    const link = document.createElement('a');

    //Add Class
    // span.className = 'counter';
    li.className = 'collection-item';
    // remove.className = 'remove';
    link.className = 'delete-item secondary-content';

    // remove.innerHTML = '<i class="fa-solid fa-xmark fa-l"></i>';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append to Element
    // span.appendChild(document.createTextNode(counter));
    li.appendChild(span);
    // li.appendChild(remove);
    li.appendChild(link);

    li.appendChild(document.createTextNode(newTaskInput.value));

    //Appent li to ul
    addedTasks.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(newTaskInput.value);

    //Clear Input
    newTaskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {

        // a++;

        // counter--;
        e.target.parentElement.parentElement.remove();

        //Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }

}

//Remove from Local Storage

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    console.log(taskItem);
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
        console.log(31);
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        console.log(52);
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
            console.log(69);
            console.log(task);
            console.log(tasks);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    if (confirm('Are you sure?')) {
        while (addedTasks.firstChild) {
            addedTasks.removeChild(addedTasks.firstChild);
            // counter = 0;
        }

    }

    //Clear from local Storage
    clearTaskFromLocalStorage();
}

//Clear Tasks from Local Storage
function clearTaskFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
        (function (task) {
            const item = task.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
}
