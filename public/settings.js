import {initializeApp} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
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
const usersCollectionRef = collection(db, 'users');
const user = auth.currentUser;
console.log("In the settings.js, the current user is: ", user);

// retrieves the list of games from the wishlist
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("The currently signed in user is ", user.uid);

        let listOfGames = [];
        let id = String(user.uid);
        setUpLists(id);
    } else {
        console.log("The user is not loggged in");
    }
});

// function will retrieve the list of lists the user has on their account
async function setUpLists(userId) {
    const docRef = doc(db, "users", userId);

    const docSnap = await getDoc(docRef);
    let doesBacklogExist = docSnap.data().backlog;
    let doesWishlistExist = docSnap.data().wishlist;

    let container = document.querySelector(".view-lists__tab-contents")

    if (doesBacklogExist == "true") {
        const div = document.createElement("div");
        const listImage = `<img src="assets/img/Backlog_GGTracker.png" alt="Backlog list" class="list-thumbnail__mini d-flex"/>`;
        const h2 = document.createElement("h2");
        h2.textContent = "Backlog";
        div.classList.add("list-item__mini");

        container.append(div);
        div.insertAdjacentHTML("beforeend", listImage);
        div.append(h2);
        div.addEventListener("click", (event) => {
            location.href = "/list.html";
            localStorage.setItem("selectedList", "backlog");
        });
    }

    if (doesWishlistExist == "true") {
        // add html code for this list
        const div = document.createElement("div");
        const listImage = `<img src="assets/img/Wishlist_GGTracker.png" alt="Wishlist" class="list-thumbnail__mini d-flex"/>`;
        const h2 = document.createElement("h2");
        h2.textContent = "Wishlist";
        div.classList.add("list-item__mini");

        container.append(div);
        div.insertAdjacentHTML("beforeend", listImage);
        div.append(h2);
        div.addEventListener("click", (event) => {
            location.href = "/list.html";
            localStorage.setItem("selectedList", "wishlist");
        });
        
    }

    if (doesBacklogExist == "false" && doesWishlistExist == "false") {
       const p = document.createElement("p");
       p.classList.add("no-list-text");
       p.textContent = "Oops! You haven't created any lists yet!";
       container.append(p);
    }
}

// function generateCoverArtLink(listName) {
//     let coverArt = "";
//     if (listName == "wishlist") {
//         coverArt = localStorage.getItem("wishListCover");
//         console.log("in generateCoverArtLink, the url we got back is: ", coverArt);
//         if (coverArt != -1 && coverArt != null) {
//             return coverArt
//         } else {
//             return "assets/img/Owlsley2022BG.png"
//         }
//     } 

//     if (listName == "backlog") {
//         coverArt = localStorage.getItem("backlogCover");
//         if (coverArt != -1 && coverArt != null) {
//             return coverArt
//         } else {
//             return "assets/img/Owlsley2022BG.png"
//         }
//     }
// }

// Puts email as the title in the settings page (don't delete like Siobahn did)
let usernameText = document.querySelector('.settings-username__wrapper');
let email = localStorage.getItem('email');
usernameText.textContent = email;