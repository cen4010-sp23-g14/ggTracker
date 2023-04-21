let detailsGame = window.selectedGame;

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
        bannerImage = `<img src="${retrievedBannerArt}" alt="${retrievedGameName}" class="game-img__banner"/>`;
        var bannerLocation = document.getElementById("bannerLocation");
        bannerLocation.insertAdjacentHTML("beforeend", bannerImage);
    } else {
        bannerImage = `<img src="assets/img/missing_banner_img.png" alt="${retrievedGameName}" class="game-img__banner"/>`;
        var bannerLocation = document.getElementById("bannerLocation");
        bannerLocation.insertAdjacentHTML("beforeend", bannerImage);
    }
    // add image for cover Art
    image = `<img src="${retrievedCoverUrl}" alt="${retrievedGameName}" class="img-fluid cover-image"/>`;
    var coverLocation = document.getElementById("coverArt");
    coverLocation.insertAdjacentHTML("beforeend", image);

    // Side tab buttons
    let addToWishlist_Button = document.querySelector('.add-to-wishlist__button');
    addToWishlist_Button.addEventListener("click", () => {
        alert("Added to Wishlist [testing purposes]");
    });
    let addToBacklog_Button = document.querySelector('.add-to-backlog__button');
    addToBacklog_Button.addEventListener("click", () => {
        alert("Added to Backlog [testing purposes]");
    });
    let addToCustom_Button = document.querySelector('.add-to-custom__button');
    addToCustom_Button.addEventListener("click", appearListSelect);

    // Wishlist popup
    function hideListSelect() {
        let popup = document.querySelector('.lists-popup');
        let main = document.querySelector('main');
        popup.classList.toggle('hidden');
        main.classList.toggle('blur');
    }

    function appearListSelect (){
        let popup = document.querySelector('.lists-popup');
        let main = document.querySelector('main');
        popup.classList.toggle('hidden');
        main.classList.toggle('blur');
    }

    let exitButton = document.querySelector('.lists-popup__header button');
    exitButton.addEventListener("click", hideListSelect);
}

window.onbeforeunload = function (e) {
    if(retrievedGameName != localStorage.getItem("gameName")) {
    localStorage.clear();
    }
};