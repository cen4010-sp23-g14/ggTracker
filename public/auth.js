// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries Your web app's
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC3aTDX9UFi28v1mWQwWwa1LcfGo0j7zc",
  authDomain: "ggtracker-27309.firebaseapp.com",
  projectId: "ggtracker-27309",
  storageBucket: "ggtracker-27309.appspot.com",
  messagingSenderId: "966315096291",
  appId: "1:966315096291:web:d51d80f26ed9b4aa436dd6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

function createNewAccount(auth, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      changeToUsername(email)
      localStorage.setItem('email', email);
      alert("Welcome to GGTracker, " + userCredential.user.value);
      console.log("User has been successfully created");
    })
    .catch((error) => {
      console.log("Error on create account: ", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

function signIntoAccount(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    localStorage.setItem('email', email);
    changeToUsername(email)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

function changeToUsername(username) {
  const loginArea = document.querySelector(".login-name");
  loginArea.innerHTML = username

}

// HTML Setup/Logic
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  function hideLogin() {
    let popup = document.querySelector(".login-popup");
    let main = document.querySelector("main");
    popup.classList.remove("popup-appear");
    popup.classList.add("popup-hide");
    main.classList.remove("blur");
  }

  function appearLogin() {
    let popup = document.querySelector(".login-popup");
    let main = document.querySelector("main");
    popup.classList.remove("hidden");
    popup.classList.remove("popup-hide");
    popup.classList.add("popup-appear");
    main.classList.add("blur");
  }

  let navUserButton = document.querySelector(".login-name");
  navUserButton.addEventListener("click", appearLogin);

  let exitButton = document.querySelector(".login-popup__header");
  exitButton.addEventListener("click", hideLogin);

  let signinForm = document.querySelector(".sign-in__form");
  let createAccountForm = document.querySelector(".create-acc__form");
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = document.querySelector("#sign-in__username");
    let password = document.querySelector("#sign-in__password");

    if (username.value == "" || password.value == "") {
      alert("Please enter username and password");
      // Throw Error
    } else {
      signIntoAccount(auth, username.value, password.value);
      alert("Welcome back, " + username.value);
      // Compute Normally
      hideLogin();
    }
  });
  createAccountForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = document.querySelector("#create-acc__username");
    let passwordFirst = document.querySelector("#create-acc__password_1");
    let passwordSecond = document.querySelector("#create-acc__password_2");

    if (
      username.value == "" ||
      passwordFirst.value == "" ||
      passwordSecond.value == ""
    ) {
      alert("Please enter username and password");
      // Throw Error
    } else if (passwordFirst.value != passwordSecond.value) {
      alert("Passwords do not match");
      // Throw Error
    } else {
        console.log("The email passed in is: ", username.value);
        console.log("The password passed in is: ", passwordSecond.value);
      createNewAccount(auth, username.value, passwordSecond.value);
      hideLogin();
    }
  });
});
