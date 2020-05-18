import {Movie} from '@models/movie';
import {Comment} from '@models/comment';


export class API {
  constructor(authorization) {
    this._authorization = authorization;

    this._getHeaders = this._getHeaders.bind(this);
  }

  getMovies() {
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, this._getHeaders())
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }

  getComments(filmId) {
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${filmId}`, this._getHeaders())
      .then((response) => response.json())
      .then(Comment.parseComments);
  }

  _getHeaders() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return {headers};
  }
}
