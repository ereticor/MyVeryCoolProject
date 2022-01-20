export interface IRequest {
  api: "customer" | string;
  options: RequestInit;
  body?: BodyInit | string | Record<string, unknown>;
}

export interface IPostRequest extends IRequest {
  body: BodyInit | string | Record<string, unknown>;
}

export type IError = unknown | Error;
