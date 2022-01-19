import history from "store/history";

import capitalizeString from "helpers/capitalizeString";

import reqErrors from "constants/reqErrors";
import accessToken from "constants/accessToken";

export interface IRequest {
  api: "customer" | string;
  options: RequestInit;
  body?: BodyInit | string | Record<string, unknown>;
}

export interface IPostRequest extends IRequest {
  body: BodyInit | string | Record<string, unknown>;
}

export default class ApiService {
  static basicOptions = {
    headers: new Headers({
      "Content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    }),
  };

  static baseUrl = "https://fuchs-platform-api-dev.azurewebsites.net/api/";

  static async request({ api, options }: IRequest) {
    try {
      const response = await fetch(this.baseUrl + api, {
        ...this.basicOptions,
        ...options,
      });

      if (!response.ok) {
        throw response;
      }

      const result = await response.json();
      return result;
    } catch (err: number | unknown) {
      if (err instanceof Response) {
        switch (err.status) {
          case 400:
            return err.json();
          case 401:
            // window.location.reload();
            break;
          case 403:
            this.redirectToErrorPage(reqErrors.ACCESS_FORBIDDEN);
            break;
          case 404:
            this.redirectToErrorPage(reqErrors.NOT_FOUND);
            break;
          case 500:
          case 501:
          case 502:
          case 503:
          case 504:
          case 505:
            this.redirectToErrorPage(reqErrors.SERVER_TROUBLE);
            break;
          default:
            this.redirectToErrorPage(reqErrors.UNEXPECTED + err);
            break;
        }
      }
    }
  }

  static async get({ api, options }: IRequest) {
    return this.request({ api, options: { ...options, method: "GET" } });
  }

  static async post({ api, options, body }: IPostRequest) {
    const jsonBody = JSON.stringify(body);
    return this.request({
      api,
      options: { ...options, body: jsonBody, method: "POST" },
    });
  }

  static async put({ api, options, body }: IPostRequest) {
    const jsonBody = JSON.stringify(body);
    return this.request({
      api,
      options: { ...options, body: jsonBody, method: "PUT" },
    });
  }

  static async delete({ api, options }: IRequest) {
    return this.request({ api, options: { ...options, method: "DELETE" } });
  }

  static redirectToErrorPage(message: string | Error) {
    history.push(`/error#${message}`);
    history.go(0);
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
