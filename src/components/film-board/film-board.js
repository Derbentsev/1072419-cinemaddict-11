import {createFilmBoard} from './film-board-tpl';
import {AbstractComponent} from '../abstract-component';


export class FilmBoard extends AbstractComponent {
  getTemplate() {
    return createFilmBoard();
  }
}
