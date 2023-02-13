import { Request, Response } from 'express';

import { generateResponseError } from '../helpers/errors.generator.helper';
import loggerHelper from '../helpers/logger.helper';

// CUSTOM 404 ERROR HANDLER
export const defaultError404 = (req: Request, res: Response) => {
  loggerHelper.warn(`INVALID PATH REQUEST ${req.originalUrl}`);
  generateResponseError(res,404,'Sorry can\'t find that!');
}

// CUSTOM 404 ERROR HANDLER
export const defaultError500 = (e: Error , req: Request, res: Response) => {
  loggerHelper.error(`UNHANDLED ERROR ON ${req.originalUrl}`,e);
  generateResponseError(res,500,'Something broke!');
}