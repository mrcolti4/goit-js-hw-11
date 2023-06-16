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

  static showTotalFound(totalFound) {
    Notify.success(`Hooray! We found ${totalFound} images.`);
  }

  static onEmptyInput() {
    Notify.warning('We cant find images with empty input');
  }
}
