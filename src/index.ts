import http from "http";
import { router } from "./routes.js";

const port = Number(process.env.PORT || 3000);

const server = http.createServer(router.handle);

server.listen(port);
