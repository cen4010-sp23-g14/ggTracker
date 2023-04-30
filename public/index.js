let gamesList = [];
let cover_url = "";

window.selectedGame = null

function loadAllIndex() {
    getGameData()
}

function getGameData() {
    $.ajax({
        url: `https://us-central1-ggtracker-27309.cloudfunctions.net/app/processGameData`,
        crossOrigin: true,
        type: "POST",
        async: true,
        success: function (response) {
            console.log("We've made a sucessful post request!");
            console.log("The data is: ", response);
            console.log(response);
            buildHomeScreen(response)
        },
        error: function (error) {
            console.log("Something went wrong with our test");
            console.log("The error is: ");
            console.log(error);
        }
    })
}

function buildHomeScreen(gamesList) {
    // get id to insert
    const insertCoversDiv = document.getElementById("insert-covers");

    // build html
    console.log("In buildHomeScreen, the first banner link is: ",gamesList[0].bannerArt);
    for (i = 0; i < gamesList.length; i++) {
        var image = ``;
        const divColumns = document.createElement("div")
        const divGalleryItem = document.createElement("div")
        const imageSettings = document.createElement("div");
        var gameTitlePara = document.createElement("p");
        var gameTitleNode = document.createTextNode(gamesList[i].name);

        divColumns
            .classList
            .add("col-xl-3", "col-lg-4", "col-md-6");
        divGalleryItem
            .classList
            .add(`${i}`, "gallery-item", "h-100");

        if(gamesList[i].coverUrl != -1) {
            image = `<img src="${gamesList[i].coverUrl}" alt="${gamesList[i].name}" class="img-fluid cover-image"/>`;
        } else {
            image = `<img src="assets/img/cover-not-found.png" alt="${gamesList[i].name}" class="img-fluid cover-image"/>`;
        }

        imageSettings
            .classList
            .add("gallery-links", "d-flex", "align-items-center", "justify-content-center");
        
        gameTitlePara.classList.add("gallery-links", "d-flex", "align-items-center", "justify-content-center");
        

        insertCoversDiv.append(divColumns);
        divColumns.append(divGalleryItem);
        divGalleryItem.insertAdjacentHTML("beforeend", image);
        divGalleryItem.append(imageSettings);
        divGalleryItem.append(gameTitlePara);
        gameTitlePara.appendChild(gameTitleNode)

        divGalleryItem.addEventListener("click", (event) => {
            let test = event.currentTarget.className.split(" ");
            selectedGame = gamesList[test[0]];
            localStorage.setItem('gameName', selectedGame.name);
            localStorage.setItem('gameSummary', selectedGame.summary);
            localStorage.setItem('coverUrl', selectedGame.coverUrl);
            localStorage.setItem('bannerArt', selectedGame.bannerArt);
            localStorage.setItem('ratingCount', selectedGame.ratingCount);
            localStorage.setItem('totalRating', selectedGame.totalRating);
            localStorage.setItem('screenshots', JSON.stringify(selectedGame.screenshots));
            localStorage.setItem('genres', JSON.stringify(selectedGame.genres));
            location.href = "/details.html";
        }); 
    }
}