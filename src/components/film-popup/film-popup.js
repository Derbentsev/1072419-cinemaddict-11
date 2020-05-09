import {
  createFilmPopup
} from './film-popup-tpl';
import {
  AbstractSmartComponent
} from '../abstract-smart-component';


export class FilmPopup extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;

    this._emojiPath = null;

    this._commentModel = null;

    this._clickOnCloseButton = null;
    this._clickOnAddToWatchlist = null;
    this._clickOnAddToAlreadyWatched = null;
    this._clickOnAddToFavorites = null;

    this._parseFormData = this._parseFormData.bind(this);
  }

  getTemplate() {
    return createFilmPopup(this._film, this._emojiPath);
  }

  setOnFormSubmit(cb) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, cb);
  }

  setClickOnCloseButton(cb) {
    this._clickOnCloseButton = cb;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, cb);
  }

  setClickOnAddToWatchlist(cb) {
    this._clickOnAddToWatchlist = cb;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, cb);
  }

  setClickOnAddToAlreadyWatched(cb) {
    this._clickOnAddToAlreadyWatched = cb;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, cb);
  }

  setClickOnAddToFavorites(cb) {
    this._clickOnAddToFavorites = cb;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, cb);
  }

  setClickOnOnEmojiList() {
    const onEmojiListClick = (evt) => {
      this._emojiPath = evt.target.src;
      this.rerender();
    };

    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, onEmojiListClick);
  }

  recoveryListeners() {
    this.setClickOnOnEmojiList();
    this.setClickOnCloseButton(this._clickOnCloseButton);
    this.setClickOnAddToWatchlist(this._clickOnAddToWatchlist);
    this.setClickOnAddToAlreadyWatched(this._clickOnAddToAlreadyWatched);
    this.setClickOnAddToFavorites(this._clickOnAddToFavorites);
  }

  reset() {
    this.rerender();
  }

  getData() {
    const form = this.getElement().querySelector(`.film-details__inner`);
    const formData = new FormData(form);

    return this._parseFormData(formData);
  }

  _parseFormData(formData) {
    return {
      text: formData.get(`text`),
      emotion: formData.get(`emotion`),
      author: formData.get(`author`),
      date: formData.get(`date`),
    };
  }
}
