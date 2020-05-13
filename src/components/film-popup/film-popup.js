import {createFilmPopup} from './film-popup-tpl';
import {AbstractSmartComponent} from '@components/abstract-smart-component';


export class FilmPopup extends AbstractSmartComponent {
  constructor(film, onDataChange) {
    super();

    this._film = film;
    this._onDataChange = onDataChange;

    this._clickOnCloseButton = null;
    this._clickOnAddToWatchlist = null;
    this._clickOnAddToAlreadyWatched = null;
    this._clickOnAddToFavorites = null;

    this._parseFormData = this._parseFormData.bind(this);
    this._onEmojiListClick = this._onEmojiListClick.bind(this);
  }

  getTemplate() {
    return createFilmPopup(this._film);
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

  recoveryListeners() {
    this.setClickOnCloseButton(this._clickOnCloseButton);
    this.setClickOnAddToWatchlist(this._clickOnAddToWatchlist);
    this.setClickOnAddToAlreadyWatched(this._clickOnAddToAlreadyWatched);
    this.setClickOnAddToFavorites(this._clickOnAddToFavorites);
    this.setClickOnOnEmojiList();
  }

  reset() {
    this.rerender();
  }

  getData() {
    const form = this.getElement().querySelector(`form`);
    const formData = new FormData(form);

    return this._parseFormData(formData);
  }

  setClickOnOnEmojiList() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._onEmojiListClick);
  }

  _onEmojiListClick(evt) {
    evt.stopImmediatePropagation();
    evt.stopPropagation();

    const smile = document.createElement(`img`);
    smile.src = evt.target.src;
    smile.width = 55;
    smile.height = 55;
    smile.alt = `emoji-smile`;

    this.getElement().querySelector(`.film-details__add-emoji-label`).appendChild(smile);

    const newComment = this.getData();

    this._onDataChange(null, newComment);
  }

  _parseFormData(formData) {
    return {
      id: String(new Date() + Math.random()),
      text: formData.get(`comment`),
      emotion: formData.get(`emotion`),
      author: `Oleg Badanov`,
      date: new Date(),
    };
  }
}
