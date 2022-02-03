import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

import capitalizeFirstLetter from "helpers/capitalizeFirstLetter";

import { IError, IPostRequest, IRequest } from "interfaces/api.service";

import errors from "config/errors";

import accessToken from "constants/accessToken";

const baseAPI = axios.create({
  baseURL: "https://fuchs-platform-api-dev.azurewebsites.net/api/",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${accessToken}`,
  },
});

export default class ApiService {
  static async request({ api, options }: IRequest) {
    try {
      const response = await baseAPI.request({
        url: api,
        ...(options as AxiosRequestConfig),
        data: options.body,
      });

      return response.data;
    } catch (err: IError) {
      return Promise.reject(err);
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

  static redirectToErrorPage(message: IError) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    navigate(`/error/${message}`);
  }

  static createSearchParams(paramObj: {
    [key: string]: string | number | boolean;
  }) {
    const result = [];
    for (const param in paramObj) {
      if (paramObj[param] !== "") {
        result.push(
          encodeURIComponent(capitalizeFirstLetter(param)) +
            "=" +
            encodeURIComponent(paramObj[param])
        );
      }
    }
    return result.join("&");
  }
}

baseAPI.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const response = error.response;
    const canceledRequest = error.config;

    if (response && response.status) {
      switch (response.status) {
        case 400: {
          return Promise.reject({
            name: "Error",
            message:
              response.data?.errors?.Name[0] || "something wrong with data",
          });
        }
        case 401:
          if ((canceledRequest as Record<string, unknown>)._isOriginal) break;

          (canceledRequest as Record<string, unknown>)._isOriginal = true;

          if (
            canceledRequest.headers &&
            canceledRequest.headers.authorization !== `Bearer ${accessToken}`
          ) {
            return baseAPI(canceledRequest);
          }

          ApiService.redirectToErrorPage(errors.ACCESS_FORBIDDEN.code);
          // !there should be some token cleaner
          // window.location.reload();
          break;
        case 403:
          ApiService.redirectToErrorPage(errors.ACCESS_FORBIDDEN.code);
          break;
        case 404:
          ApiService.redirectToErrorPage(errors.NOT_FOUND.code);
          break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 505:
          ApiService.redirectToErrorPage(errors.SERVER_TROUBLE.code);
          break;
        default:
          ApiService.redirectToErrorPage(errors.UNEXPECTED.code);
          break;
      }
    }
  }
);
