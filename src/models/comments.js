export default class CommentsModel {
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
    this._comments.find((comment, index) => {
      if (comment.id === id) {
        this._comments.splice(index, 1);
        return true;
      }

      return false;
    });
  }

  addComment(comment) {
    this._comments.push(comment);
  }
}
