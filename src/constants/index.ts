export const PING = 'ping';

const _SocketEvent = {
  AUTHORIZE: "socket.event.authorize",
  INTERNAL_AUTHORIZE: "socket.internal.event.authorize",
};

type SocketEventKeys = keyof typeof _SocketEvent;

type ISocketEventType = {
  [key in SocketEventKeys]: string;
}

export const SocketEvent: ISocketEventType = _SocketEvent;