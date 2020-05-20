import {MovieModel} from '@models/movie';
import {Comment} from '@models/comment';


export class API {
  constructor(authorization) {
    this._authorization = authorization;

    this._getHeaders = this._getHeaders.bind(this);
  }

  getMovies() {
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, this._getHeaders())
      .then((response) => response.json())
      .then(MovieModel.parseMovies);
  }

  getComments(movieId) {
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${movieId}`, this._getHeaders())
      .then((response) => response.json())
      .then(Comment.parseComments);
  }

  updateMovies(movieId, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies/${movieId}`, {
      method: `PUT`,
      body: JSON.stringify(data.toRaw()),
      headers,
    })
      .then((response) => response.json())
      .then(MovieModel.parseMovie);
  }

  _getHeaders() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return {headers};
  }
}
