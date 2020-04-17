import {
  createCommentMarkup
} from './comment-tpl.js';


class Comment {
  constructor(comment) {
    this._commet = comment;
  }

  getTemplate() {
    return createCommentMarkup(this._commet);
  }
}


export {Comment};
