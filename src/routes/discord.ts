import express, { Request, Response } from "express";
import { Validator } from 'node-input-validator';
import config from '../config';
import { SocketEvent } from '../constants';
import { ValidationError } from '../utils/errors';
import { __error } from '../utils/common';
import { getOAuth2Token, getGuildList } from '../utils/discord';

const router = express.Router();

router.route('/authorize/:socketId').get((req: Request, res: Response) => {
  const authorizationCode = req.query.code as string;
  const socketId = req.params.socketId;
  const socketClient = req.app.locals.internalSocket;

  return getOAuth2Token(authorizationCode, socketId)
    .then(token => getGuildList(token))
    .then(guilds => {
      const guild = guilds.find(g => g.id === config.discord.communityServerId);

      if (!guild) {
        throw new Error("You are not the member of the community server!");
      }

      // process success response
      // to-do: database or session process.
      socketClient.emit(SocketEvent.INTERNAL_AUTHORIZE, { status: true, socketId })
      res.send(`
        <html>
          <head><title>Authorization</title></head>
          <body>
            <h3>Success</h3>
          </body>
        </html>
      `);
    })
    .catch(error => {
      // response to the unity application.
      socketClient.emit(SocketEvent.INTERNAL_AUTHORIZE, {
        status: false,
        message: error.message,
        socketId,
      });

      // response to the browser.
      res.send(`
      <html>
        <head><title>Authorization</title></head>
        <body>
          <h3>Authorization Failed!</h3>
          <p>message: ${error.message}</p>
        </body>
      </html>
    `);
    })
})

export default router;