/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const env = require("dotenv");
const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const igdb = require("igdb-api-node").default;
const cors = require("cors")({origin: true});
const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.post("/processGameData", async (req, res) => {
  try {
    let gamesList = [];
    // get the token
    let responseToken = await axios.post("https://id.twitch.tv/oauth2/token?client_id=" + process.env.TWITCH_CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&grant_type=client_credentials");
    let accessToken = responseToken.data.access_token;
    process.env.TWITCH_APP_ACCESS_TOKEN = accessToken;
    functions.logger.log("In processGameData, we have updated our functions");
    // Get the list of games
    let gameResponse = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        "Authorization": "bearer " + process.env.TWITCH_APP_ACCESS_TOKEN,
      },
      data: "limit 200; fields artworks.image_id,bundles,category,cover.image_id,cover.game_localization.cover.image_id,genres.name,involved_companies,name,parent_game,platforms,rating,rating_count,release_dates,screenshots.image_id,summary,total_rating,total_rating_count,url,videos; where rating >= 95; sort rating desc; where rating != null;",
    })
        .then((response) => {
          gamesList = response.data;
          functions.logger.log("In the backend, in processGameData, we have retrieved the game data: ", gamesList);
          let convertedGamesList = [];
          // process the games data into an object that only has the data we need
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].cover == null) {
              const convertedGame = {
                name: response.data[i].name,
                summary: response.data[i].summary,
                totalRating: response.data[i].total_rating,
                ratingCount: response.data[i].total_rating_count,
                bannerArt: generateArtworkLink(i, gamesList),
                screenshots: [generateScreenshotLinks(i, gamesList)],
                genres: [generateGenreList(i, gamesList)],
                coverUrl: -1,
              };
              convertedGamesList.push(convertedGame);
            } else {
              const convertedGame = {
                name: response.data[i].name,
                summary: response.data[i].summary,
                bannerArt: generateBannerArt(i, gamesList),
                totalRating: response.data[i].total_rating,
                ratingCount: response.data[i].total_rating_count,
                screenshots: [generateScreenshotLinks(i, gamesList)],
                genres: [generateGenreList(i, gamesList)],
                coverUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${response.data[i].cover.image_id}.jpg`,
              };
              convertedGamesList.push(convertedGame);
            }
          }
          res.status(200).send(convertedGamesList);
        })
        .catch((err) => {
          functions.logger.error("Error looping through games on the backend:", err);
          res.status(404).send(err);
        });
  } catch (error) {
    res.status(400).send(error);
  }
});

function generateGenreList(i, gamesList) {
  if (gamesList[i].genres != null) {
    functions.logger.debug("the genres array is equal to: ", gamesList[i].genres);
    return gamesList[i].genres;
  } else {
    return -1;
  }
}

function generateScreenshotLinks(i, gamesList) {
  if (gamesList[i].screenshots != null) {
    functions.logger.debug("the screenshots array is equal to: ", gamesList[i].screenshots);
    return gamesList[i].screenshots;
  } else {
    functions.logger.debug("the screenshots array is empty");
    return -1;
  }
}

function generateBannerArt(i, gamesList) {
  if (gamesList[i].artworks != null) {
    return `https://images.igdb.com/igdb/image/upload/t_1080p/${gamesList[i].artworks[0].image_id}.jpg`;
  } else {
    return -1;
  }
}

exports.app = functions.https.onRequest(app);
