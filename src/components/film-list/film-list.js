import {AbstractComponent} from "../abstract-component";
import {createFilmList} from './film-list-tpl';


export class FilmList extends AbstractComponent {
  getTemplate() {
    return createFilmList();
  }
}
