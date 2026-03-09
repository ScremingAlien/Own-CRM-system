import compression from "compression";
import cors from "cors";
import type { Application } from "express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { logger } from "./infra/logger.js";
import { requestIdMiddleware } from "./middlewares/default/requestId.middleware.js";
import errorHandler from "@/middlewares/default/errorHandler.js";
import notFound from "@/middlewares/default/notFound.js";
import { responseFormatter } from "@/middlewares/default/responseFormatter.js";
import todoRoutes from "@/modules/todo/todo.routes.js";
import partyRoutes from "@/modules/party/party.routes.js";

export function createApp(): Application {
  const app: Application = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(compression());
  app.use(morgan("dev"));

  app.use(responseFormatter);
  app.use(requestIdMiddleware);

  app.use((req, _res, next) => {
    logger.info({ method: req.method, url: req.url }, "Incoming request");
    next();
  });

  app.use("/api/v1/todo", todoRoutes);
  app.use("/api/v1/party", partyRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
