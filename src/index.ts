/// <reference types="node" />
import express from 'express';
import * as http from 'http';
import config from './config';
import { initializeSocket } from './socket';
import { internalSocket } from './socket/client';
import indexRouter from './routes';
import discordRouter from './routes/discord';

const app = express();
// const http = require('http').Server(app);
const server = http.createServer(app);

// configure the socketIO
initializeSocket(server);

// routings
app.use('/discord', discordRouter);
app.use('/', indexRouter);

// store internal socket client as app local variable.
app.locals.internalSocket = internalSocket;

server.listen(config.port, () => {
  console.log(`The server is running on port ${config.port}.`);
});
