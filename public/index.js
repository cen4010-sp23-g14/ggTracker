let gamesList = [];
let cover_url = "";

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
            console.log(gamesList)

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
    let homescreen = document.getElementById("insert-covers")


    }