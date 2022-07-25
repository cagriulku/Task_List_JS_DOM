
const newTaskInput = document.querySelector('.new-task-input');
const addedTasks = document.querySelector('.added-tasks');
const addBtn = document.querySelector('.add-btn');
const clearBtn = document.querySelector('.clear-btn');
const removeBtn = document.querySelector('remove');
const filter = document.querySelector('.filter-task-input');

let a = 0;

let counter = 0;


//DOM Load event
document.addEventListener('DOMContentLoaded', getTasks);


addBtn.addEventListener('click', newTaskAdded);
clearBtn.addEventListener('click', clearTasks);
addedTasks.addEventListener('click', removeTask);
filter.addEventListener('keyup', filterTasks);



//Get Tasks From Local Storage 

function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        task = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        counter++;
        var add = newTaskInput;

        //Create Element
        const li = document.createElement('li');
        const span = document.createElement('span');
        const remove = document.createElement('a');

        //Add Class
        span.className = 'counter';
        li.className = 'collection-item';
        remove.className = 'remove';

        remove.innerHTML = '<i class="fa-solid fa-xmark fa-l"></i>';

        //Append to Element
        span.appendChild(document.createTextNode(counter));
        li.appendChild(span);
        li.appendChild(remove);
        li.appendChild(document.createTextNode(task));

        //Appent li to ul
        addedTasks.appendChild(li);

    });
}


// Add Task
function newTaskAdded(e) {

    if (newTaskInput.value === '') {
        alert('Please add Task!');
        counter--;
        li.lastChild.remove();


    }

    counter++;
    var add = newTaskInput;

    //Create Element
    const li = document.createElement('li');
    const span = document.createElement('span');
    const remove = document.createElement('a');

    //Add Class
    span.className = 'counter';
    li.className = 'collection-item';
    remove.className = 'remove';

    remove.innerHTML = '<i class="fa-solid fa-xmark fa-l"></i>';

    //Append to Element
    span.appendChild(document.createTextNode(counter));
    li.appendChild(span);
    li.appendChild(remove);
    li.appendChild(document.createTextNode(add.value));

    //Appent li to ul
    addedTasks.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(add.value);

    //Clear Input
    newTaskInput.value = '';

    e.preventDefault();
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('remove')) {
        a++;

        counter--;
        e.target.parentElement.parentElement.remove();
        e.preventDefault();
    }
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

//Remove from Local Storage 
function removeTaskFromLocalStorage(taskItem) {
    // console.log(taskItem);
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    if (confirm('Are you sure?')) {
        while (addedTasks.firstChild) {
            addedTasks.removeChild(addedTasks.firstChild);
            counter = 0;
        }

    }

    //Clear from local Storage
    clearTaskFromLocalStorage(addedTasks.firstChild)
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
