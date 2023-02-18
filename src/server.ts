import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import PathModel from './entities/server/path.entity';
import checkRateLimiter from './middleware/rate.limiter.middleware';
import { defaultError404, defaultError500 } from './middleware/default.errors.handler.middleware';
import loggerHelper from './helpers/logger.helper';

class Server {

  private app : Application;
  private port : string;
  private paths: Array<PathModel>;

  constructor() {
    this.app = express();
    this.app.disable('x-powered-by');
    this.port = process.env.PORT || '3000';

    this.paths = []

    //Middleware's
    this.middleware();
    //Routes
    this.routes();
  }

  middleware() {
    //Cors
    this.app.use(cors());
    //Helmet
    this.app.use(helmet());
    //Rate limiter
    this.app.use(checkRateLimiter);
    //Json Parser
    this.app.use(express.json());
  }

  routes() {
    this.paths.forEach(async (routeItem) => {
      this.app
      this.app.use(routeItem.path , routeItem.route.router);
    });
    this.app.use(defaultError404);
    this.app.use(defaultError500);
  }



  listen() {
    this.app.listen(this.port, () => {
      loggerHelper.info(`Listening at http://0.0.0.0:${this.port}`);
    })
  }
}

export default Server;
