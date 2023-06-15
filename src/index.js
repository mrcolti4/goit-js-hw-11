import { PixabayApi } from './js/pixabay-api.js';
import { refs } from './js/refs.js';
import { MessageApi } from './js/messages-api.js';
import 'simplelightbox/dist/simple-lightbox.min.css';

const PixabayAPI = new PixabayApi();
let imageGallery = new SimpleLightbox('.gallery .photo-card a');

function hideBtn() {
  refs.loadMoreBtn.hidden = true;
}

function showBtn() {
  refs.loadMoreBtn.hidden = false;
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

async function showImages() {
  const images = await fetchImages();
  insertImages(images);
  imageGallery.refresh();
}

function generateMarkUp({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
  <a href="${webformatURL}"><img src="${largeImageURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
    ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
    ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
    ${downloads}
    </p>
  </div>
</div>`;
}

async function fetchImages() {
  try {
    const { hits, totalHits } = await PixabayAPI.getImages();
    if (totalHits == 0) {
      MessageApi.showError();
    }
    const currentPage = PixabayAPI.page;
    const maxPage = Math.ceil(totalHits / PixabayAPI.perPage);
    showBtn();
    if (maxPage === currentPage) {
      hideBtn();
      MessageApi.showWarning();
    }
    return hits.reduce(
      (markup, currentImg) => markup + generateMarkUp(currentImg),
      ''
    );
  } catch (error) {
    console.error(error);
    MessageApi.onNetworkError();
  }
}
function insertImages(images) {
  if (images) refs.gallery.insertAdjacentHTML('beforeend', images);
}

async function formHandler(e) {
  e.preventDefault();
  clearGallery();
  PixabayAPI.resetPage();
  const inputValue = refs.form.elements[0].value;
  PixabayAPI.query = inputValue;
  await showImages();
}

async function onClickLoadMore(e) {
  PixabayAPI.incrementPage();
  await showImages();
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

refs.form.addEventListener('submit', formHandler);
refs.loadMoreBtn.addEventListener('click', onClickLoadMore);
