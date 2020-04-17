import {createFilmCard} from './film-tpl.js';


class Film {
  constructor(film) {
    this._film = film;
  }

  getTemplate() {
    return createFilmCard(this._film);
  }
}


export {Film};
