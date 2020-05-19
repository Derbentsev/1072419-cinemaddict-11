import {createFilmBoard} from './film-board-tpl';
import {AbstractComponent} from '@components/abstract-component';


export class FilmBoard extends AbstractComponent {
  getTemplate() {
    return createFilmBoard();
  }
}
