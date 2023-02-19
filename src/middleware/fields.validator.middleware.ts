import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { generateResponseError } from '../helpers/errors.generator.helper';


export const validateFields = (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return generateResponseError(response,400,'Invalid Parameters',errors);
  }
  next();
}