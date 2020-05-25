import AbstractComponent from "@components/abstract-component";
import {createFilmListExtra} from './film-list-extra-tpl';


export default class FilmListExtra extends AbstractComponent {
  constructor(title) {
    super();

    this._title = title;
  }

  getTemplate() {
    return createFilmListExtra(this._title);
  }
}
