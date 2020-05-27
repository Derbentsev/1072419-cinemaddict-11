import {createCommentTemplate} from './comment-tpl';
import AbstractSmartComponent from '@components/abstract-smart-component';
import {remove} from '@utils/render';

const DeleteButtonText = {
  DELETING: `Deleting...`,
  DELETE: `Delete`,
};


export default class Comment extends AbstractSmartComponent {
  constructor(comment) {
    super();

    this._comment = comment;

    this.remove = this.remove.bind(this);
    this.toggleDisableDeleteButton = this.toggleDisableDeleteButton.bind(this);
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

  toggleDisableDeleteButton() {
    const deleteButton = this.getElement().querySelector(`.film-details__comment-delete`);

    deleteButton.disabled = !deleteButton.disabled;

    if (deleteButton.textContent === DeleteButtonText.DELETING) {
      deleteButton.textContent = DeleteButtonText.DELETE;
    } else {
      deleteButton.textContent = DeleteButtonText.DELETING;
    }
  }
}
