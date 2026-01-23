let tasks =[];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
    const data = localStorage.getItem("tasks");
    tasks = data ? JSON.parse(data) : [];
}

const addTaskBtn = document.getElementById("addTaskBtn")
const tasksContainer = document.getElementById("tasksContainer");
const inputTextBoxSection = document.getElementById("inputTextBoxSection");
const inputTask = document.getElementById("inputTask");

const inputSectionCloseBtn = document.getElementById("inputTextBoxSectionCloseBtn");

const addBtn = document.getElementById("addBtn");//get add button

let currentEditingTask = null;

const saveBtn = document.getElementById("saveBtn");

addTaskBtn.addEventListener("click", ()=>{
    if(currentEditingTask) return;
    inputTextBoxSection.style.display = "flex";
    saveBtn.style.display ="none";
    inputTask.focus();//active the cursor
    inputTask.value = "";
})

inputSectionCloseBtn.addEventListener("click", ()=>{
    inputTextBoxSection.style.display = "none";
    currentEditingTask = null;
    addBtn.style.display = "flex";
    saveBtn.style.display = "none";
})

//create a function to get input text value
function getInputTextValue(){
    return inputTask.value.trim();
}

//create a function for new task
function createNewTask(task){
    const taskList = document.createElement("li");//create a list
    const uiTask = document.createElement("div");//create a div
    const actionBox = document.createElement("div");//create a div
    const checkbox = document.createElement("input");//create inputtag
    checkbox.type = "checkbox";//define input type
    checkbox.checked = task.completed;
    const taskText = document.createElement("span");//create span for task text
    taskText.className = "taskTexts";//add class
    taskText.innerText = task.text;//set the text
    task.domText = taskText;
    if (task.completed) {
        taskText.classList.add("done")
    }
    checkbox.addEventListener("change",()=>{
        task.completed =checkbox.checked;
        taskText.classList.toggle("done", checkbox.checked);
        saveTasks();
    })
    //edit btn
    const taskEditBtn = document.createElement("button");
    taskEditBtn.innerText= "Edit";

    taskEditBtn.addEventListener("click",()=>{
        currentEditingTask = task;
        
        inputTextBoxSection.style.display = "flex"
        inputTask.value = task.text;
        inputTask.focus();
        addBtn.style.display = "none";
        saveBtn.style.display = "flex";
    });
    //delete btn
    const taskDelBtn = document.createElement("button");
    taskDelBtn.innerText = "Delete";
    taskDelBtn.addEventListener("click",()=>{
        tasks = tasks.filter(t => t !== task );
        taskList.remove();
        saveTasks();
    })
    taskList.appendChild(uiTask)
    taskList.appendChild(actionBox)
    uiTask.appendChild(checkbox);//append checkbox to the list
    uiTask.appendChild(taskText);//append to the list
    actionBox.appendChild(taskEditBtn)
    actionBox.appendChild(taskDelBtn);
    tasksContainer.appendChild(taskList);//append to the ul
    inputTextBoxSection.style.display= "none";
}

//save btn
saveBtn.addEventListener("click", ()=>{
    if (!currentEditingTask) return;
    const value = getInputTextValue();
    if(!value){
        alert("Your Task is empty!!!");
        inputTask.focus();
        return;
    }
    currentEditingTask.text = value;
    currentEditingTask.domText.innerText = value;
    saveTasks();

    inputTextBoxSection.style.display= "none";
    addBtn.style.display = "flex"
    saveBtn.style.display = "none"
    currentEditingTask = null;
})

//add button function
addBtn.addEventListener("click", ()=>{
    const value = getInputTextValue();
    if (!value){
        alert("Add Your Task")
        inputTask.focus();
        return;
    }
    const newTask = {
        text: value,
        completed: false,
    }
    tasks.push(newTask);
    createNewTask(newTask);
    saveTasks()
    inputTask.value="";
    inputTask.focus();
})

document.addEventListener("keydown",(event)=>{
    if(inputTextBoxSection.style.display !== "flex")return;
    if(event.key === "Enter"){
        event.preventDefault();

        if(currentEditingTask){
            saveBtn.click();
        } else{
            addBtn.click();
        }
    }
    if(event.key === "Escape"){
        inputSectionCloseBtn.click();
    };
})

loadTasks();
tasks.forEach(task=> createNewTask(task));