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

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
