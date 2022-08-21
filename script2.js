
const newTaskInput = document.querySelector('.new-task-input');
const addedTasks = document.querySelector('.added-tasks');
const addBtn = document.querySelector('.add-btn');
const clearBtn = document.querySelector('.clear-btn');
const filter = document.querySelector('.filter-task-input');

let clickNum = 0;

loadEventListener();

function loadEventListener() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    addBtn.addEventListener('click', newTaskAdded);
    clearBtn.addEventListener('click', clearTasks);
    addedTasks.addEventListener('click', removeTask);
    filter.addEventListener('keyup', filterTasks);
}

//Get Tasks From Local Storage
function getTasks() {
    let tasks;
    let parent = document.getElementsByClassName('added-tasks')[0];
    parent.innerHTML = '';

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, counter) {

        //Create Element
        const li = document.createElement('li');
        const span = document.createElement('span');
        const remove = document.createElement('a');

        const glass = document.createElement('a');
        const removeAllText = document.createElement('a');
        const allText = document.createElement('div');
        const p = document.createElement('p');

        //Add Class
        span.className = `counter`;
        li.className = 'collection-item';
        remove.className = 'remove';
        glass.className = 'glass';

        allText.className = 'all-text';
        removeAllText.className = 'remove-all-text';

        glass.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
        remove.innerHTML = '<i class="fa-solid fa-xmark fa-l"></i>';
        removeAllText.innerHTML = '<i class="fa-solid fa-xmark fa-l"></i>';

        // checkbox.addEventListener('click', checkedTask);
        allText.style.display = 'none';
        glass.addEventListener('click', getInnerTask);

        removeAllText.addEventListener('click', removeInnerTask);
        //Append to Element
        span.appendChild(document.createTextNode(counter + 1));
        li.appendChild(span);
        li.appendChild(remove);
        li.appendChild(glass);

        li.appendChild(document.createTextNode(task));
        allText.appendChild(p);
        allText.appendChild(removeAllText);
        p.innerHTML = `${task}`;
        li.appendChild(allText);

        //Appent li to ul
        addedTasks.appendChild(li);
    });
}

// Add Task
function newTaskAdded(e) {

    if (newTaskInput.value === '') {
        alert('Please add Task!');
        li.lastChild.remove();
    }

    var add = newTaskInput;

    //Create Element
    const li = document.createElement('li');
    const span = document.createElement('span');
    const glass = document.createElement('a');
    const remove = document.createElement('a');
    const removeAllText = document.createElement('a');
    const allText = document.createElement('div');
    const p = document.createElement('p');

    let parent = document.getElementsByClassName('added-tasks')[0];
    let counter = parent?.childNodes?.length || 0;

    //Add Class
    span.className = 'counter';
    li.className = 'collection-item';
    glass.className = 'glass';

    glass.addEventListener('click', getInnerTask);

    remove.className = 'remove';
    allText.className = 'all-text';
    removeAllText.className = 'remove-all-text';

    removeAllText.addEventListener('click', removeInnerTask);
    allText.style.display = 'none';

    glass.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
    remove.innerHTML = '<i class="fa-solid fa-xmark fa-l"></i>';
    removeAllText.innerHTML = '<i class="fa-solid fa-xmark fa-l"></i>';

    //Append to Element

    span.appendChild(document.createTextNode(counter + 1));

    li.appendChild(span);
    li.appendChild(remove);
    li.appendChild(glass);

    li.appendChild(document.createTextNode(add.value));

    allText.appendChild(p);
    allText.appendChild(removeAllText);
    p.innerHTML = `${newTaskInput.value}`;
    li.appendChild(allText);

    //Appent li to ul
    addedTasks.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(newTaskInput.value);

    //Clear Input
    newTaskInput.value = '';

    e.preventDefault();
}

function getInnerTask() {
    if (this.parentElement.lastChild.style.display === 'block') {
        this.parentElement.lastChild.style.display = 'none';

    } else {
        this.parentElement.lastChild.style.display = 'block';
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

function removeTask(e) {
    if (e.target.parentElement.classList.contains('remove')) {

        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }

        getTasks();
    }

}

function removeInnerTask(e) {
    if (e.target.parentElement.classList.contains('remove-all-text')) {
        e.target.parentElement.parentElement.style.display = 'none';
    }
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let idx = parseInt(taskItem.querySelector('span').innerText) - 1

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.splice(idx, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    if (confirm('Are you sure?')) {
        while (addedTasks.firstChild) {
            addedTasks.removeChild(addedTasks.firstChild);
        }
        //Clear from local Storage
        clearTaskFromLocalStorage();
    }
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
