import type { Request, Response, NextFunction } from "express";
import { logger } from "@/infra/logger.js";
export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  logger.fatal(err.stack);

  res.status((err.cause as number) || 500).json({
    status: false,
    message: err.message || "Internal Server Error",
    timestamp: new Date().toISOString(),
    data: null,
    route: req.originalUrl,
  });
}
