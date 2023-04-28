// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js"

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
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    let retrievedEmail = localStorage.getItem('email');
    let loginAnchor = document.querySelector(".login-name__anchor");
    let loginButton = document.querySelector(".login-name__button");
    loginAnchor.classList.toggle('hidden');
    loginButton.classList.toggle('hidden');
    loginAnchor.innerHTML = retrievedEmail;
  } else {
    // not logged in 
    let url = window.location.href;
    console.log(url);
    if (url.includes('settings.html') || url.includes('list.html')) {
      //ERROR
      alert("YOU DON'T BELONG HERE, VILE SCUM");
      window.location = "/index.html";
    }
  }
});

// Check to see if on Settings page
let logoutButton = document.querySelector('.logout-button');
if (logoutButton != null) {
  logoutButton.addEventListener("click", logout);
}

function logout() {
  signOut(auth).then(() => {
    alert("Sign out successful");
    window.location = '/index.html';
  }).catch((error) => {
    alert("Error signing out");
  });
}

function createNewAccount(auth, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      localStorage.setItem('email', email);
      await setDoc(doc(db, "users", userCredential.uid));
      alert("Welcome to GGTracker, " + userCredential.user.value);
      
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
    alert("Welcome back, " + email);
    localStorage.setItem('email', email);
    // ...
  })
  .catch((error) => {
    alert("Account does not exist!");
    const errorCode = error.code;
    const errorMessage = error.message;
  });
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

  let navUserButton = document.querySelector(".login-name__button");
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

/*
try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
*/