import app from "./firebase.js"
import { getDatabase, ref, update, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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

    // const colorTag = document.getElementsByName('chooseColor');
    // let selectedColor = colorTag.value;

    const newTask = {
            definition: descriptionValue,
            dueDate: dueDateValue,
            // colorTag: selectedColor
    }

    if(newTask) {
        update(taskRef, newTask);
        description.value = '';
        dueDateValue.value = '';
        // colorTag.value = '';
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
            // let colorTag = taskProperties[key].colorTag;
            // console.log(definition, dueDate, colorTag);


            const li = document.createElement('li');
            const pDate = document.createElement('p');
            const pTask = document.createElement('p');

            // pTask.textContent = definition;
            // pDate.textContent = dueDate;
            li.innerHTML = 
            `<p>${definition}</p>, 
            <p>${dueDate}</p>
            <button>icon`

            li.appendChild(document.createTextNode(taskProperties[key]));
            // li.appendChild(pTask, pDate);

            newTaskUl.append(li);

        //     if (colorTag === color1) {
        //         li.classList.toggle('yellowBackground')
        //     } else if (colorTag === color2) {
        //         li.classList.toggle('pinkBackground')
        //     } else {
        //         li.classList.toggle('blueBackground')
        //     }
        // }
    }
}
    })


