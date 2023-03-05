import app from "./firebase.js"
import { getDatabase, ref, update, onValue, push, remove } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const database = getDatabase(app);
const dbRef = ref(database);

const categoryRef = ref(database, '/category')
const taskRef = ref(database, '/task')

const colorButtons = document.querySelectorAll('.colorLegendBut');
const categoryInput = document.querySelectorAll('.categoryInput');
const colorLabel = document.querySelectorAll('.colorLabel')

const newTaskUl = document.querySelector('.newTaskList')
const inProgressTaskUl = document.querySelector('.inProgressTaskList')
const completedTaskUl = document.querySelector('.completedTaskList')

const saveTask = document.querySelector('#submitTask');

// COLOR LEGEND
colorButtons.forEach(function(individualButton){
    individualButton.addEventListener('click', function(){
        const buttonValue = this.value;
        const colorInput = this.form[0].value.trim();
        const parentDiv = this.parentElement;

        if (colorInput !== ""){ 
            const description = {
                [buttonValue] : `${colorInput}`
            };
            update(categoryRef, description);
        
            parentDiv.style.display = "none"
        } else {
            alert('Please enter something! Do not leave the input empty')
        }
    })
})

colorLabel.forEach(function(label){
    label.addEventListener('click', function(){
        const inputDiv = this.nextElementSibling;
        inputDiv.style.display = "inline-block"
    })
})

    onValue(categoryRef, function (data) {
        const ourData = data.val();

        categoryInput.forEach(function (input) {
            for (let key in ourData) {
                if (key === input.id) {
                    input.placeholder = ourData[key]
                    input.labels[0].innerHTML = ourData[key]
                }
            }
        })
    })

// NEW TASK INPUT
saveTask.addEventListener('submit', function(event){
    event.preventDefault();

    const description = document.getElementById('description')
    let descriptionValue = description.value;

    const dueDate = document.getElementById('dueDate');
    let dueDateValue = dueDate.value;

    const colorTag = document.getElementsByName('chooseColor');

    colorTag.forEach(function(color){
        if (color.checked) {
            colorValue = color.value
        }
    })

    const newTask = {
            definition: descriptionValue,
            dueDate: dueDateValue,
            colorTag: colorValue,
            status: "newTask"
    }

    if(newTask) {
        push(taskRef, newTask);
        description.value = '';
        dueDate.value = '';
        colorTag.value = '';
    }
})

onValue(taskRef, function(taskObj){
    if(taskObj.exists()){
        const taskProperties = taskObj.val();

        newTaskUl.innerHTML = '';
        inProgressTaskUl.innerHTML = '';
        completedTaskUl.innerHTML = '';

        for (let key in taskProperties){
            const definition = taskProperties[key].definition;
            const dueDate = taskProperties[key].dueDate;
            const colorTag = taskProperties[key].colorTag;
            const buttonKey = key;
            
            // li for newTask and inProgress
            const li = document.createElement('li');
            li.style.background = colorTag
            li.innerHTML = 
            `<div class="pContainer"><p>${definition}</p> 
            <p>${dueDate}</p>
            </div>
            <button class="coolArrow" value="${buttonKey}"><i class="fa-solid fa-circle-right"></i></button>`
            
            // li for completed tasks
            const completedLi = document.createElement('li');
            completedLi.style.background = "#abb2b8"
            completedLi.innerHTML = 
            `<div class="pContainer"><p>${definition}</p> 
            <p>${dueDate}</p>
            </div>
            <button class="coolTrash" value="${buttonKey}"><i class="fa-solid fa-trash-can"></i></button>`

            if (taskProperties[key].status === "newTask"){
                newTaskUl.append(li);
            } else if (taskProperties[key].status === "inProgress") {
                inProgressTaskUl.append(li);
            } else if (taskProperties[key].status === "completed") {
                completedTaskUl.append(completedLi)
            }
        }
    }
})

// Change status button event listeners
newTaskUl.addEventListener('click', function(event){
    if (event.target.tagName === "I"){
        const buttonValue = event.target.parentNode.value
        const statusChange = {status: "inProgress"}
        const individualTaskRef = ref(database,`/task/${buttonValue}`)

        update(individualTaskRef, statusChange)
    }
})

inProgressTaskUl.addEventListener('click', function(event){
    if (event.target.tagName === "I"){
        const buttonValue = event.target.parentNode.value
        const statusChange = {status: "completed"}
        const individualTaskRef = ref(database,`/task/${buttonValue}`)

        update(individualTaskRef, statusChange)
    }
})


// Remove those completed tasks!!
completedTaskUl.addEventListener('click', function(event){
    if (event.target.tagName === "I"){
        const buttonValue = event.target.parentNode.value
        const individualTaskRef = ref(database,`/task/${buttonValue}`)

        remove(individualTaskRef)
    }
})