import { MOVIES_API_URL } from "./constants";

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  makeResponse(url, params) {
    return fetch(`${this.baseUrl}/${url}`, {
      ...params,
      headers: this.headers
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialMovies() {
    return this.makeResponse('beatfilm-movies', {
      metod: 'GET',
    });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default moviesApi;