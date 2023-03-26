require('dotenv').config();
const igdb = require('igdb-api-node').default;
const axios = require('axios');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { query } = require('express');
const client = igdb(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_APP_ACCESS_TOKEN);

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

  app.post('/token', async (req, res) => {
    axios({
      url: "https://id.twitch.tv/oauth2/token",
      method: 'POST',
      data: {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "client_credentials"
      }
    })
    .then(response => {
      process.env.TWITCH_APP_ACCESS_TOKEN = response.data.access_token
      res.status(200)
    })
    .catch(err => {
      console.error(err);
    });
  }) 

  app.get('/search', async (req, res) => {
    axios({
      url: "https://api.igdb.com/v4/games",
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Client-ID':'c2s2mbpryjr70ta6o80x8118ykq749',
          'Authorization':'Bearer kgmwo17yfhv90i5roghjfz09wkjeh6'
      },
      data: "limit 50; fields age_ratings,aggregated_rating,aggregated_rating_count,artworks,category,collection,cover,dlcs,expansions,first_release_date,game_modes,genres,keywords,multiplayer_modes,name,platforms,ports,rating,rating_count,release_dates,screenshots,similar_games,status,storyline,summary,tags,total_rating,total_rating_count,videos;"
    })
      .then(response => {
        res.status(200).send(response.data).message("data recieved on backend from API");
        console.log("From the backend: " + response.data);
      })
      .catch(err => {
          console.error(err);
      });
})

app.listen(5678);
console.log("Server running at http://localhost:" + 5678);
