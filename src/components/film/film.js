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
}
