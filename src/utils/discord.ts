import axios from 'axios';
import Qs from 'qs';
import type {
  IOAuth2TokenResponse,
  IGuild,
} from '../types';
import config from '../config';

export const getOAuth2Token = (code: string, socketId: string) => {

  const data = {
    client_id: config.discord.clientId,
    client_secret: config.discord.clientSecret,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: getAuthRedirectUrl(socketId),
    scope: config.discord.scopes.join(' '),
};

  return axios({
    method: 'post',
    url: 'https://discordapp.com/api/v6/oauth2/token',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: Qs.stringify(data),
  })
    .then(res => res.data as IOAuth2TokenResponse)
    .then(res => res.access_token);
}

export const getGuildList = (token: string) => {
  return axios({
    method: 'GET',
    url: 'https://discordapp.com/api/v6/users/@me/guilds',
    headers: {
        Authorization: `Bearer ${token}`,
    }
  })
    .then(res => res.data as IGuild[])
}

export const getAuthRedirectUrl = (socketId: string) => {
  return `http://localhost:${config.port}/discord/authorize/${socketId}`;
}
