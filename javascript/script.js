import app from "./firebase.js"
import { getDatabase, ref, update, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const database = getDatabase(app);
const dbRef = ref(database);

const categoryRef = ref(database, `/category`);

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

onValue(categoryRef, function(data){
    const ourData = data.val();
    console.log(ourData);
    console.log(categoryInput);
    
    categoryInput.forEach(function(input){
        for (let key in ourData){
            console.log(`${key}:${ourData[key]}`)
            if (key === input.id){
                input.placeholder = ourData[key]
            }
        }
        console.log(input)
    }
    )
})

// Pseudocode for Color Category
// Define variable for button, and user input
// Add event listener for click on the button that saves user input
// Get user input and update the color property with that value on db - Do NOT clear the input, keep the data there. 
// If user save/submit empty input, warn them. 

