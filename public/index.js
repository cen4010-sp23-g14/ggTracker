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

function buildHomeScreen(gamesList) {
    let homescreen = document.getElementById("insert-covers")


    }