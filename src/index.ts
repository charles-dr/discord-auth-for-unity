import express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';
import config from './config';
import { initializeSocket } from './modules/socketServer';
import { internalSocket } from './modules/socketClient';
import { initializeBot } from './modules/discordBot';
import indexRouter from './routes';
import discordRouter from './routes/discord';

const app = express();
const server = http.createServer(app);

// configure the socketIO
initializeSocket(server);
initializeBot();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// routings
app.use('/discord', discordRouter);
app.use('/', indexRouter);

// store internal socket client as app local variable.
app.locals.internalSocket = internalSocket;

server.listen(config.port, () => {
  console.log(`The server is running on port ${config.port}.`);
});
