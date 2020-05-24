import {MovieModel} from '@models/movie';
import {CommentModel} from '@models/comment';


const isOnline = () => {
  return window.navigator.onLine;
};


export class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getMovies() {
    if (isOnline()) {
      this._api.getMovies()
        .then((movies) => {
          movies.forEach((movie) => this._store.setItem(movie.id, movie.toRaw()));

          return movies;
        });
    }

    const storeMovies = Object.values(this._store.getItems());

    return Promise.resolve(MovieModel.parseMovies(storeMovies));
  }

  updateMovies(movieId, data) {
    if (isOnline()) {
      return this._api.updateMovies(movieId, data)
        .then((newMovie) => {
          this._store.setItem(newMovie.id, newMovie.toRaw());

          return newMovie;
        });
    }

    const localMovie = MovieModel.clone(Object.assign(data, {movieId}));

    this._store.setItem(movieId, localMovie.toRaw());

    return Promise.resolve(localMovie);
  }

  getComments(movieId) {
    if (isOnline()) {
      return this._api.getComments(movieId)
        .then((comments) => {
          comments.forEach((comment) => this._store.setItem(comment.id, comment.toRaw()));

          return comments;
        });
    }

    const storeComments = Object.values(this._store.getItems());

    return Promise.resolve(CommentModel.parseComments(storeComments));
  }

  createComment(movieId, comment) {
    if (isOnline()) {
      return this._api.createComment(movieId, comment);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  deleteComment(commentId) {
    if (isOnline()) {
      this._api.deleteComment(commentId)
        .then(() => this._store.removeItem(commentId));
    }

    this._store.removeItem(commentId);

    return Promise.resolve();
  }
}
