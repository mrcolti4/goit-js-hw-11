import axios from 'axios';

export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '14105268-ecf4e682ff6d4e09bd701cb73';
  constructor() {
    this.page = 1;
    this.perPage = 40;
    this.query = '';
    this.totalHits = 0;
  }
  async getImages() {
    const res = await axios.get(`${this.#BASE_URL}?`, {
      params: {
        image_type: 'photo',
        orientation: 'horizontal',
        q: this.query,
        page: this.page,
        per_page: this.perPage,
        key: this.#API_KEY,
        safesearch: true,
      },
    });
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
