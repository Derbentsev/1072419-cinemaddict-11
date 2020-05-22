import {createCommentTemplate} from './comment-tpl';
import {AbstractSmartComponent} from '@components/abstract-smart-component';
import {remove} from '@utils/render';


export class CommentComponent extends AbstractSmartComponent {
  constructor(comment) {
    super();

    this._comment = comment;

    this.remove = this.remove.bind(this);
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  setOnDeleteClick(cb) {
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, cb);
  }

  remove() {
    remove(this);
  }
}
