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

app.post("/test", async (req, res) => {
  try {
    let gamesList = [];
    // get the token
    let responseToken = await axios.post("https://id.twitch.tv/oauth2/token?client_id=" + process.env.TWITCH_CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&grant_type=client_credentials");
    let accessToken = responseToken.data.access_token;
    process.env.TWITCH_APP_ACCESS_TOKEN = accessToken;

    let gameResponse = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        "Authorization": "bearer " + process.env.TWITCH_APP_ACCESS_TOKEN,
      },
      data: "limit 50; fields artworks,bundles,category,cover,genres,involved_companies,name,parent_game,platforms,rating,rating_count,release_dates,screenshots,summary,total_rating,total_rating_count,url,videos;",
    })
        .then((response) => {
          gamesList = response.data;
          let convertedGamesList = [];
          let testGamesList = [];

          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].cover == null) {
              const convertedGame = {
                name: response.data[i].name,
                summary: response.data[i].summary,
                coverUrl: "url not found",
              };
              convertedGamesList.push(convertedGame);
            } else {
              let url = getCovers(response.data[i].cover);
              const convertedGame = {
                name: response.data[i].name,
                summary: response.data[i].summary,
                coverUrl: url,
              };
              convertedGamesList.push(convertedGame);
            }
          }

          res.status(200).send(convertedGamesList);
          // forEach (game in response.data) {
          //   if (game.cover != null) {
          //   let url = getCovers(game.cover);
          //   const convertedGame = {
          //     name: game.name,
          //     summary: game.summary,
          //     coverUrl: url
          //   }
          // } else {
          //   console.log("you suck");
          // }
          // }
        })
        .catch((err) => {
          console.error(err);
          res.status(404).send(err);
        });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/test2", async (req, res) => {
  try {
    const gameResponse = await axios.post("https://api.igdb.com/v4/games", {
      data: "limit 50; fields name, cover, summary;",
    }, {
      headers: {
        "Accept": "application/json",
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        "Authorization": "bearer " + process.env.TWITCH_APP_ACCESS_TOKEN,
      },
    });
    res.status(200).send(gameResponse.data);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/token", async (req, res) => {
  const tokenUrl = "https://id.twitch.tv/oauth2/token?client_id=" + process.env.TWITCH_CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&grant_type=client_credentials";
  axios({
    url: tokenUrl,
    method: "POST",
  })
      .then((response) => {
        process.env.TWITCH_APP_ACCESS_TOKEN = response.data.access_token;
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({data: "Error getting token data!"});
      });
});

app.post("/search", async (req, res) => {
  let gameResponse = await axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      "Authorization": "bearer " + process.env.TWITCH_APP_ACCESS_TOKEN,
    },
    data: "limit 50; fields artworks,bundles,category,cover,genres,involved_companies,name,parent_game,platforms,rating,rating_count,release_dates,screenshots,summary,total_rating,total_rating_count,url,videos;",
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

// app.post("/getCover", async (req, res) => {
//   let id = req.body.id;
//   console.log("The id passed on the backend is: " + id);
//   axios({
//     url: "https://api.igdb.com/v4/covers",
//     method: "POST",
//     headers: {
//       "Accept": "application/json",
//       "Client-ID": process.env.TWITCH_CLIENT_ID,
//       "Authorization": "bearer " + process.env.TWITCH_APP_ACCESS_TOKEN,
//     },
//     data: "fields game, height, image_id, url, width; where game = " + id + ";",
//   })
//       .then((response) => {
//         res.status(200).send(response.data);
//         console.log(response.data);
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(404).send({data: "the id you passed in is: " + id});
//       });
// });

async function getCovers(id) {
  console.log("The id passed on the backend is: " + id);
  axios({
    url: "https://api.igdb.com/v4/covers",
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      "Authorization": "bearer " + process.env.TWITCH_APP_ACCESS_TOKEN,
    },
    data: "fields game, height, image_id, url, width; where game = " + id + ";",
  })
      .then((response) => {
        return response.data.url;
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({data: "the id you passed in is: " + id + "The error is: " + err});
      });
}

exports.app = functions.https.onRequest(app);
