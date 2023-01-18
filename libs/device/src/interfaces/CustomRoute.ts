export type CustomRequest = {
  path: string;
  method: CustomRequestMethod;
  body?: unknown;
};

export enum CustomRequestMethod {
  GET = 'GET',
  POST = 'POST',
}

export type CustomRouteResponse = object | string | void;
