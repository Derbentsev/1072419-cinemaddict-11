import {createFilmPopup} from './film-popup-tpl';
import {AbstractComponent} from '../abstract-component';

export class FilmPopup extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmPopup(this._film);
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
}
