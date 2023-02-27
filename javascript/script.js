import app from "./firebase.js"
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const database = getDatabase(app);
const dbRef = ref(database);