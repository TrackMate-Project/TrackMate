import app from "./firebase.js"
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const database = getDatabase(app);
const dbRef = ref(database);

const colorRef = ref(database, 'category')
// console.log(colorRef);

const color1But = document.querySelector('#color1But');
const color2But = document.querySelector('#color2But');
const color3But = document.querySelector('#color3But');

const color1Input = document.querySelector('#color1');
const color2Input = document.querySelector('#color2');
const color3Input = document.querySelector('#color3');

const color1Obj = colorRef.color1;

// color1But.addEventListener('click', function(){
//     // .preventDefault();

//     const colorInput = color1Input.value.trim();
    
//     if (colorInput !== ""){
//         const description = {
//             color1: `colorInput`
//         }
//         update(color1Obj, description);
//     } else {
//         alert('Please enter a valid description! Do not leave the input empty')
//     }
// })

// Pseudocode for Color Category
// Define variable for button, and user input
// Add event listener for click on the button that saves user input
// Get user input and update the color property with that value on db - Do NOT clear the input, keep the data there. 
// If user save/submit empty input, warn them. 

