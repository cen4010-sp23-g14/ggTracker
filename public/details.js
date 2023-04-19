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
}

window.onbeforeunload = function (e) {
    localStorage.clear();
};