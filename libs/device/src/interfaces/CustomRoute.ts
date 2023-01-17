export type CustomRequest = {
  path: string;
  method: CustomRequestMethod;
  body?: object;
};

export enum CustomRequestMethod {
  GET = 'GET',
  POST = 'POST',
}

export type CustomRouteResponse = object | string | void;
