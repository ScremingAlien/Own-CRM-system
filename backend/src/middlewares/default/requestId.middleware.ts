import { randomUUID } from "crypto";
import type { Request, Response, NextFunction } from "express";

import { requestContext } from "@/infra/request-context.js";

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const incomingId = req.header("x-request-id");
  const requestId = incomingId || randomUUID();

  requestContext.run({ requestId }, () => {
    res.setHeader("x-request-id", requestId);
    next();
  });
}
