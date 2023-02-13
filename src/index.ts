import dotenv from "dotenv";
import Server from "./server";

//Dotenv Configurations
dotenv.config();

//Init Server
const server = new Server();
server.listen();