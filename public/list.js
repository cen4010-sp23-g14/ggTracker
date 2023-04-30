import {initializeApp} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    deleteDoc,
    collection
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyBC3aTDX9UFi28v1mWQwWwa1LcfGo0j7zc",
    authDomain: "ggtracker-27309.firebaseapp.com",
    projectId: "ggtracker-27309",
    storageBucket: "ggtracker-27309.appspot.com",
    messagingSenderId: "966315096291",
    appId: "1:966315096291:web:d51d80f26ed9b4aa436dd6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    let selectedList = localStorage.getItem("selectedList");
    let listOfGames = [];

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("The currently signed in user is ", user.uid);
            generateGamesList(String(user.uid), selectedList);

        } else {
            console.log("The user is not loggged in");
        }
    });

    async function generateGamesList(id, selectedList) {
        let container = document.querySelector(".view-lists__tab-contents");

        if (selectedList == "wishlist") {
            const listTitle = document.querySelector(".list-banner h2");
            listTitle.textContent = "Your Wishlist"
            const docRef = doc(db, "users", id);
            const wishlist1ColRef = collection(docRef, "wishlist");
            const docsSnap = await getDocs(wishlist1ColRef);

            docsSnap.forEach(doc => {
                listOfGames.push(doc.data());
                console.log(listOfGames);
            })

            // generate HTML code
            for (let i = 0; i < listOfGames.length; i++) {
                let name = listOfGames[i].gameName;
                let coverURL = generateCoverArt(i, listOfGames);

                const div = document.createElement("div");
                div.classList.add("list-item__mini", "game-list__item2");

                const button = document.createElement("BUTTON");
                button.innerHTML = "&#10005";
                button.classList.add("list-game-delete");
                button.setAttribute("name", name);
                button.addEventListener("click", async (event) => {
                    // delete game from list code
                    //event.preventDefault();
                    console.log("The event attribute is: ", event.currentTarget.getAttribute("name"));
                    const userRef = doc(db, "users", id);
                    const listColRef = collection(userRef, "wishlist");
                    const listDocRef = doc(listColRef, event.currentTarget.getAttribute("name"));
                    await deleteDoc(listDocRef);

                    location.reload();
                });

                let image = `<img src="${coverURL}" alt="${name}" class="list-thumbnail__mini d-flex align-items-center justify-content-center"/>`;

                let h3 = document.createElement("h3");
                h3.textContent = `${name}`;

                
                container.append(div);
                div.append(button);
                div.insertAdjacentHTML("beforeend", image);
                div.append(h3);
            }
        }

        if (selectedList == "backlog") {
            const listTitle = document.querySelector(".list-banner h2");
            listTitle.textContent = "Your Backlog"
            const docRef = doc(db, "users", id);
            const backlogColRef = collection(docRef, "backlog");
            const docsSnap = await getDocs(backlogColRef);

            docsSnap.forEach(doc => {
                listOfGames.push(doc.data());
                console.log(listOfGames);
            })

            // generate HTML code
            for (let i = 0; i < listOfGames.length; i++) {
                let name = listOfGames[i].gameName;
                let coverURL = generateCoverArt(i, listOfGames);

                const div = document.createElement("div");
                div.classList.add("list-item__mini", "game-list__item2");

                const button = document.createElement("BUTTON");
                button.innerHTML = "&#10005";
                button.classList.add("list-game-delete");
                button.setAttribute("name", name);
                button.addEventListener("click", async (event) => {
                    // delete game from list code
                    //event.preventDefault();
                    console.log("The event attribute is: ", event.currentTarget.getAttribute("name"));
                    const userRef = doc(db, "users", id);
                    const listColRef = collection(userRef, "backlog");
                    const listDocRef = doc(listColRef, event.currentTarget.getAttribute("name"));
                    await deleteDoc(listDocRef);

                    alert("Game deleted from your backlog");
                    location.reload();
                });

                let image = `<img src="${coverURL}" alt="${name}" class="list-thumbnail__mini d-flex align-items-center justify-content-center"/>`;

                let h3 = document.createElement("h3");
                h3.textContent = `${name}`;

                container.append(div);
                div.append(button);
                div.insertAdjacentHTML("beforeend", image);
                div.append(h3);
            }
        }
    }

    function generateCoverArt(i, gamesList) {
        if (gamesList[i].coverUrl != 1) {
          return gamesList[i].coverUrl
        } else {
          return "assets/img/cover-not-found.png";
        }
      }
      
    // Don't need anything below this comment for now
    function createListPopup() {
        let createListContainer = document.querySelector('.create-list__popup');
        let listPopup = document.querySelector('.lists-popup');
        let main = document.querySelector('main');
        if (listPopup != null && !listPopup.classList.contains('hidden')) {
            listPopup
                .classList
                .toggle('hidden');
        }
        if (!main.classList.contains('blur')) {
            main
                .classList
                .toggle('blur');
        }
        createListContainer
            .classList
            .toggle('hidden');
    }

    let createListButton = document.querySelector('.create-custom-list__button');
    if (createListButton != null) {
        createListButton.addEventListener("click", createListPopup);
    }

    let createListExitButton = document.querySelector('.create-list__exit-button');
    if (createListExitButton != null) {
        createListExitButton.addEventListener("click", () => {
            let createListContainer = document.querySelector('.create-list__popup');
            let main = document.querySelector('main');
            createListContainer
                .classList
                .toggle('hidden');
            main
                .classList
                .toggle('blur');
        });
    }
});