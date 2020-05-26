const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const ResponseStatus = {
  OK_MIN: `200`,
  OK_MAX: `299`,
};

const PATH_TO_SERVER = `https://11.ecmascript.pages.academy/cinemaddict`;

const checkStatus = (response) => {
  if (response.status >= ResponseStatus.OK_MIN && response.status <= ResponseStatus.OK_MAX) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getMovies() {
    const url = `${PATH_TO_SERVER}/movies/`;

    return this._load({url})
      .then((response) => response.json());
  }

  getComments(movieId) {
    const url = `${PATH_TO_SERVER}/comments/${movieId}`;

    return this._load({url})
      .then((response) => response.json());
  }

  createComment(movieId, comment) {
    return this._load({
      url: `${PATH_TO_SERVER}/comments/${movieId}`,
      method: Method.POST,
      body: JSON.stringify(comment.toRaw()),
      headers: new Headers({'Content-Type': `application/json`})
    });
  }

  deleteComment(commentId) {
    return this._load({
      url: `${PATH_TO_SERVER}/comments/${commentId}`,
      method: Method.DELETE,
    });
  }

  updateMovie(movieId, data) {
    return this._load({
      url: `${PATH_TO_SERVER}/movies/${movieId}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRaw()),
      headers: new Headers({'Content-Type': `application/json`})
    })
    .then((response) => response.json());
  }

  sync(data) {
    return this._load({
      url: `movies/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then((response) => response.json());
  }


  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(url, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
