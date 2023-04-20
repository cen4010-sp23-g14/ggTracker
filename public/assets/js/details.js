let detailsGame = window.selectedGame;

function buildDetailsScreen() {
    let retrievedGameName = localStorage.getItem("gameName");
    let retrievedGameSummary = localStorage.getItem("gameSummary");
    let retrievedCoverUrl = localStorage.getItem("coverUrl");

    document.querySelector(".game-title__banner").textContent = retrievedGameName;
    document.querySelector(".summary-wrapper").textContent = retrievedGameSummary;
    // location.href = "/details.html";
    // document.querySelector(".game-title__banner").textContent =  selectedGameForDetails.name

    // add image for cover Art
    image = `<img src="${retrievedCoverUrl}" alt="${retrievedGameName}" class="img-fluid cover-image"/>`;
    var coverSpot = document.getElementById("coverArt");
    coverSpot.insertAdjacentHTML("beforeend", image);

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
    addToCustom_Button.addEventListener("click", () => {
        alert("Added to CustomList [testing purposes]");
    });
}

window.onbeforeunload = function (e) {
    if(retrievedGameName != localStorage.getItem("gameName")) {
    localStorage.clear();
    }
};