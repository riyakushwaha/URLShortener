'use strict';

//Variables
const inputLink = document.querySelector(".user__link");
const inputLabel = document.querySelector(".user__link-label");
const submitButton = document.querySelector(".submit__btn");
const containerOutput = document.querySelector(".link__output-boxes");

class URLShortener{

    #API_URL = "https://api.shrtco.de/v2/shorten?url=";
    #flag = 0;

    constructor(){
        submitButton.addEventListener("click", this.getShortenUrl.bind(this));
        containerOutput.addEventListener("click", this.copyText.bind(this));
    }

    getShortenUrl(e){
        e.preventDefault();

        const inputURL = inputLink.value;
        if(inputURL === ""){
            inputLink.classList.add("invalid-input");
            inputLabel.classList.add("invalid-msg");
            this.#flag = 1;
        }

        if(inputURL!== ""){

            if(this.#flag === 1){
                inputLink.classList.remove("invalid-input");
                inputLabel.classList.remove("invalid-msg");
                this.#flag = 0;
            }

            inputLink.value = "";
            // const shortenURL = this.callAPI(inputLink);
            this.callAPI(inputURL);
            // this.renderOutput(inputLink, shortenURL);
        }
    }

    callAPI(inputURL){

        const request = fetch(`${this.#API_URL+inputURL}`);
        request.then((response) => response.json()).then((data) => this.renderOutput(inputURL, data.result.full_short_link));

    }

    renderOutput(inputLink, shortenUrl){

        const html = `<div class="link__output-box data-box--1">
        <p class="input__link">${inputLink}</p>
        <p class="output__link">${shortenUrl}</p>
        <button class="btn--rect btn data-btn--1 copy-btn">Copy</button>
      </div>`;

      containerOutput.insertAdjacentHTML("afterbegin", html);
    }

    copyText(e){
        if(!e.target.classList.contains("copy-btn")) return;

        const text = e.target.closest(".link__output-box").querySelector(".output__link").innerText;
        
        const inputElement = document.createElement('input');
        inputElement.setAttribute("value", text);
        document.body.appendChild(inputElement);
        inputElement.select();
        document.execCommand("copy");
        inputElement.parentNode.removeChild(inputElement);

        e.target.innerHTML = "Copied!";
        e.target.style.backgroundColor = "hsl(257, 27%, 26%)";
    }

    
}

const app = new URLShortener();