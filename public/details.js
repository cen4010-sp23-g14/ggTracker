import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBC3aTDX9UFi28v1mWQwWwa1LcfGo0j7zc",
    authDomain: "ggtracker-27309.firebaseapp.com",
    projectId: "ggtracker-27309",
    storageBucket: "ggtracker-27309.appspot.com",
    messagingSenderId: "966315096291",
    appId: "1:966315096291:web:d51d80f26ed9b4aa436dd6",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const user = auth.currentUser;

let detailsGame = window.selectedGame;

function setNavBarEmail() {
    let retrievedEmail = localStorage.getItem('email');
    let loginArea = document.querySelector(".login-name");
    loginArea.innerHTML = retrievedEmail;
}

function buildDetailsScreen() {
    let retrievedGameName = localStorage.getItem("gameName");
    let retrievedGameSummary = localStorage.getItem("gameSummary");
    let retrievedCoverUrl = localStorage.getItem("coverUrl");
    let retrievedBannerArt = localStorage.getItem("bannerArt");
    let retrievedRatingCount = localStorage.getItem("ratingCount");

    console.log("The banner art we're saving in the local storage is: ", retrievedBannerArt);

    document.querySelector(".game-title__banner").textContent = retrievedGameName;
    document.querySelector(".summary-wrapper").textContent = retrievedGameSummary;
    document.querySelector(".ratings-total p").textContent = `${retrievedRatingCount} reviews`;

    // Banner Artwork for Details Page
    if(retrievedBannerArt != -1) {
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
    addToWishlist_Button.addEventListener("click", () => {
        if (checkLoginState()) {
            //add
            alert("Added to Wishlist [testing purposes]");
        } else {
            // don't add logic to buttons
            alert("You must be logged in to add to your Wishlist.")
        }
    });
    let addToBacklog_Button = document.querySelector('.add-to-backlog__button');
    addToBacklog_Button.addEventListener("click", () => {
        if (checkLoginState()) {
            //add
            alert("Added to Backlog [testing purposes]");
        } else {
            // don't add logic to buttons
            alert("You must be logged in to add to your Backlog list.")
        }
    });
    let addToCustom_Button = document.querySelector('.add-to-custom__button');
    addToCustom_Button.addEventListener("click", appearListSelect);

    // Login State Check
    function checkLoginState() {
        if (user) {
          // User is logged, awesome. do nothing
          return true;
        } else {
          // No user is signed in. Deactivate buttons and alert that they need to login
          return false;
        }
    }

    // Wishlist popup
    function hideListSelect() {
        if (checkLoginState) {
            // if true then leave buttons the way they are
            let popup = document.querySelector('.lists-popup');
            let main = document.querySelector('main');
            popup.classList.toggle('hidden');
            main.classList.toggle('blur');
        } else {
            // don't add logic to buttons
            alert("You must be logged in to create custom lists.")
        }
    }

    function appearListSelect() {
        let popup = document.querySelector('.lists-popup');
        let main = document.querySelector('main');
        popup.classList.toggle('hidden');
        main.classList.toggle('blur');
    }

    let exitButton = document.querySelector('.lists-popup__header button');
    exitButton.addEventListener("click", hideListSelect);
}

function loadDetailsScreen() {
    buildDetailsScreen();
}

window.loadDetailsScreen = loadDetailsScreen();

window.onbeforeunload = function (e) {
    if(retrievedGameName != localStorage.getItem("gameName")) {
    localStorage.clear();
    }
};