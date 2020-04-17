import {
  createCommentMarkup
} from './comment-tpl.js';
import {createElement} from '../../utils.js';


class Comment {
  constructor(comment) {
    this._commet = comment;
    this._element = null;
  }

  getTemplate() {
    return createCommentMarkup(this._commet);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}


export {Comment};
