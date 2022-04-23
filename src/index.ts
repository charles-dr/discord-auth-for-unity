/// <reference types="node" />
import express from 'express';
import * as http from 'http';
import config from './config';
import { initializeSocket } from './socket';
import indexRouter from './routes';

const app = express();
// const http = require('http').Server(app);
const server = http.createServer(app);

initializeSocket(server);

app.use('/', indexRouter);

server.listen(config.port, () => {
  console.log(`The server is running on port ${config.port}.`);
});
