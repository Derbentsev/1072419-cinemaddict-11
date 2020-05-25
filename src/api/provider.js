import {MovieModel} from '@models/movie';
import {CommentModel} from '@models/comment';
import {nanoid} from 'nanoid';


export class Provider {
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

  updateMovies(movieId, data) {
    if (this._isOnline()) {
      return this._api.updateMovies(movieId, data)
        .then(MovieModel.parseMovies)
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
    return new Promise((resolve) => {
      if (this._isOnline()) {
        this._api.getComments(movieId)
        .then(CommentModel.parseComments)
          .then((comments) => {
            comments.forEach((comment) => this._store.setItem(comment.id, comment.toRaw()));

            resolve(comments);
          });

        return;
      }

      const storeComments = Object.values(this._store.getItems());
      resolve(CommentModel.parseComments(storeComments));
    });
  }

  createComment(movieId, comment) {
    if (this._isOnline()) {
      return this._api.createComment(movieId, comment)
        .then((newComment) => {
          this._store.setItem(newComment.id, newComment.toRaw());

          return newComment;
        });
    }

    const localNewCommentId = nanoid();
    const localNewComment = CommentModel.clone(Object.assign(comment, {id: localNewCommentId}));

    this._store.setItem(localNewComment.id, localNewComment.toRaw());

    return Promise.resolve(localNewComment);
  }

  deleteComment(commentId) {
    if (this._isOnline()) {
      this._api.deleteComment(commentId)
        .then(() => this._store.removeItem(commentId));
    }

    this._store.removeItem(commentId);

    return Promise.resolve();
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
