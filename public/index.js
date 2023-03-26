function getGamesList() {
    let gamesList = []
    $.ajax({
        url: `http://localhost:5678/search`,
        type: "GET",
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

function retrieveAccessToken() {
    $.ajax({
        url: `http://localhost:5678/token`,
        type: "POST",
        async: true,
        success: function (response) {
            console.log("we've retrieved the token'!");
            console.log("That token data is: ", response);
            console.log(response)
        },
        error: function (xhr) {
            console.log("Unable to retrieve token data");
            console.dir(xhr);
        }
    })
}