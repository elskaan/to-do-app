// vars
let input = document.querySelector('.add-task input'),
    addBtn = document.querySelector('.add-task span'),
    taskContent = document.querySelector('.container .content'),
    taskCount = document.querySelector('.tasks-count span'),
    noTaskMsg = document.querySelector('.no-task-message'),
    taskCompleted = document.querySelector('.tasks-completed span'),
    tasksArray = [];

if (localStorage.getItem("tasks")) {
    tasksArray = JSON.parse(localStorage.getItem("tasks"));
}

getFromLocalStorge();

window.onload = function() {
    input.focus();
};
// add task
addBtn.onclick = function() {
    if(input.value !== ''){
        addTaskToArray(input.value);
        input.value = '';
    }else {
        swal('Please Enter Task');
    }
};

// click on task element
taskContent.addEventListener("click", e => {
    if (e.target.classList.contains('delete')) {
        // remove from local storage
        removeFromLocalStorage(e.target.parentElement.getAttribute('data-id'));
        e.target.parentElement.remove();
        calc();
    }
    // finished
    if(e.target.classList.contains("box")){
        // toggle in local storage
        toggleOnLocalStorage(e.target.getAttribute('data-id'));
        e.target.classList.toggle('finished');
        calc();
    }
});

function addTaskToArray(taskText){
    // task data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // push tasks to array
    tasksArray.push(task);
    // add tsks to page
    addElementsToPage(tasksArray);
    // add tasks to local storage
    addToLocalStorage(tasksArray);
    
}
function addElementsToPage(tasksArray) {
    taskContent.innerHTML = '';
    tasksArray.forEach(task => {
        let span = document.createElement('span');
        span.className = 'box';
        if(task.completed) {
            span.className = 'box finished';
        }
        span.setAttribute("data-id", task.id);
        span.appendChild(document.createTextNode(task.title));
        let delBtn = document.createElement("span");
        delBtn.className = "delete";
        delBtn.appendChild(document.createTextNode("Delete"));
        span.appendChild(delBtn);
        taskContent.appendChild(span);
        input.focus();
        calc();
    });
}
function addToLocalStorage(tasksArray) {
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}
function getFromLocalStorge() {
    let data = localStorage.getItem("tasks");
    if(data) {
        let tasks = JSON.parse(data);
        addElementsToPage(tasks);
    }
};
function removeFromLocalStorage(taskId) {
    tasksArray = tasksArray.filter((task) => task.id != taskId);
    addToLocalStorage(tasksArray);
};

function toggleOnLocalStorage(taskId) {
    for(let i =0; i < tasksArray.length; i++){
        if(tasksArray[i].id == taskId) {
            tasksArray[i].completed == false ? (tasksArray[i].completed = true) : (tasksArray[i].completed = false);
        }
    }
    addToLocalStorage(tasksArray);
};
function calc() {
    // task count
    taskCount.innerHTML = document.querySelectorAll('.container .content .box').length;
    // task completed
    taskCompleted.innerHTML = document.querySelectorAll('.container .content .finished').length;
}
