import MovieModel from '@models/movie';
import CommentModel from '@models/comment';

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getMovies() {
    return new Promise((resolve) => {
      if (this._isOnline()) {
        this._api.getMovies()
          .then(MovieModel.parseMovies)
          .then((movies) => {
            const items = this._createStoreStructure(movies.map((movie) => movie.toRaw()));
            this._store.setItems(items);

            resolve(movies);
          });
        return;
      }

      const storeMovies = Object.values(this._store.getItems());
      resolve(MovieModel.parseMovies(storeMovies));
    });
  }

  updateMovie(movieId, data) {
    return new Promise((resolve) => {
      if (this._isOnline()) {
        this._api.updateMovie(movieId, data)
          .then(MovieModel.parseMovie)
          .then((newMovie) => {
            this._store.setItem(newMovie.id, newMovie.toRaw());

            resolve(newMovie);
          });
      }

      const localMovie = MovieModel.clone(Object.assign(data, {movieId}));
      this._store.setItem(movieId, localMovie.toRaw());

      resolve(localMovie);
    });
  }

  getComments(movieId) {
    return new Promise((resolve) => {
      if (this._isOnline()) {
        this._api.getComments(movieId)
        .then((comments) => {
          resolve(CommentModel.parseComments(comments));
        });
      }

      return;
    });
  }

  createComment(movieId, comment) {
    return new Promise((resolve) => {
      if (this._isOnline()) {
        this._api.createComment(movieId, comment)
          .then((newComment) => {
            resolve(newComment);
          });
      }

      return;
    });
  }

  deleteComment(commentId) {
    return new Promise((resolve) => {
      if (this._isOnline()) {
        this._api.deleteComment(commentId)
          .then(() => {
            resolve();
          });

        return;
      }

      resolve();
    });
  }

  sync() {
    if (this._isOnline()) {
      const storeMovies = Object.values(this._store.getItems());

      return this._api.sync(storeMovies)
        .then((response) => {
          const createdMovies = this._getSyncedMovies(response.created);
          const updatedMovies = this._getSyncedMovies(response.updated);

          const items = this._createStoreStructure([...createdMovies, ...updatedMovies]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }


  _isOnline() {
    return window.navigator.onLine;
  }

  _getSyncedMovies(items) {
    return items.filter(({success}) => success)
      .map(({payload}) => payload.movie);
  }

  _createStoreStructure(items) {
    return items.reduce((acc, current) => {
      return Object.assign({}, acc, {
        [current.id]: current,
      });
    });
  }
}
