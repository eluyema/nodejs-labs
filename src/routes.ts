import { ContentTypes } from "./common/constants/constants.js";
import { Router } from "./router.js";

const router = Router();

type PayloadDTO = {
  message: string;
};

router.GET<PayloadDTO>("/", async (_req, res, payload) => {
  res.writeHead(200, { "Content-Type": ContentTypes.JSON });
  res.json(payload);
});

router.POST<PayloadDTO>("/", async (_req, res, payload) => {
  res.writeHead(200, { "Content-Type": ContentTypes.JSON });
  res.json(payload);
});

router.DELETE<PayloadDTO>("/", async (_req, res, payload) => {
  res.writeHead(200, { "Content-Type": ContentTypes.JSON });
  res.json(payload);
});

router.PUT<PayloadDTO>("/", async (_req, res, payload) => {
  res.writeHead(200, { "Content-Type": ContentTypes.JSON });
  res.json(payload);
});

export { router };
