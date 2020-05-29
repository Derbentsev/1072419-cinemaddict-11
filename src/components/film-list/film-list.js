import AbstractComponent from "@components/abstract-component";
import {createFilmList} from './film-list-tpl';


export default class FilmList extends AbstractComponent {
  getTemplate() {
    return createFilmList();
  }

  getCommentListElement() {
    return this.getElement().querySelector(`.films-list__container`);
  }

  clearFilmListContainer() {
    this.getElement().querySelector(`.films-list__container`).innerHTML = ``;
  }
}
