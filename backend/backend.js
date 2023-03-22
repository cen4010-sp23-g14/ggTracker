// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: process.env.APIKEY,

  authDomain: "ggtracker-c158c.firebaseapp.com",

  projectId: "ggtracker-c158c",

  storageBucket: "ggtracker-c158c.appspot.com",

  messagingSenderId: "385265598902",

  appId: "1:385265598902:web:80f164795428cceae0c117",

  measurementId: "G-RVK29S93FT"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);