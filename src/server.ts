import express, { Application } from "express";

class Server {

  private app : Application;
  private port : string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`INFO - Listening at http://0.0.0.0:${this.port}`);
    })
  }
}

export default Server;