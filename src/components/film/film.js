import {createFilmCard} from './film-tpl';
import {AbstractComponent} from '../abstract-component';


export class Film extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  setOnFilmClick(cb) {
    const element = this.getElement();

    element.querySelector(`.film-card__poster`).addEventListener(`click`, cb);
    element.querySelector(`.film-card__title`).addEventListener(`click`, cb);
    element.querySelector(`.film-card__comments`).addEventListener(`click`, cb);
  }
}
