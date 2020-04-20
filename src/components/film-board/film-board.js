import {createFilmBoard} from './film-board-tpl.js';
import {createElement} from '../../utils.js';


class FilmBoard {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmBoard();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


export {FilmBoard};
