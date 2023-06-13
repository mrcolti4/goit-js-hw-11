import axios from 'axios';
import { refs } from './refs';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '14105268-ecf4e682ff6d4e09bd701cb73';

export class PixabayApi {
  constructor() {
    this.page = 1;
    this.imageType = 'photo';
    this.safesearch = true;
    this.orientation = 'horizontal';
    this.perPage = 40;
    this.query = '';
  }
  async getImages(newQuery) {
    this.query = newQuery;
    const res = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${this.query}&image_type=${this.imageType}&safesearch=${this.safesearch}&orientation=${this.orientation}&per_page=${this.perPage}&page=${this.page}`
    );
    const result = res.data.hits;
    console.log(result);
    return result.reduce(
      (markup, currentImg) => markup + this.generateMarkUp(currentImg),
      ''
    );
  }

  generateMarkUp({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `<div class="photo-card">
  <img src="${webformatURL}" alt="" loading="lazy" />
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
}
