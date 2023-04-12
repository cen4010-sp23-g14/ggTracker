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
        var image = document.createElement("img")
        const imageSettings = document.createElement("div");
        var gameTitlePara = document.createElement("p");
        var gameTitleNode = document.createTextNode(gamesList[i].name);

        divColumns
            .classList
            .add("col-xl-3", "col-lg-4", "col-md-6");
        divGalleryItem
            .classList
            .add("gallery-item", "h-100");
        image.src = "assets/img/cover-not-found.png"
        image
            .classList
            .add("img-fluid");
        imageSettings
            .classList
            .add("gallery-links", "d-flex", "align-items-center", "justify-content-center");
        
        gameTitlePara.classList.add("gallery-links", "d-flex", "align-items-center", "justify-content-center");
        

        insertCoversDiv.append(divColumns);
        divColumns.append(divGalleryItem);
        divGalleryItem.append(image);
        divGalleryItem.append(imageSettings);
        divGalleryItem.append(gameTitlePara);
        gameTitlePara.appendChild(gameTitleNode)
    }
}

/*
          <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="gallery-item h-100">
              <img src="assets/img/gallery/gallery_test.jpg" class="img-fluid" alt="">
              <div class="gallery-links d-flex align-items-center justify-content-center">
                <a href="assets/img/gallery/gallery_test.jpg" title="Gallery 2" class="glightbox preview-link"><i class="bi bi-arrows-angle-expand"></i></a>
                <a href="gallery-single.html" class="details-link"><i class="bi bi-link-45deg"></i></a>
              </div>
            </div>
          </div><!-- End Gallery Item -->
    */