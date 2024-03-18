// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCor1xMEDOmw5ODAYtnSlKVbEdOtjSOdac",
  authDomain: "waste-management-54ff3.firebaseapp.com",
  projectId: "waste-management-54ff3",
  storageBucket: "waste-management-54ff3.appspot.com",
  messagingSenderId: "566209982853",
  appId: "1:566209982853:web:c76aeeddd2e6ede9d9d4ec",
  measurementId: "G-J23G1XKDJ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
// Google Sign-In function

function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const databaseRef = ref(database);
      const userData = {
        lastLogin: Date.now(),
      };

      update(ref(database, "users/" + user.uid), userData)
        .then(() => {
          alert("User Logged In with Google!");
          //updateNavbar(auth);
          //window.location.href = "index.html";
        })
        .catch((error) => {
          alert(error.message);
        });
    })
    .catch((error) => {
      alert(error.message);
    });
}
document
  .getElementById("google-login-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    signInWithGoogle();
  });



//export default googleSignIn;

// Initialize Google Sign-In when the page loads
//document.addEventListener("DOMContentLoaded", initGoogleSignIn);
