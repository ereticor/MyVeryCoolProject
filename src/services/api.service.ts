// interface IApiService {
//   baseUrl?: string;
//   headers?: Headers;
// }

import capitalizeString from "helpers/capitalizeString";

export interface IRequest {
  api: "customer" | string;
  options: RequestInit;
}

export default class ApiService {
  static basicOptions = {
    headers: new Headers({
      "Content-type": "application/json",
      authorization: `Bearer ${"access token"}`,
    }),
  };

  static baseUrl = "https://fuchs-platform-api-dev.azurewebsites.net/api/";

  static async request({ api, options }: IRequest) {
    try {
      const promise = await fetch(this.baseUrl + api, {
        ...this.basicOptions,
        ...options,
      });
      const response = await promise.json();
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  static async get({ api, options }: IRequest) {
    return this.request({ api, options: { ...options, method: "GET" } });
  }
  static async post({ api, options }: IRequest) {
    return this.request({ api, options: { ...options, method: "POST" } });
  }
  static async delete({ api, options }: IRequest) {
    return this.request({ api, options: { ...options, method: "DELETE" } });
  }
  static createSearchParams(paramObj: {
    [key: string]: string | number | boolean;
  }) {
    const result = [];
    for (const param in paramObj) {
      if (paramObj[param] !== "") {
        result.push(
          encodeURIComponent(capitalizeString(param)) +
            "=" +
            encodeURIComponent(paramObj[param])
        );
      }
    }
    return result.join("&");
  }
}
