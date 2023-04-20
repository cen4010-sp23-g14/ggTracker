document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    function hideLogin() {
        let popup = document.querySelector('.login-popup');
        let main = document.querySelector('main');
        popup.classList.remove('popup-appear');
        popup.classList.add('popup-hide');
        main.classList.remove('blur');
    }

    function appearLogin (){
        let popup = document.querySelector('.login-popup');
        let main = document.querySelector('main');
        popup.classList.remove('hidden');
        popup.classList.remove('popup-hide');
        popup.classList.add('popup-appear');
        main.classList.add('blur');
    }

    let navUserButton = document.querySelector(".login-name");
    navUserButton.addEventListener("click", appearLogin);

    let exitButton = document.querySelector('.login-popup__header');
    exitButton.addEventListener("click", hideLogin);

    let signinForm = document.querySelector('.sign-in__form');
    let createAccountForm = document.querySelector('.create-acc__form');
    signinForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let username = document.querySelector('#sign-in__username');
        let password = document.querySelector('#sign-in__password');

        if (username.value == "" || password.value == "") {
            alert('Please enter username and password');
            // Throw Error
        }
        else {
            alert('Welcome back, ' + username.value);
            // Compute Normally
            hideLogin();
        }
    });
    createAccountForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let username = document.querySelector('#create-acc__username');
        let passwordFirst = document.querySelector('#create-acc__password_1');
        let passwordSecond = document.querySelector('#create-acc__password_2');

        if (username.value == "" || passwordFirst.value == "" || passwordSecond.value == "") {
            alert('Please enter username and password');
            // Throw Error
        }
        else if (passwordFirst.value != passwordSecond.value) {
            alert('Passwords do not match');
            // Throw Error
        }
        else {
            alert('Welcome to GGTracker, ' + username.value);
            // Compute Normally
            hideLogin();
        }
    });
});