import { AxiosError } from "axios";

export interface IRequest {
  api: "customer" | string;
  options: RequestInit;
}

export interface IPostRequest extends IRequest {
  body: BodyInit | string | Record<string, unknown>;
}

export type IError = AxiosError | unknown;
