import { Notify } from 'notiflix';

export class MessageApi {
  static showWarning() {
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }

  static showError() {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  static onNetworkError() {
    Notify.failure('Problems with network. Please try again.');
  }
}
