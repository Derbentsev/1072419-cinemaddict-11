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

    this._setOnClickOnEmojiList();
    this.createComments();
  }

  getTemplate() {
    return createFilmPopup(this._film, this._emojiPath);
  }

  setOnClickCloseButton(cb) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, cb);
  }

  setOnClickAddToWatchlist(cb) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, cb);
  }

  setOnClickAddToAlreadyWatched(cb) {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, cb);
  }

  setOnClickAddToFavorites(cb) {
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, cb);
  }

  recoveryListeners() {
    this._setOnClickOnEmojiList();
  }

  _setOnClickOnEmojiList() {
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
}
