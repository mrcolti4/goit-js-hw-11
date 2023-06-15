import axios from 'axios';
import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';

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
    this.totalHits = 0;
  }
  async getImages() {
    const res = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${this.query}&image_type=${this.imageType}&safesearch=${this.safesearch}&orientation=${this.orientation}&per_page=${this.perPage}&page=${this.page}`
    );
    this.totalHits = res.data.totalHits;
    return res.data;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
