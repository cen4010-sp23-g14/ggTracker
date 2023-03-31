/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const env = require("dotenv");
const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors")({origin: true});
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.post("/token", async (req, res) => {
  const tokenUrl = "https://id.twitch.tv/oauth2/token?client_id=" + process.env.TWITCH_CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&grant_type=client_credentials";
  axios({
    url: tokenUrl,
    method: "POST",
  })
      .then((response) => {
        process.env.TWITCH_APP_ACCESS_TOKEN = response.data.access_token;
        console.log("The access token inside the env file is: " + process.env.TWITCH_APP_ACCESS_TOKEN);
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({data: "Error getting token data!"});
      });
});

app.post("/search", async (req, res) => {
  axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      "Authorization": "Bearer " + process.env.TWITCH_APP_ACCESS_TOKEN,
    },
    data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;",
  })
      .then((response) => {
        res.status(200).send(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send(err);
      });
});

exports.app = functions.https.onRequest(app);
