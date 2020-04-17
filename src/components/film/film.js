import {createFilmCard} from './film-tpl.js';
import {createElement} from '../../utils.js';


class Film {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._film));
    }

    return this._element;
  }
}


export {Film};
