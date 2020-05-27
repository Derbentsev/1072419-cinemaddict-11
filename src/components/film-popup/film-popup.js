import {createFilmPopup} from './film-popup-tpl';
import AbstractSmartComponent from '@components/abstract-smart-component';

const SHAKE_ANIMATION_TIMEOUT = 600;


export default class FilmPopup extends AbstractSmartComponent {
  constructor(film, onDataChange) {
    super();

    this._film = film;
    this._onDataChange = onDataChange;

    this._smile = null;

    this._clickOnCloseButton = null;
    this._clickOnAddToWatchlist = null;
    this._clickOnAddToAlreadyWatched = null;
    this._clickOnAddToFavorites = null;

    this._createNewCommentErrorBorder = this._toggleNewCommentErrorBorder.bind(this);
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
    this.setClickOnEmojiList();
  }

  reset() {
    this.rerender();
  }

  getNewCommentData() {
    const emoji = this.getElement().querySelector(`.film-details__add-emoji-label img`);
    const comment = this.getElement().querySelector(`.film-details__comment-input`).value;

    if (emoji && comment !== ``) {
      return {
        emoji: emoji.src,
        comment,
      };
    }

    this._toggleNewCommentErrorBorder();

    return null;
  }

  setClickOnEmojiList() {
    const emojiImages = this.getElement().querySelectorAll(`.film-details__emoji-label img`);

    emojiImages.forEach((image) => {
      image.addEventListener(`click`, this._onEmojiListClick);
    });
  }

  toggleBlockingPopupForm() {
    this.getElement().querySelector(`form`).classList.toggle(`overlay`);
  }

  shakeForm() {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  shakeNewCommentForm() {
    this.getElement().querySelector(`.film-details__new-comment`).style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }


  _toggleNewCommentErrorBorder() {
    this.getElement().querySelector(`.film-details__comment-input`).classList.toggle(`textarea-error`);
  }

  _onEmojiListClick(evt) {
    if (!this._smile) {
      this._smile = document.createElement(`img`);
      this._smile.src = evt.target.src;
      this._smile.width = 55;
      this._smile.height = 55;
      this._smile.alt = `emoji-smile`;
    } else {
      this.getElement().querySelector(`.film-details__add-emoji-label`).removeChild(this._smile);
      this._smile.src = evt.target.src;
    }

    this.getElement().querySelector(`.film-details__add-emoji-label`).appendChild(this._smile);
  }
}
