import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js"

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    function createListPopup() {
        let createListContainer = document.querySelector('.create-list__popup');
        let listPopup = document.querySelector('.lists-popup');
        let main = document.querySelector('main');
        if (listPopup != null && !listPopup.classList.contains('hidden')) {
            listPopup.classList.toggle('hidden');
        }
        if (!main.classList.contains('blur')) {
            main.classList.toggle('blur');
        }
        createListContainer.classList.toggle('hidden');
    }

    let createListButton = document.querySelector('.create-custom-list__button');
    createListButton.addEventListener("click", createListPopup);

    let createListExitButton = document.querySelector('.create-list__exit-button');
    createListExitButton.addEventListener("click", () => {
        let createListContainer = document.querySelector('.create-list__popup');
        let main = document.querySelector('main');
        createListContainer.classList.toggle('hidden');
        main.classList.toggle('blur');
    });
});