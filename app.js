let taskInput = document.querySelector(".new-task__text");
let addButton = document.querySelector(".btn__add");
let incompleteTaskHolder = document.querySelector(".incomplete-task__list");
let completedTasksHolder = document.querySelector(".completed-task__list");
let createNewTaskElement = function (taskString) {
    let listItem = document.createElement("li");
    listItem.classList.add("task__item");
    let checkBox = document.createElement("input");
    checkBox.classList.add("task__checkbox");
    let label = document.createElement("label");
    label.classList.add("task__label");
    let editInput = document.createElement("input");
    editInput.classList.add("task__text");
    let editButton = document.createElement("button");
    editButton.classList.add("btn", "btn__edit");
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn__delete");
    let deleteButtonImg = document.createElement("img");
    deleteButtonImg.classList.add("btn__img");
    label.innerText = taskString;
    //Each elements, needs appending
    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.

    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.setAttribute("alt", "");
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};

let addTask = function () {
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    let listItem = createNewTaskElement(taskInput.value);
    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
};
//Edit an existing task.
let editTask = function () {
    let listItem = this.parentNode;
    let editInput = listItem.querySelector(".task__text");
    let label = listItem.querySelector(".task__label");
    let editBtn = listItem.querySelector(".btn__edit");
    let containsClass = listItem.classList.contains("edit-mode");
    //If class of the parent is .editmode
    if (containsClass) {
        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("edit-mode");
};

//Delete task.
let deleteTask = function () {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
};

//Mark task completed
let taskCompleted = function () {
    //Append the task list item to the #completed-tasks
    let listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

let taskIncomplete = function () {
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    let listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

let ajaxRequest = function () {};

//The glue to hold it all together.
//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    let checkBox = taskListItem.querySelector(".task__checkbox");
    let editButton = taskListItem.querySelector(".btn__edit");
    let deleteButton = taskListItem.querySelector(".btn__delete");
    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
