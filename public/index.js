function getToken() {
    $.ajax({
        url: `https://us-central1-ggtracker-27309.cloudfunctions.net/app/token`,
        crossOrigin: true,
        type: "POST",
        async: true,
        success: function (response) {
            console.log("We've made a sucessful post request!");
            console.log("That token data is: ", response);
            console.log(response)
        },
        error: function (error) {
            console.log("Unable to retrieve token data");
            console.log("The error is: ");
            console.dir(error);
        }
    })
}

function getGamesList() {
    let gamesList = []
    $.ajax({
        url: `https://us-central1-ggtracker-27309.cloudfunctions.net/app/search`,
        type: "POST",
        async: true,
        success: function (response) {
            console.log("we got the data for the front end homepage yay!");
            console.log("That data is: ", response);
            gamesList = response;
            console.log(gamesList)
        },
        error: function (xhr) {
            console.log("something went wrong getting video game data");
            console.dir(xhr);
        }
    })
}
