import { Server } from 'socket.io';
import { SocketEvent } from '../constants';

export const initializeSocket = (server: any) => {
  const io = new Server(server);

  io.on('connection', async socket => {
    console.log('[socket] connected', socket.id);

    socket.on('test', args => {
      console.log('[test]', socket.id, args);
    })

    socket.on(SocketEvent.AUTHORIZE as string, args => {
      socket.emit(SocketEvent.AUTHORIZE, args);
    })
  })
}