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
 
import partyRoutes from "@/modules/party/party.routes.js";
import attendanceRoutes from "@/modules/attendance/attendance.routes.js";
import invoiceRoutes from "@/modules/invoice/invoice.routes.js";
import ledgerRoutes from "@/modules/ledger/ledger.routes.js";
import paymentRoutes from "@/modules/payment/payment.routes.js";
import reportsRoutes from "@/modules/reports/reports.routes.js";
import workerRoutes from "@/modules/worker/worker.routes.js";
import workorderRoutes from "@/modules/workorder/workorder.routes.js";
 
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
 
  app.use("/api/v1/party", partyRoutes);
  app.use("/api/v1/attendance", attendanceRoutes);
  app.use("/api/v1/invoice", invoiceRoutes);
  app.use("/api/v1/ledger", ledgerRoutes);
  app.use("/api/v1/payment", paymentRoutes);
  app.use("/api/v1/reports", reportsRoutes);
  app.use("/api/v1/worker", workerRoutes);
  app.use("/api/v1/workorder", workorderRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
