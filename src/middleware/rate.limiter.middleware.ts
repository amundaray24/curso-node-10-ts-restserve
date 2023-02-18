import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

import { generateResponseError } from '../helpers/errors.generator.helper';

export default rateLimit({
	windowMs: 15 * 60 * 1000,   // 10 minutes
	max: 20,                    // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true,      // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false,       // Disable the `X-RateLimit-*` headers
  message: (req: Request, res: Response) => generateResponseError(res,400,'Invalid rate calls')
});
