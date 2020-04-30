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

    this._setClickOnOnEmojiList();
    this.setClickOnCloseButton();
    this.createComments();
  }

  getTemplate() {
    return createFilmPopup(this._film, this._emojiPath);
  }

  setClickOnCloseButton(cb) {
    this._clickOnCloseButton = cb;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickOnCloseButton);
  }

  setClickOnAddToWatchlist(cb) {
    this._clickOnAddToWatchlist = cb;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, cb);
  }

  setClickOnAddToAlreadyWatched(cb) {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, cb);
  }

  setClickOnAddToFavorites(cb) {
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, cb);
  }

  recoveryListeners() {
    this._setClickOnOnEmojiList();
    this.setClickOnCloseButton(this._clickOnCloseButton);
  }

  _setClickOnOnEmojiList() {
    const emojiList = this.getElement().querySelector(`.film-details__emoji-list`);

    const onEmojiListClick = (evt) => {
      this._emojiPath = evt.target.src;
      this.rerender();
    };

    emojiList.addEventListener(`click`, onEmojiListClick);
  }

  createComments() {
    const commentBlock = this.getElement().querySelector(`.film-details__comments-list`);

    this._comments.forEach((comment) => {
      render(commentBlock, new Comment(comment), RenderPosition.BEFOREEND);
    });
  }

  reset() {
    // const film = this._film;

    this.rerender();
  }
}
