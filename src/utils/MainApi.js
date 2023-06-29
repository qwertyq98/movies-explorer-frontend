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

}

const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default mainApi;