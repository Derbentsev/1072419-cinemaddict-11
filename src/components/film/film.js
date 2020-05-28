import {createFilmCard} from './film-tpl';
import AbstractComponent from '@components/abstract-component';


export default class Film extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  setClickOnFilmCard(cb) {
    const element = this.getElement();

    element.querySelector(`.film-card__poster`).addEventListener(`click`, cb);
    element.querySelector(`.film-card__title`).addEventListener(`click`, cb);
    element.querySelector(`.film-card__comments`).addEventListener(`click`, cb);
  }

  setClickOnAddToWatchlist(cb) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, cb);
  }

  setClickOnAddToAlreadyWatched(cb) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, cb);
  }

  setClickOnAddToFavorites(cb) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, cb);
  }
}
