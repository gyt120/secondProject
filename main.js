
let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let tabs = document.querySelectorAll(".taskTabs div");
let taskList = [];
let filteredList = [];
let tabsID = "all";
let list = ''

addButton.addEventListener("click", taskItem); 

// variable "tabs" has three items (tabs in div) in it by using querySelectorAll. 
// Looping it to provide click event to each item in it.
for (let i = 1; i < tabs.length; i++) { 
    tabs[i].addEventListener("click", function(event) {
        filtered(event);
    });
}   


// Executes when addButton is clicked (+ button in UI).
// First if-statement alerts when there is no user input value.
// Each user input value gets added into an object "task" with randomly generated ID as well as "isComplete" key (this key has a default value of "false")
// Each item in the object "task" gets appended to an array "taskList"
function taskItem() {
    if (taskInput.value.length < 1) {
        return alert("Enter the item");
    }
    let task = {
        id: randID(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    render();
}


// This draws the UI on div id "taskBoard."
// tabsID receives id for each tab from the event.target.
// taskList contains all input values, filterList contains altered value (see filtered function at the near bottom section).
function render() {
    list = ''
    if (tabsID == "all") {
        list = taskList;
    } else if (tabsID == "onGoing" || tabsID == "done") {
        list = filteredList;
    }

    let result = '';
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == false) {
            result += `<div class="task">
                        <div>${list[i].taskContent}</div>
                        <div>
                            <button onclick="checkToggle('${list[i].id}')">Check</button>
                            <button onclick ="deleteTask('${list[i].id}')">Delete</button>
                        </div>
                    </div>`
        } else {
            result += `<div class="task">
                        <div class="taskComplete">${list[i].taskContent}</div>
                        <div>
                            <button onclick="checkToggle('${list[i].id}')">Check</button>
                            <button onclick="deleteTask('${list[i].id}')">Delete</button>
                        </div>
                    </div>`
        }
    }
    document.getElementById("taskBoard").innerHTML = result; 
}


// function for check button
// Loops the array "taskList" to check if id (argument received) matches the tasklist.id
// the argument id is received from onclick in render() (check result value > button onclick)
function checkToggle(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete =! taskList[i].isComplete;
        }
    }
    render();
}


// function for delete button
// if argument received (randomly generated id) matches the list.id, it deletes it from the array. 
// The item deletes from UI.
function deleteTask(id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            list.splice(i, 1);
        }
    }
    render();
}


// function for tabs. Receives event from addEventListener.
// alters the array "filterList" to be used from render().
function filtered(event) {
    tabsID = event.target.id;
    filteredList = [];

    if (tabsID === "all") {
        render();
    } else if (tabsID === "onGoing") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === false) {
                filteredList.push(taskList[i]); 
            }// task.isComplete == false
        }
        render();
    } else {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === true) {
                filteredList.push(taskList[i]);
            }
        }
        render();
    }
}


// random ID generator for each user input value.
// gets added to an object "task" in taskItem().
function randID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}


