export class CommentModel {
  constructor() {
    this._comments = null;

    this._onDataChange = [];
  }

  setComments(comments) {
    this._comments = comments;
  }

  getComments() {
    return this._comments;
  }

  setOnDataChange(handler) {
    this._onDataChange.push(handler);
  }

  removeComment(id) {
    this._comments.splice(id, 1);
  }

  addComment(comment) {
    this._comments.push(comment);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
