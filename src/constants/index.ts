export const PING = 'ping';

const _SocketEvent = {
  AUTHORIZE: "socket.event.authorize",
  AUTH_FAILED: "socket.event.auth.failed",
};

type SocketEventKeys = keyof typeof _SocketEvent;

type ISocketEventType = {
  [key in SocketEventKeys]: string;
}

export const SocketEvent: ISocketEventType = _SocketEvent;