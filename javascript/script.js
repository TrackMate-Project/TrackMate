import app from "./firebase.js"
import { getDatabase, ref, update, onValue, push } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const database = getDatabase(app);
const dbRef = ref(database);

const colorRef = ref(database, '/category')
const taskRef = ref(database, '/task')

const newTaskUl = document.querySelector('.newTaskList')

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
            colorTag: colorValue
    }

    if(newTask) {
        push(taskRef, newTask);
        description.value = '';
        dueDate.value = '';
        colorTag.value = '';
    }

})

// Listen for changes on taskRef, and if any task added, append new object into ul

onValue(taskRef, function(taskObj){      
    if(taskObj.exists()){
        const taskProperties = taskObj.val();
        console.log(taskProperties);

        newTaskUl.innerHTML = '';

        for (let key in taskProperties) {

            const definition = taskProperties[key].definition;
            const dueDate = taskProperties[key].dueDate;
            const colorTag = taskProperties[key].colorTag;

            
            const li = document.createElement('li');
            const pDate = document.createElement('p');
            const pTask = document.createElement('p');
            
            li.style.background = colorTag
            console.log(colorTag);
            
            li.innerHTML = 
            `<div class="pContainer"><p>${definition}</p> 
            <p>${dueDate}</p>
            </div>
            <button>icon`

            newTaskUl.append(li);

    }
}
    })


