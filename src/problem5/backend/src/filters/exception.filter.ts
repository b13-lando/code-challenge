import { Request, Response, NextFunction } from "express";

// Optional: simple in-memory cache for last N errors
const errorCache: any[] = [];
const MAX_CACHE_SIZE = 100;

export function exceptionFilter(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Cache the error
  if (errorCache.length >= MAX_CACHE_SIZE) {
    errorCache.shift(); // remove oldest
  }
  errorCache.push({
    message: err.message,
    stack: err.stack,
    path: req.path,
    timestamp: new Date().toISOString(),
  });

  // Log the error
  console.error("Unhandled exception:", err);

  // Return generic 5xx response
  res.status(500).json({
    message: "Internal server error",
  });
}

// Optional: helper to get cached errors
export function getErrorCache() {
  return errorCache;
}
