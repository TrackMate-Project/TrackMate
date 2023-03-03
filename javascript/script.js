import app from "./firebase.js"
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const database = getDatabase(app);
const dbRef = ref(database);

const colorRef = ref(database, 'category')
// console.log(colorRef);

// const color1But = document.querySelector('#color1But');
// const color2But = document.querySelector('#color2But');
// const color3But = document.querySelector('#color3But');

const colorButtons = document.querySelectorAll('.colorLegendBut');

const color1Input = document.querySelector('#color1');
const color2Input = document.querySelector('#color2');
const color3Input = document.querySelector('#color3');

const categoryRef = ref(database, `/category`);

// color1But.addEventListener('click', function(){
//     // .preventDefault();

//     const colorInput = color1Input.value.trim();
    
//     if (colorInput !== ""){
//         const description = {
//             color1: `${colorInput}`
//         }
//         console.log(description);
//         update(categoryRef, description);
//     } else {
//         alert('Please enter a valid description! Do not leave the input empty')
//     }
// })

colorButtons.forEach(function(individualButton){
    individualButton.addEventListener('click', function(){
        const buttonValue = this.value;
        console.log(typeof buttonValue);
        console.log(buttonValue);

        const colorInput = color1Input.value.trim();
    
        if (colorInput !== ""){ 
            console.log(buttonValue);
        
            const description = {
                buttonValue : `${colorInput}`
            };
            console.log(description);
            update(categoryRef, description);
            
        } else {
            alert('Please enter a valid description! Do not leave the input empty')
        }
        })
})

// Pseudocode for Color Category
// Define variable for button, and user input
// Add event listener for click on the button that saves user input
// Get user input and update the color property with that value on db - Do NOT clear the input, keep the data there. 
// If user save/submit empty input, warn them. 

