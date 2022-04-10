// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVctE0eDagbUKgQLMTESke3I8NKJpfZzA",
    authDomain: "genius-car-services-c97aa.firebaseapp.com",
    projectId: "genius-car-services-c97aa",
    storageBucket: "genius-car-services-c97aa.appspot.com",
    messagingSenderId: "699558697298",
    appId: "1:699558697298:web:b4dec2bf2eb0b5b536028b"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export default auth