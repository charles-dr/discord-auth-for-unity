import { Server } from 'socket.io';

export const initializeSocket = (server: any) => {
  const io = new Server(server);

  io.on('connection', async socket => {
    console.log('[socket] connected', socket.id);
  })
}