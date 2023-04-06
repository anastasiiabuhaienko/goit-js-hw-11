import './sass/styles.scss';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
import Notiflix from "notiflix";


const gallery = document.querySelector('.gallery');
const searchQueryForm = document.getElementById('search-form');
const searchQuery = document.getElementById('search-query');
const loadMoreBtn = document.querySelector('.load-more');

// let defaultEmptySearchField = '';


let page = 1;
const lightbox = new SimpleLightbox('.gallery a',
  {
    captionsData: 'alt',
    captionPosition: 'outside',
    captionDelay: 250,
  });


searchQueryForm.addEventListener('submit', formSubmitSent);
loadMoreBtn.addEventListener('click', loadMore);

// получаем массив фоток и на их основании добавляем разметку в чать Gallery
function photoSerch(photos) {

   const markupCard = photos.map(({webformatURL, largeImageURL, tags, like, views, comments, downloads}) => {
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
    </div>`
   }).join('');
   gallery.insertAdjacentHTML('beforeend', markupCard);
   lightbox.refresh();
};




// функция очистки формы при поиске по новому ключевому слову

function clearGallery () {

    gallery.innerHTML = '';
}


// поиск фото = запрос 
const API_KEY = '17189490-14419ab63c20cc5cd4901fe08';


    async function fetchPhotos(q, page) {
        let result = await axios.get(
            `https://pixabay.com/api/?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
        );

        return await result.data;
      };

function formSubmitSent (event) {
    // чтоб страница не перезагружалась при каждом запросе
    event.preventDefault(); 

    clearGallery();
    page = 1;
    loadImages();
};

function loadImages() {
    let defaultEmptySearchFieldValue = searchQuery.value.trim();

    if (defaultEmptySearchFieldValue != '') {
        fetchPhotos(defaultEmptySearchFieldValue, page).then((response) => {
            if (response.hits.length > 0) {
                photoSerch(response.hits);
                loadMoreBtn.classList.remove('is-hidden');

            } else {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            }
        });
    } else {
        Notiflix.Notify.info('Your query is empty, please enter data to search.');
    }
};

function loadMore() {
    page++;
    loadImages();

}

