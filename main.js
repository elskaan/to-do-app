// vars
let input = document.querySelector('.add-task input'),
    addBtn = document.querySelector('.add-task span'),
    taskContent = document.querySelector('.container .content'),
    taskCount = document.querySelector('.tasks-count span'),
    taskCompleted = document.querySelector('.tasks-completed span');

window.onload = function() {
    input.focus();
};
addBtn.onclick = function() {
    if (input.value === ''){
        swal("Please Enter Task!");
    }else {
        noTaskMsg = document.querySelector('.no-task-message');
        if(document.body.contains(document.querySelector('.no-task-message'))) {
            // remove no task msg
        noTaskMsg.remove();
        }
        
        // create elements
        let mainSpan = document.createElement('span');
        let delBtn = document.createElement("span");
        // create texts
        let mainText = document.createTextNode(input.value);
        let delText = document.createTextNode('delete');
        // append text to elements
        mainSpan.appendChild(mainText);
        delBtn.appendChild(delText);
        // add classes
        mainSpan.className = "box";
        delBtn.className = "delete";
        // append delete to main span
        mainSpan.appendChild(delBtn);
        // append main span to content
        taskContent.appendChild(mainSpan);
        // empty input 
        input.value = '';
        // focus 
        input.focus();

        calc();
    }
};
// delete tasks
document.addEventListener("click", (e) => {
    if(e.target.className === "delete"){
        e.target.parentNode.remove();
        if(taskContent.childElementCount == 0){
            notasksMessage();
        }
        
    }
    if(e.target.classList.contains('box')){
        e.target.classList.toggle("finished");
    }
    calc();
});

// function to create no tasks mesg
function notasksMessage() {
    // create element
    let notasks = document.createElement('span');
    let msgText = document.createTextNode('No Tasks To show');
    // append text to notasks
    notasks.appendChild(msgText);
    // add class
    notasks.className = 'no-task-message';
    // append notasks to content
    taskContent.appendChild(notasks);
};
// function to calc the tasks and completed
function calc() {
    // task count
    taskCount.innerHTML = document.querySelectorAll('.container .content .box').length;
    // task completed
    taskCompleted.innerHTML = document.querySelectorAll('.container .content .finished').length;
}