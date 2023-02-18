import { Response } from 'express';

export const generateResponseError = (res: Response, status: number, message: string, details?: object) => {
  return res.status(status).json({
    type: status<500 ? 'ERROR' : 'FATAL',
    message,
    details
  })
}