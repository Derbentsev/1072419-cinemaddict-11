import AbstractComponent from "@components/abstract-component";
import {createFilmList} from './film-list-tpl';


export default class FilmList extends AbstractComponent {
  getTemplate() {
    return createFilmList();
  }
}
