document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    function createListPopup() {
        //let createListContainer = document.querySelector('.create-list__popup');
        alert("pressed!");
        return;
    }

    let createListButton = document.querySelector('.create-custom-list__button');
    createListButton.addEventListener("click", createListPopup);

});