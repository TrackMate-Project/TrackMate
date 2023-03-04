import app from "./firebase.js"
import { getDatabase, ref, update, onValue, push } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const database = getDatabase(app);
const dbRef = ref(database);

const categoryRef = ref(database, '/category')
const taskRef = ref(database, '/task')

const newTaskUl = document.querySelector('.newTaskList')
const inProgressTaskUl = document.querySelector('.inProgressTaskList')
const completedTaskUl = document.querySelector('.completedTaskList')

const colorButtons = document.querySelectorAll('.colorLegendBut');
const categoryInput = document.querySelectorAll('.categoryInput');

colorButtons.forEach(function(individualButton){
    individualButton.addEventListener('click', function(){
    console.log(this)
    const buttonValue = this.value;

    const colorInput = this.form[0].value.trim();

    if (colorInput !== ""){ 
        const description = {
            [buttonValue] : `${colorInput}`
        };
        console.log(description);
        update(categoryRef, description);
        
    } else {
        alert('Please enter a valid description! Do not leave the input empty')
    }
    })
})

    onValue(categoryRef, function (data) {
        const ourData = data.val();
        console.log(ourData);
        console.log(categoryInput);

        categoryInput.forEach(function (input) {
            for (let key in ourData) {
                console.log(`${key}:${ourData[key]}`)
                if (key === input.id) {
                    input.placeholder = ourData[key]
                }
            }
            console.log(input)
        }
        )
    })

    // Add event listener to the task form submit, and add the user input to database
    const saveTask = document.querySelector('#submitTask');

saveTask.addEventListener('submit', function(event){
    event.preventDefault();

    const description = document.getElementById('description')
    let descriptionValue = description.value;

    const dueDate = document.getElementById('dueDate');
    let dueDateValue = dueDate.value;


    const colorTag = document.getElementsByName('chooseColor');
    console.log(colorTag);
    let colorValue 

    colorTag.forEach(function(color){
        if (color.checked) {
            colorValue = color.value
        }
    })

    console.log(colorValue)

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

    // <i class="fa-solid fa-trash-can" ></i>

// Button event listeners
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