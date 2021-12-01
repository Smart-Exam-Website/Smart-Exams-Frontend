export class Network {
  constructor() {
    this.jwt = "";
  }

  static async fetch(url, init, addAuth) {
    this.jwt = localStorage.getItem("token");
    const response = await fetch(url, {
      mode: "cors",
      ...init,
      headers: Network.getHeaders(init.headers, addAuth),
    });
    let promise;
    if (!response.ok) {
      promise = Network.handleErrorsBasedOnStatus(response);
    } else if (response.status === 204) {
      promise = Promise.resolve({});
    } else {
      promise = response.json();
    }
    return promise;
  }

  static getHeaders(originalHeaders, addAuth) {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (addAuth) {
      headers.Authorization = `Bearer ${this.jwt}`;
    }

    headers = {
      ...headers,
      ...originalHeaders,
    };

    return headers;
  }
  static handleErrorsBasedOnStatus(response) {
    let promise;

    switch (response.status) {
      case 400:
        promise = response.json().then((data) => {
          return Promise.reject(data);
        });
        break;
      case 422:
        promise = response.json().then((data) => {
          return Promise.reject(data);
        });
        break;
      case 429:
        promise = response.json().then((data) => {
          return Promise.reject(data);
        });
        break;
      case 401:
      case 403:
        promise = response.json().then((data) => {
          return Promise.reject(data);
        });
        break;

      default:
        promise = response.json().then((data) => {
          return Promise.reject(data);
        });
    }
    return promise.catch((error) => {
      return Promise.reject(error);
    });
  }
}
