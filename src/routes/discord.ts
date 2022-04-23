import express, { Request, Response } from 'express';
// import { Validator } from 'node-input-validator';
import config from '../config';
import { SocketEvent } from '../constants';
// import { ValidationError } from '../utils/errors';
import { __error } from '../utils/common';
import {
  getOAuth2Token,
  getGuildList,
  getAuthRedirectUrl,
} from '../utils/discord';
import {
  checkUserInCommunity
} from '../modules/discordBot';

const router = express.Router();

router.route('/check-user-in/:userId').get((req: Request, res: Response) => {
  return checkUserInCommunity(req.params.userId)
    .then(user => {
      return res.json({
        status: true,
        user,
      });
    })
    .catch(error => {
      return res.json({
        status: false,
        message: error.message,
        user: null,
      });
    });
});

router.route('/authorize/:socketId').get((req: Request, res: Response) => {
  const authorizationCode = req.query.code as string;
  const socketId = req.params.socketId;
  const socketClient = req.app.locals.internalSocket;

  return getOAuth2Token(authorizationCode, socketId)
    .then(token => getGuildList(token))
    .then(guilds => {
      const guild = guilds.find(g => g.id === config.discord.communityServerId);

      if (!guild) {
        throw new Error('You are not the member of the community server!');
      }

      // process success response
      // to-do: database or session process.
      socketClient.emit(SocketEvent.INTERNAL_AUTHORIZE, {
        status: true,
        socketId,
      });
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
    });
});

/**
 * @description generate an authorization url according to the socket Id.
 * @param { string } socketId the ID of the unity application socket Id.
 * @returns { string } authorization url
 */
router.route('/generate-url').post((req: Request, res: Response) => {
  const socketId = req.body.socketId as string;
  const redirectUri = getAuthRedirectUrl(socketId);
  const url = `https://discord.com/api/oauth2/authorize?client_id=${
    config.discord.clientId
  }&redirect_uri=${encodeURIComponent(
    redirectUri,
  )}&response_type=code&scope=${config.discord.scopes.join('%20')}`;
  // https://discord.com/api/oauth2/authorize?client_id=695192092061859850&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fauthorize%2FW56TQTarRltevOnvAAAB&response_type=code&scope=guilds%20identify
  // https://discord.com/api/oauth2/authorize?client_id=695192092061859850&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fauthorize%2F814uX2p32DgQ-3DsAAAB&response_type=code&scope=identity%20guilds
  res.json({ url });
});

export default router;
