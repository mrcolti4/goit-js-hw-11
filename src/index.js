import { PixabayApi } from './js/pixabay-api.js';
import { refs } from './js/refs.js';
import { MessageApi } from './js/messages-api.js';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const PixabayAPI = new PixabayApi();
let imageGallery = new SimpleLightbox('.gallery .photo-card a');

function hideBtn() {
  refs.loadMoreBtn.classList.add('hidden');
}

function showBtn() {
  refs.loadMoreBtn.classList.remove('hidden');
}

function onLoadScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function onLastPage(totalHits) {
  const currentPage = PixabayAPI.page;
  const maxPage = Math.ceil(totalHits / PixabayAPI.perPage);
  console.log(maxPage, currentPage);

  if (maxPage === currentPage) {
    hideBtn();
    MessageApi.showWarning();
  }
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
    hideBtn();
    const { hits, totalHits } = await PixabayAPI.getImages();
    showBtn();
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
  const inputValue = refs.form.elements[0].value;
  PixabayAPI.query = inputValue;

  if (!inputValue) {
    MessageApi.onEmptyInput();
    return;
  }
  clearGallery();
  PixabayAPI.resetPage();

  await showImages();

  if (PixabayAPI.totalHits == 0) {
    MessageApi.showError();
    hideBtn();
    return;
  }

  MessageApi.showTotalFound(PixabayAPI.totalHits);
  const maxPage = Math.ceil(PixabayAPI.totalHits / PixabayAPI.perPage);

  if (maxPage === 1) {
    hideBtn();
    console.log(maxPage);
    return;
  }
  showBtn();
}

async function onClickLoadMore(e) {
  PixabayAPI.incrementPage();
  await showImages();
  onLoadScroll();
  onLastPage(PixabayAPI.totalHits);
}

refs.form.addEventListener('submit', formHandler);
refs.loadMoreBtn.addEventListener('click', onClickLoadMore);
