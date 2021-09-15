const taskInput = document.getElementById("new-task");
const addButton = document.getElementById("new-task-button");
const listTasks = document.getElementById("list-tasks");
var oldTaskText = []

const createNewTaskElement = function(taskString) {
    const listItem = document.createElement("li");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
        
    editInput.type = "text";
    editInput.disabled = true;
    editInput.value = taskString;

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    
    listItem.className = "listItem"
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

const addTask = function() {
    if(!taskInput.value){
        alert("todo empty!")
    }else{
        oldTaskText.push({id: taskInput.value, value:taskInput.value})
        console.log(oldTaskText);
        const listItem = createNewTaskElement(taskInput.value);
        listItem.id = taskInput.value
        listTasks.appendChild(listItem);
        bindTaskEvents(listItem);
        taskInput.value = "";
        
    }
}

const editTask = function() {  
    const listItem = this.parentNode;

    const cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.className = "cancel";
    cancelButton.onclick = cancelTask;

    const editInput = listItem.querySelector("input[type=text]");
    const editButton = listItem.querySelector("button.edit");
    
    editInput.disabled=false
    editButton.innerText = "Save"
    editButton.onclick = saveTask;
    
    listItem.appendChild(cancelButton);
}

const saveTask = function () {
    const listItem = this.parentNode;

    const saveInput = listItem.querySelector("input[type=text]");
    const saveButton = listItem.querySelector("button.edit");
    const cancelButton = listItem.querySelector("button.cancel");

    saveInput.disabled=true

    const filterOldTaskText = oldTaskText.map((item)=>{
        if(item.id ==listItem.id){
            return {id:saveInput.value, value:saveInput.value}
        }else{
            return item
        }
        
    })
    oldTaskText = filterOldTaskText

    saveButton.innerText = "Edit"
    saveButton.onclick = editTask;

    listItem.removeChild(cancelButton)

    listItem.id = saveInput.value

    
}


const cancelTask = function () {
    const listItem = this.parentNode;
    const saveInput = listItem.querySelector("input[type=text]");
    const saveButton = listItem.querySelector("button.edit");
    const cancelButton = listItem.querySelector("button.cancel");

    saveInput.disabled=true
    console.log("ssss",oldTaskText.find((item)=>item.id ===listItem.id));
    saveInput.value = oldTaskText.find((item)=>item.id ===listItem.id).value

    saveButton.innerText = "Edit"
    saveButton.onclick = editTask;
    
    listItem.removeChild(cancelButton);

    console.log(oldTaskText);
}

const deleteTask = function () {
  	const listItem = this.parentNode;
  	const ul = listItem.parentNode;
  	ul.removeChild(listItem);
    const filterOldTaskText = oldTaskText.filter((item)=>item.id !==listItem.id)
    oldTaskText = filterOldTaskText

    console.log(oldTaskText);
}

addButton?.addEventListener('click', function () {
    addTask()
})

const bindTaskEvents = function(taskListItem) {
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");
  	editButton.onclick = editTask;
 	deleteButton.onclick = deleteTask;
}
