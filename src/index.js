import './sass/styles.scss';

import axios from "axios";
import Notiflix from "notiflix";


const gallery = document.querySelector('.gallery');
const submitBtn = document.querySelector('button');

submitBtn.addEventListener('submit', photoSerch);

// получаем массив фоток и на их основании добавляем разметку в чать Gallery
function photoSerch(photos) {

   const markupCard = photos.map({webformatURL, largeImageURL, tags, like, views, comments, downloads}) => {
    return `
    <div class="photo-card">
    <a class="photo-card__link" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
    <p class="info-item">
        <b>Likes</b>
        <span>${like}</span>

    </p>
    <p class="info-item">
        <b>Views</b>
        <span>${views}</span>
    </p>
    <p class="info-item">
        <b>Comments</b>
        <span>${comments}</span>
    </p>
    <p class="info-item">
        <b>Downloads</b>
        <span>${downloads}</span>
    </p>
    </div>
    </div>`;
   }
   gallery.insertAdjacentElement('beforeend', markupCard);
};



const API_KEY = '17189490-14419ab63c20cc5cd4901fe08';


    async function fetchPhotos(q, page) {
        const response = await axios.get(`
        https://pixabay.com/api/?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1
        `);  
        return await response.data;
      };

