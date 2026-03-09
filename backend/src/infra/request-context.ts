import { AsyncLocalStorage } from "async_hooks";

type RequestContext = {
  requestId: string;
};

export const requestContext = new AsyncLocalStorage<RequestContext>();

export function getRequestId(): string | undefined {
  return requestContext.getStore()?.requestId;
}
