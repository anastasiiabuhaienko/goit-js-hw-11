import './css/styles.css';

import axios from "axios";
import Notiflix from "notiflix";


const marckupGalleryCard = document.querySelector('.gallery');
const submitBtn = document.querySelector('button');

submitBtn.addEventListener('submit', photoSerch);


function photoSerch() {

    marckupGalleryCard.innerHTML = `Hello`;
    //  `<div class="photo-card">
    // <img src="" alt="" loading="lazy" />
    // <div class="info">
    // <p class="info-item">
    //     <b>Likes</b>
    // </p>
    // <p class="info-item">
    //     <b>Views</b>
    // </p>
    // <p class="info-item">
    //     <b>Comments</b>
    // </p>
    // <p class="info-item">
    //     <b>Downloads</b>
    // </p>
    // </div>
    // </div>`;
};

