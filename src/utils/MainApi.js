import { MAIN_API_URL } from "./constants";

class MainApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  makeResponse(url, params) {
    return fetch(`${this.baseUrl}/${url}`, {
      ...params,
      headers: this.headers,
      credentials: 'include',
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    
    return res.json().then(data => {
      return Promise.reject(data.message);
    });
  }

  register = (name, email, password) => {
    return this.makeResponse('signup', {
      method: 'POST',
      body: JSON.stringify({name, email, password})
    });
  }

  authorize = (email, password) => {
    return this.makeResponse('signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  checkToken = () => {
    return this.makeResponse('users/me', {
      method: 'GET',
    });
  };

  getUserInfo() {
    return this.makeResponse('users/me', {
      method: 'GET',
    });
  }

  setUserInfo(userData) {
    return this.makeResponse('users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: userData.text, 
        email: userData.email
      })
    });
  }

  getInitialSavedMovies() {
    return this.makeResponse('movies', {
      metod: 'GET',
    });
  }

  deleteMovie(id) {
    return this.makeResponse(`movie/${id}`, {
      method: 'DELETE',
    });
  }

  addNewMovie(data) {
    return this.makeResponse('movies', {
      method: 'POST',
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co/${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      })
    });
  }

  logout = () => {
    return this.makeResponse('signout', {
      method: 'POST'
    });
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default mainApi;