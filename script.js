tasks=[]
//for save tasks when reload the window
function save(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

//define and get the form
const form = document.querySelector("#inputSection form")
//define and get the input element
const inputElement = document.getElementById("input-task")
//define and get the unorderlist from tasks-section
const taskHolder = document.querySelector("#tasks-section ul")
//define the popupbox
const editBox = document.getElementById("popupBox");
//define the input element in popupbox
const editInput = document.getElementById("popupInput")
//define the save btn of popupbox
const saveEditBtn = document.getElementById("save-edit-btn")
//define the cancel btn of popupbox
const cancelEditBtn = document.getElementById("cancel-edit-btn")


// handle keydown listener for editBox
function handleKeyDown(e){
    if (e.key === "Escape"){
        editBox.style.display = "none"
        document.removeEventListener("keydown", handleKeyDown)
        currentSpan = null
    }
    if (e.key === "Enter"){
        e.preventDefault();
        if(currentSpan){
             // get the <li> that contains the span
            const currentList = currentSpan.closest("li");
            const index = Array.from(taskHolder.children).indexOf(currentList);

            // update both DOM and tasks array
            currentSpan.innerText = editInput.value;
            tasks[index].text = editInput.value;

            save();
            renderTask();
        }
        editBox.style.display = "none";
        document.removeEventListener("keydown", handleKeyDown)
        currentSpan = null;
    }
}

//render for the task
function renderTask(){
    taskHolder.innerHTML="";
    tasks.forEach((task) => {
        //create a list element for new task
        const newList = document.createElement("li")
        // create a div for input and span
        const taskDetails = document.createElement("div")
        //give class name "taskDetails"
        taskDetails.classList.add("taskDetails")
        //create a input element for checkox
        const checkbox = document.createElement('input')
        // define the input type to checkbox
        checkbox.type = "checkbox"
        //give a class name to checkbox to control with css
        checkbox.classList.add("checkbox")
        // create a span element for task's text
        const taskSpan = document.createElement("span")
        //give class name "taskSpan"
        taskSpan.classList.add("taskSpan")
        //place the text from tasks array to span task
        taskSpan.innerText = task.text;

        //create a div for 2 buttons edit and delete
        const btnHolder = document.createElement("div")
        //give class name "btnHolder"
        btnHolder.classList.add("btnHolder")

        //create a button for define task completed
        const showCompletedBtn = document.createElement("button")
        //define the button type
        showCompletedBtn.type = "button"
        //give class nam "showCompletedBtn"
        showCompletedBtn.classList.add("showCompletedBtn","btn")
        //show completed btn text
        showCompletedBtn.innerText = "Completed"

        //create button element for edit
        const editBtn = document.createElement("button")
        //define the button type
        editBtn.type = "button"
        //give class name "editBtn"
        editBtn.classList.add("editBtn", "btn")
        //edit button text "edit"
        editBtn.innerText = "edit"

        //create button element for del
        const delBtn = document.createElement("button")
        //define the button type
        delBtn.type = "button"
        //give class name "delBtn"
        delBtn.classList.add("delBtn", "btn")
        //delete button text "delete"
        delBtn.innerText = "delete"
        // if completed is true make the checkbox to checked and line through to span
        if(task.completed === true){
            checkbox.checked = task.completed
            taskSpan.style.textDecoration = task.completed ? "line-through" : "none";
            btnHolder.style.display = "none"
            showCompletedBtn.style.display = "block"
        }

        //connect checkbox and span text to task details div
        taskDetails.append(checkbox, taskSpan)

        //connect buttons to buttons holder
        btnHolder.append(editBtn, delBtn)

        //connect checkbox,task span, button holder to new list
        newList.append(taskDetails, btnHolder, showCompletedBtn)

        // connect to task holder
        taskHolder.appendChild(newList)

    });
}


function load(){
    tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    renderTask();
}
load()

//function for make new task
function newTask(){
    //create a list element for new task
    const newList = document.createElement("li")

    // create a div for input and span
    const taskDetails = document.createElement("div")
    //give class name "taskDetails"
    taskDetails.classList.add("taskDetails")
    //create a input element for checkox
    const checkbox = document.createElement('input')
    // define the input type to checkbox
    checkbox.type = "checkbox"
    //give a class name to checkbox to control with css
    checkbox.classList.add("checkbox")
    // create a span element for task's text
    const taskSpan = document.createElement("span")
    //give class name "taskSpan"
    taskSpan.classList.add("taskSpan")
    //place the text to the span
    taskSpan.innerText = inputElement.value
    
    //create a div for 2 buttons edit and delete
    const btnHolder = document.createElement("div")
    //give class name "btnHolder"
    btnHolder.classList.add("btnHolder")

    //create a button for define task completed
    const showCompletedBtn = document.createElement("button")
    //define the button type
    showCompletedBtn.type = "button"
    //give class nam "showCompletedBtn"
    showCompletedBtn.classList.add("showCompletedBtn","btn")
    //show completed btn text
    showCompletedBtn.innerText = "Completed"

    //create button element for edit
    const editBtn = document.createElement("button")
    //define the button type
    editBtn.type = "button"
    //give class name "editBtn"
    editBtn.classList.add("editBtn", "btn")
    //edit button text "edit"
    editBtn.innerText = "edit"

    //create button element for del
    const delBtn = document.createElement("button")
    //define the button type
    delBtn.type = "button"
    //give class name "delBtn"
    delBtn.classList.add("delBtn", "btn")
    //delete button text "delete"
    delBtn.innerText = "delete"

    //connect checkbox and span text to task details div
    taskDetails.append(checkbox, taskSpan)

    //connect buttons to buttons holder
    btnHolder.append(editBtn, delBtn)

    //connect checkbox,task span, button holder to new list
    newList.append(taskDetails, btnHolder, showCompletedBtn)

    // connect to task holder
    taskHolder.appendChild(newList)
    //push key and value to local storage named tasks
    tasks.push({text: taskSpan.innerText, completed: false})
    //save in local storage
    save();
}

//listen to form after submit
form.addEventListener("submit",(e)=>{
    // avoid page reload
    e.preventDefault();
    //call the function for make new task
    newTask();
    //empty the input 
    form.reset();
})

let currentSpan = null;
//add listener for edit button
taskHolder.addEventListener("click", (e)=>{
    //if you click the edit button
    if(e.target.classList.contains("editBtn")){
        // define the whole list as a current list that same line with edit btn
        const currentList = e.target.closest("li")
        //defint the span element to change the text
        currentSpan = currentList.querySelector(".taskDetails .taskSpan")
        // show edit box
        editBox.style.display = "flex"
        //place current text to edit input value 
        editInput.value = currentSpan.innerText;
        // auto focus to edit Input
        editInput.focus()
        //call function for keydown
        document.addEventListener("keydown", handleKeyDown)
    }
})

//add event listener for checkbox
taskHolder.addEventListener("change", (c)=>{
    if(c.target.classList.contains("checkbox")){
        const list = c.target.closest("li");
        const span = list.querySelector(".taskDetails .taskSpan")
        const checkbox = list.querySelector(".taskDetails .checkbox")
        const index = Array.from(taskHolder.children).indexOf(list)
        console.log(taskHolder.children)
        console.log(checkbox)
        console.log(tasks[index])//tasks index is for local storage
        console.log(index)//for UI
        if(checkbox.checked){
            tasks[index].completed = true
            span.style.textDecoration = "line-through"
            save();
            renderTask()
        } else{
            tasks[index].completed = false
            span.style.textDecoration = "none"
            save()
            renderTask()
        }
    }
})

//add event listener for save btn
saveEditBtn.addEventListener("click",()=>{
    //close the popup box
    currentSpan.innerText = editInput.value
    editBox.style.display= "none"
    currentSpan = null;

    document.removeEventListener("keydown", handleKeyDown)
})
//add event listener for cancel btn
cancelEditBtn.addEventListener("click", ()=>{
    //close the popup box
    editBox.style.display= "none"
})

//add listener for delete button
taskHolder.addEventListener("click", (d)=>{
    //if the clicked element contains class caleed "delBtn"
    if(d.target.classList.contains("delBtn")){
        // define the current list
        const currentList = d.target.closest("li");

        const index = Array.from(taskHolder.children).indexOf(currentList)
        tasks.splice(index, 1)
        save();
        renderTask();

        //remove the whole list
        // d.target.closest("li").remove();
    }
})

// add listener for showCompleted button
taskHolder.addEventListener("click",(s)=>{
    if(s.target.classList.contains("showCompletedBtn")){
        window.alert("In future when you click the completed btn, you will have option to remove or not")
    }
})