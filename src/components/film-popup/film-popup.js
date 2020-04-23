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
}
