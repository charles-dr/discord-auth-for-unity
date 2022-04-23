import { io } from 'socket.io-client';
import config from '../config';
import { SocketEvent } from '../constants';

export const internalSocket = io(`http://localhost:${config.port}`);

internalSocket.on('connect', () => {
  console.log('[internal] connected', internalSocket.id);
})

internalSocket.on(SocketEvent.AUTHORIZE, args => {
  console.log('[Internal] authorize', args);
})