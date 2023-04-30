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
let retrievedTotalRating = localStorage.getItem("totalRating");

let retrievedScreenshots = JSON.parse(localStorage.getItem("screenshots"));
let retrievedGenres = JSON.parse(localStorage.getItem("genres"));

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

    var genreContainer = document.querySelector(".genres-container");

    for (let i = 0; i < retrievedGenres[0].length; i++) {
        let p = document.createElement("p");
        p.textContent = retrievedGenres[0][i]
            .name
            genreContainer
            .append(p);
    }

    // add ratings code 
    generateRatingInfo(retrievedTotalRating);

    // add screenshots for the gallery here let galleryUrl =
    // `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${image_id}.jpg`
    let galleryContainer = document.querySelector(".gallery-container"); 
    console.log("The length of the array is: ", retrievedScreenshots[0].length);

    if (retrievedScreenshots[0] != -1) {
        for (let i = 0; i < retrievedScreenshots[0].length; i++) {
            let image_id = ""
            console.log("The empty array is coming back as ", retrievedScreenshots[0]);
            image_id = retrievedScreenshots[0][i].image_id;

            let div1 = document.createElement("div");
            div1
                .classList
                .add("col-xl-3", "col-lg-4", "col-md-6");

            let div2 = document.createElement("div");
            div2
                .classList
                .add("gallery-item", "h-100");

            galleryContainer.append(div1);
            div1.append(div2);

            // create html to be appended to div 2
            let image = `<img src="https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${image_id}.jpg" alt="${retrievedGameName} Screenshot" class="img-fluid"/>`;

            let div3 = document.createElement("div");
            div3
                .classList
                .add("gallery-links", "d-flex", "align-items-center", "justify-content-center");

            div2.insertAdjacentHTML("beforeend", image);
            div2.append(div3);

            // create html to be appended onto div 3
            let html = `<a href="https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${image_id}.jpg" title="Screenshot ${i+1}" class="glightbox preview-link"><i class="bi bi-arrows-angle-expand"></i></a>`;
            div3.insertAdjacentHTML("afterbegin", html);
        }
    } else {
        let p = document.createElement("p");
        p.innerText = "No screenshots available for this game."
        galleryContainer.append(p);
    }

    // Side tab buttons
    let addToWishlist_Button = document.querySelector('.add-to-wishlist__button');
    addToWishlist_Button.addEventListener("click", async () => {
        let boolCheck = checkLoginState()
        if (boolCheck) {
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

            // Add field to user document keeping track of what list collections we have
            // created in the database to be referenced in the settings.js

            await updateDoc(doc(db, "users", id), {wishlist: "true"});

            alert(`${retrievedGameName} has been added to your Wishlist`);

        } else {
            // don't add logic to buttons
            alert("You must be logged in to add to your Wishlist.")
        }
    });
    let addToBacklog_Button = document.querySelector('.add-to-backlog__button');
    addToBacklog_Button.addEventListener("click", async () => {
        let boolCheck = checkLoginState()
        if (boolCheck) {
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

            await updateDoc(doc(db, "users", id), {backlog: "true"});

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
        if (auth.currentUser != null) {
            // User is logged, awesome. do nothing
            console.log("The user is logged in");
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

function generateRatingInfo(rating) {
    switch(true) {
        case (rating > 0 && rating <= 49):
            document.querySelector(".ratings-stars p").textContent = `★ `;
            document.querySelector(".ratings-title span").textContent = `Poor`;
        break;
        case (rating >= 50 && rating <= 84):
            document.querySelector(".ratings-stars p").textContent = `★ ★ `;
            document.querySelector(".ratings-title span").textContent = `Fair`;
        break;
        case (rating >= 85 && rating <= 93):
            document.querySelector(".ratings-stars p").textContent = `★ ★ ★`;
            document.querySelector(".ratings-title span").textContent = `Good`;
        break;
        case (rating >= 94 && rating <= 97):
            document.querySelector(".ratings-stars p").textContent = `★ ★ ★ ★`;
            document.querySelector(".ratings-title span").textContent = `Great`;
        break;
        case (rating >= 98 && rating <= 100):
            document.querySelector(".ratings-stars p").textContent = `★ ★ ★ ★ ★`;
            document.querySelector(".ratings-title span").textContent = `Amazing`;
        break;
        default:
            document.querySelector(".ratings-stars p").textContent = `N/A`;
            document.querySelector(".ratings-title span").textContent = ``;
      } 
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