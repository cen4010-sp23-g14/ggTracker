import {initializeApp} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
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
const user = auth.currentUser;

let detailsGame = window.selectedGame;
let retrievedGameName = localStorage.getItem("gameName");
let retrievedGameSummary = localStorage.getItem("gameSummary");
let retrievedCoverUrl = localStorage.getItem("coverUrl");
let retrievedBannerArt = localStorage.getItem("bannerArt");
let retrievedRatingCount = localStorage.getItem("ratingCount");

function setNavBarEmail() {
    let retrievedEmail = localStorage.getItem('email');
    let loginArea = document.querySelector(".login-name");
    loginArea.innerHTML = retrievedEmail;
}

function buildDetailsScreen() {
    console.log(
        "The banner art we're saving in the local storage is: ",
        retrievedBannerArt
    );

    document
        .querySelector(".game-title__banner")
        .textContent = retrievedGameName;
    document
        .querySelector(".summary-wrapper")
        .textContent = retrievedGameSummary;
    document
        .querySelector(".ratings-total p")
        .textContent = `${retrievedRatingCount} reviews`;

    // Banner Artwork for Details Page
    if (retrievedBannerArt != -1) {
        var bannerImage = `<img src="${retrievedBannerArt}" alt="${retrievedGameName}" class="game-img__banner"/>`;
        var bannerLocation = document.getElementById("bannerLocation");
        bannerLocation.insertAdjacentHTML("beforeend", bannerImage);
    } else {
        var bannerImage = `<img src="assets/img/missing_banner_img.png" alt="${retrievedGameName}" class="game-img__banner"/>`;
        var bannerLocation = document.getElementById("bannerLocation");
        bannerLocation.insertAdjacentHTML("beforeend", bannerImage);
    }
    // add image for cover Art
    var image = `<img src="${retrievedCoverUrl}" alt="${retrievedGameName}" class="img-fluid cover-image"/>`;
    var coverLocation = document.getElementById("coverArt");
    coverLocation.insertAdjacentHTML("beforeend", image);

    // Side tab buttons
    let addToWishlist_Button = document.querySelector('.add-to-wishlist__button');
    addToWishlist_Button.addEventListener("click", async () => {
        if (checkLoginState()) {
            //add wishlist firebase code here

            const user = auth.currentUser;
            let id = String(user.uid);
            localStorage.setItem('wishListCover', retrievedCoverUrl);
            console.log("We set the wishlist cover to: ", retrievedCoverUrl);
            // Creates the custom wishlist and adds data in the database
            const userRef = doc(db, "users", id);
            const wishlistColRef = collection(userRef, "wishlist");
            const wishlistDocRef = doc(wishlistColRef, retrievedGameName);
            setDoc(wishlistDocRef, {
                gameName: retrievedGameName,
                gameSummary: retrievedGameSummary,
                coverUrl: retrievedCoverUrl,
                bannerArt: retrievedBannerArt,
                ratingCount: retrievedRatingCount
            });

            // Add field to user document keeping track of what list collections we have created in the database to be referenced in the settings.js

            await updateDoc(doc(db, "users", id), {
                wishlist: "true"
              });

            alert(`${retrievedGameName} has been added to your Wishlist`);

        } else {
            // don't add logic to buttons
            alert("You must be logged in to add to your Wishlist.")
        }
    });
    let addToBacklog_Button = document.querySelector('.add-to-backlog__button');
    addToBacklog_Button.addEventListener("click", async () => {
        if (checkLoginState()) {
            //add add wishlist firebase code here

            const user = auth.currentUser;
            let id = String(user.uid);
            localStorage.setItem('backlogCover', retrievedCoverUrl);
            console.log("We set the cover art for the backlog to: ", retrievedCoverUrl);
            // Creates the custom wishlit and adds data in the database
            const userRef = doc(db, "users", id);
            const wishlistColRef = collection(userRef, "backlog");
            const wishlistDocRef = doc(wishlistColRef, retrievedGameName);
            setDoc(wishlistDocRef, {
                gameName: retrievedGameName,
                gameSummary: retrievedGameSummary,
                coverUrl: retrievedCoverUrl,
                bannerArt: retrievedBannerArt,
                ratingCount: retrievedRatingCount
            })

            await updateDoc(doc(db, "users", id), {
                backlog: "true"
              });

            alert(`${retrievedGameName} added to your Backlog`);
        } else {
            // don't add logic to buttons
            alert("You must be logged in to add to your Backlog list.")
        }
    });
    let addToCustom_Button = document.querySelector('.add-to-custom__button');
    addToCustom_Button.addEventListener("click", appearListSelect);

    // Login State Check
    function checkLoginState() {
        console.log("The current logged in user is: ", auth.currentUser.email);
        if (auth.currentUser.email != null) {
            // User is logged, awesome. do nothing
            console.log("The user is logged in");
            return true;
        } else {
            // No user is signed in. Deactivate buttons and alert that they need to login
            console.log(
                "In checkLoginState, in the else block, the current user is: ",
                auth.currentUser.email
            );
            console.log("The user is NOT logged in");
            return false;
        }
    }

    // Wishlist popup
    function hideListSelect() {
        if (checkLoginState) {
            // if true then leave buttons the way they are
            let popup = document.querySelector('.lists-popup');
            let main = document.querySelector('main');
            popup
                .classList
                .toggle('hidden');
            main
                .classList
                .toggle('blur');
        } else {
            // don't add logic to buttons
            alert("You must be logged in to create custom lists.")
        }
    }

    function appearListSelect() {
        let popup = document.querySelector('.lists-popup');
        let main = document.querySelector('main');
        popup
            .classList
            .toggle('hidden');
        main
            .classList
            .toggle('blur');
    }

    let exitButton = document.querySelector('.lists-popup__header button');
    exitButton.addEventListener("click", hideListSelect);
}

function loadDetailsScreen() {
    buildDetailsScreen();
}

window.loadDetailsScreen = loadDetailsScreen();

window.onbeforeunload = function (e) {
    if (retrievedGameName != localStorage.getItem("gameName")) {
        localStorage.clear();
    }
};