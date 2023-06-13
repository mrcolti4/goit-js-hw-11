import { PixabayApi } from './js/pixabay-api.js';
import { refs } from './js/refs.js';

console.log(refs);
const PixabayAPI = new PixabayApi();

async function formHandler(e) {
  e.preventDefault();
  const inputValue = refs.form.elements[0].value;
  const images = await PixabayAPI.getImages(inputValue);
  refs.gallery.insertAdjacentHTML('afterbegin', images);
}

refs.form.addEventListener('submit', formHandler);
