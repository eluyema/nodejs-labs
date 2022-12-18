import { IncomingMessage, ServerResponse } from "http";
import { ContentTypes, HTTPMethods } from "./common/constants/constants.js";
import { RouteEntry, RouteHandler, RouterI } from "./common/types/router.js";
import { getPayload, responseHelpers } from "./common/utils/index.js";

const defaultHandler: RouteHandler = async (_req, res, _payload) => {
  res.writeHead(501, {
    "Content-Type": ContentTypes.JSON,
  });
  res.json({
    message: "Method not implemented",
  });
};

function Router(
  { routes = [], base = "" }: { routes?: Array<RouteEntry>; base?: string } = {
    routes: [],
    base: "",
  }
) {
  return {
    __proto__: new Proxy(
      {},
      {
        get:
          (_, httpMethod: keyof typeof HTTPMethods, receiver) =>
          (pathname: string, handler: RouteHandler) => {
            if (httpMethod in HTTPMethods) {
              const route: RouteEntry = [HTTPMethods[httpMethod], base + pathname, handler];
              routes.push(route);
            }
            return receiver;
          },
      }
    ),
    routes,
    async handle(req: IncomingMessage, res: ServerResponse) {
      const url = new URL(req.url || "/", `https://${req.headers.host}`);
      let payload = {};
      let rawRequest = "";
      for await (const chunk of req) {
        rawRequest += chunk;
      }
      if (req.headers["content-type"]) {
        payload = getPayload(rawRequest, req.headers["content-type"]);
      }
      let methodWasFound = false;
      for (const [method, routePathname, handler] of routes) {
        if (
          (method === req.method || method === HTTPMethods.ALL) &&
          routePathname == url.pathname
        ) {
          methodWasFound = true;
          handler(req, Object.assign(res, responseHelpers), payload);
        }
      }
      if (!methodWasFound) {
        defaultHandler(req, Object.assign(res, responseHelpers), payload);
      }
    },
  } as RouterI;
}

export { Router };
