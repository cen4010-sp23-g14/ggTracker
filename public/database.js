import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyBC3aTDX9UFi28v1mWQwWwa1LcfGo0j7zc",
    authDomain: "ggtracker-27309.firebaseapp.com",
    projectId: "ggtracker-27309",
    storageBucket: "ggtracker-27309.appspot.com",
    messagingSenderId: "966315096291",
    appId: "1:966315096291:web:d51d80f26ed9b4aa436dd6",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 8081);

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}