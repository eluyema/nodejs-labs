import { ServerResponse } from "http";
import { ContentTypes } from "../constants/constants.js";
import { IResponseHelpers } from "../types/router.js";

export const safeJSON = (data: string, fallback: object = {}): object => {
  try {
    return JSON.parse(data);
  } catch {
    return fallback;
  }
};

export const processedContentTypes = {
  [ContentTypes.TEXT_HTML]: (text: string) => text,
  [ContentTypes.TEXT_PLAIN]: (text: string) => text,
  [ContentTypes.JSON]: (json: string) => safeJSON(json, {}),
  [ContentTypes.FORM_URLENCODED]: (data: string) => {
    return Object.fromEntries(new URLSearchParams(data));
  },
};

export const getPayload = (rawRequest: string, contentTypeHeader: string) => {
  let payload = {};
  const contentType = contentTypeHeader.split(";")[0];
  if (contentType in processedContentTypes) {
    payload = processedContentTypes[contentType as keyof typeof processedContentTypes](rawRequest);
  }
  return payload;
};

function json(this: ServerResponse, data: object) {
  this.end(JSON.stringify(data));
}

export const responseHelpers: IResponseHelpers = { json };
