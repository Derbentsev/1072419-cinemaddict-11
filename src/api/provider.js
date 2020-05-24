export class Provider {
  constructor(api) {
    this._api = api;
  }

  getMovies() {
    this._api.getMovies();
  }

  updateMovies(movieId, data) {
    return this._api.updateMovies(movieId, data);
  }

  getComments(movieId) {
    return this._api.getComments(movieId);
  }

  createComment(movieId, comment) {
    return this._api.createComment(movieId, comment);
  }

  deleteComment(commentId) {
    this._api.deleteComment(commentId);
  }
}
