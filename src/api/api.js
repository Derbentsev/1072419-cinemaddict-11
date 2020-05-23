const Method = {
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export class API {
  constructor(authorization) {
    this._authorization = authorization;

    this._getHeaders = this._getHeaders.bind(this);
  }

  getMovies() {
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, this._getHeaders())
      .then(checkStatus)
      .then((response) => response.json());
  }

  getComments(movieId) {
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${movieId}`, this._getHeaders())
      .then(checkStatus)
      .then((response) => response.json());
  }

  createComment(movieId, comment) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${movieId}`, {
      method: Method.POST,
      body: JSON.stringify(comment.toRaw()),
      headers,
    })
      .then(checkStatus)
      .then((response) => response.json());
  }

  deleteComment(commentId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${commentId}`, {
      method: Method.DELETE,
      headers,
    })
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  updateMovies(movieId, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies/${movieId}`, {
      method: Method.PUT,
      body: JSON.stringify(data.toRaw()),
      headers,
    })
      .then((response) => response.json());
  }

  _getHeaders() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return {headers};
  }
}
