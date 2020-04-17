import {createFilmPopup} from './film-popup-tpl.js';

class FilmPopup {
  constructor(film) {
    this._film = film;
  }

  getTemplate() {
    return createFilmPopup(this._film);
  }
}


export {FilmPopup};
