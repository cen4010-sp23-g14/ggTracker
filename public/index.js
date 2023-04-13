let gamesList = [];
let cover_url = "";
window.selectedGame = null

function getToken() {
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

function getGamesList() {
    $.ajax({
        url: `https://us-central1-ggtracker-27309.cloudfunctions.net/app/search`,
        type: "POST",
        async: true,
        success: function (response) {
            gamesList = response;
            // console.log(gamesList)

            buildHomeScreen(gamesList);
        },
        error: function (xhr) {
            console.log("something went wrong getting video game data");
            console.dir(xhr);
        }
    })
}

function getCover(cover_id) {
    $.ajax({
        url: "https://us-central1-ggtracker-27309.cloudfunctions.net/app/getCover",
        type: "POST",
        async: true,
        data: {
            id: cover_id
        },
        success: function (response) {
            data = response;
            console.log("The cover id we got is: ");
            console.log(data);
            return response
        },
        error: function (xhr) {
            console.log("something went wrong getting cover data");
            console.dir(xhr);
        }
    })
}

function buildHomeScreen(gamesList) {
    // get id to insert
    const insertCoversDiv = document.getElementById("insert-covers");

    // build html

    for (i = 0; i < gamesList.length; i++) {
        const divColumns = document.createElement("div")
        const divGalleryItem = document.createElement("div")
        var image = `<img src="assets/img/cover-not-found.png" alt="${gamesList[i].name}" class="img-fluid cover-image"/>`;
        const imageSettings = document.createElement("div");
        var gameTitlePara = document.createElement("p");
        var gameTitleNode = document.createTextNode(gamesList[i].name);

        divColumns
            .classList
            .add("col-xl-3", "col-lg-4", "col-md-6");
        divGalleryItem
            .classList
            .add(`${i}`, "gallery-item", "h-100");
        image.src = "assets/img/cover-not-found.png"
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
            localStorage.setItem('gameSummary', selectedGame.summary)
            location.href = "/details.html";
        }); 
    }
}

// const myArray = text.split(" ");