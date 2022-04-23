import { Response } from "express";

export function __error(res: Response, error: any, statusCode: number = 400): void {
  res.status(400).json({
    status: false,
    message: error.message,
    details: error.details || [],
  });
}