import {createFilmPopup} from './film-popup-tpl';
import {AbstractSmartComponent} from '../abstract-smart-component';
import {
  render,
} from '../../utils/render';
import {
  RenderPosition
} from '../../consts';
import {
  Comment
} from '../../components/comment/comment';


export class FilmPopup extends AbstractSmartComponent {
  constructor(film, comments) {
    super();

    this._film = film;
    this._comments = comments;

    this._emojiPath = null;

    this._clickOnCloseButton = null;
    this._clickOnAddToWatchlist = null;
    this._clickOnAddToAlreadyWatched = null;
    this._clickOnAddToFavorites = null;

    this.setClickOnCloseButton();
    this.createComments();
  }

  getTemplate() {
    return createFilmPopup(this._film, this._emojiPath);
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

  createComments() {
    const commentBlock = this.getElement().querySelector(`.film-details__comments-list`);

    this._comments.forEach((comment) => {
      render(commentBlock, new Comment(comment), RenderPosition.BEFOREEND);
    });
  }

  reset() {
    this.rerender();
  }
}
