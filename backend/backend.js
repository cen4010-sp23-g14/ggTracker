require('dotenv').config();

const express = require('express')
const app = express();
const axios = require('axios')
const bodyParser = require('body-parser');
const { query } = require('express');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('../public/'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });


  // A function that gets a list of games
  app.get('/search', (req, res) => {
    console.log("search get request called");
    let query = req.query.searchQuery;

    console.log("The query recieved on the backend is: ", query);

    axios({
      url: "https://api.igdb.com/v4/games",
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Client-ID':'c2s2mbpryjr70ta6o80x8118ykq749',
          'Authorization':'Bearer kgmwo17yfhv90i5roghjfz09wkjeh6'
      },
      data: "fields age_ratings,aggregated_rating,aggregated_rating_count,artworks,category,collection,cover,dlcs,expansions,first_release_date,game_modes,genres,keywords,multiplayer_modes,name,platforms,ports,rating,rating_count,release_dates,screenshots,similar_games,status,storyline,summary,tags,total_rating,total_rating_count,videos;"
    })
      .then(response => {
        res.status(200).send(response.data).message("data recieved on backend from API");
        console.log(response.data);
      })
      .catch(err => {
          console.error(err);
      });
})

app.listen(5678);
console.log("Server running at http://localhost:" + 5678);