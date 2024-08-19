import http from 'http'
import express from "express";
import { Server } from 'socket.io'

import loader from "./loader/index.js";

const app = express();
const server = http.createServer(app);

loader({ expressApp: app });

const io = new Server(server, {
  cors: {
    origin: '*', // Update with your React app's URL for production
  },
});

server.listen(3333, () => {
  console.log(`Your server is ready !`);
});

export { io }
