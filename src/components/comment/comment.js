import {
  createCommentMarkup
} from './comment-tpl';
import {
  AbstractComponent
} from '../abstract-component';


export class Comment extends AbstractComponent {
  constructor(comment) {
    super();

    this._commet = comment;
  }

  getTemplate() {
    return createCommentMarkup(this._commet);
  }

  setOnDeleteClick(cb) {
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, cb);
  }
}
