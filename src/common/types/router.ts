import { IncomingMessage, ServerResponse } from "http";
import { HTTPMethods } from "../constants/constants";

export type Obj = {
  [propName: string]: string;
};

export interface IResponseHelpers {
  json: (this: ServerResponse, data: object) => void;
}

export interface RouterResponse extends IResponseHelpers, ServerResponse {}

export interface RouteHandler<PayloadT = unknown> {
  (req: IncomingMessage, res: RouterResponse, payload: PayloadT): Promise<void>;
}

export type RouteEntry = [typeof HTTPMethods[keyof typeof HTTPMethods], string, RouteHandler];

export type RoutesI = {
  [method in keyof typeof HTTPMethods]: <PayloadT>(
    pathname: string,
    handler: RouteHandler<PayloadT>
  ) => Promise<void>;
};

export type RouterI = {
  __proto__: object;
  routes: Array<RouteEntry>;
  handle: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
} & RoutesI;
