let detailsGame = window.selectedGame;

function buildDetailsScreen() {
    let retrievedGameName = localStorage.getItem("gameName");
    let retrievedGameSummary = localStorage.getItem("gameSummary");

    document.querySelector(".game-title__banner").textContent = retrievedGameName;
    document.querySelector(".summary-wrapper").textContent = retrievedGameSummary;
    // location.href = "/details.html";
    // document.querySelector(".game-title__banner").textContent =  selectedGameForDetails.name
}

window.onbeforeunload = function (e) {
    localStorage.clear();
};