let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let tabs = document.querySelectorAll(".taskTabs div");
let taskList = [];
let filteredList = [];
let tabsID = "all";
let list = [];

addButton.addEventListener("click", taskItem);

// Receives three tabs info, under .taskTabs div, from tabs = document.querySelectorAll
// For each tabs, gives click event with "filtering(event)"
for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filtering(event);
    });
}


// called by addButton event listener
// stores inputted value
// the inputted value (in taskContent) gets appended to an array "taskList"
function taskItem() {
    if (taskInput.value ==false) {
        return alert("hahaha");
    }     
    let task = {
        id: randID(),
        taskContent: taskInput.value,   
        isComplete: false
    };
    taskList.push(task);   

    render();                           
}


// updates UI on <div>taskBoard</div>
// each inputted item were pushed to taskList.
// taskList gets assigned to "list" based on condition in if statement.
// if taskList.isComplete === false, displays input value on the UI as it is
// if taskList.isComplete === true, draws the line-through over the input value on the UI
function render() { 
    list = [];
    
    if (tabsID === "all") {
        list = taskList;
    } else if (tabsID === "onGoing" || tabsID=== "done") {
        list = filteredList;
    }

    let result = '';

    for (let i = 0; i < list.length; i++) {         
        if (list[i].isComplete === false) {
            result += `<div class="task">
                        <div>${list[i].taskContent}</div>
                        <div>
                            <button onclick="checkToggle('${list[i].id}')">Check</button>
                            <button onclick="deleteTask('${list[i].id}')">Delete</button>
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


// toggles between "input value with line-through" and "input value without line-through" when "Check" button is clicked
function checkToggle(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete =! taskList[i].isComplete;
        }
    }

    render();
}


// deletes the inputted value from both taskList and list and updates the UI
function deleteTask(id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            list.splice(i, 1);
        }
    }

    render();
}


// Receives id info of the three tabs from function(event), and assigns to "tabsID"
// Stores the item in "filteredList" based on its .isComplete value.
function filtering(event) {
    filteredList = [];
    tabsID = event.target.id;
    if (tabsID === "all") {
        render();
    } else if (tabsID === "onGoing") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === false) {
                filteredList.push(taskList[i]);
            }
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


// Randomly generated id
// included as one of the value of the key in the variable "task" inside "taskItem()"
function randID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

