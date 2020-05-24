const isOnline = () => {
  return window.navigator.onLine;
};


export class Provider {
  constructor(api) {
    this._api = api;
  }

  getMovies() {
    if (isOnline()) {
      this._api.getMovies();
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  updateMovies(movieId, data) {
    if (isOnline()) {
      return this._api.updateMovies(movieId, data);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  getComments(movieId) {
    if (isOnline()) {
      return this._api.getComments(movieId);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  createComment(movieId, comment) {
    if (isOnline()) {
      return this._api.createComment(movieId, comment);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  deleteComment(commentId) {
    if (isOnline()) {
      this._api.deleteComment(commentId);
    }

    return Promise.reject(`offline logic is not implemented`);
  }
}
