import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

declare module 'http' {
  interface IncomingMessage {
    socket: {
      server: HTTPServer & {
        io?: SocketIOServer;
      };
    };
  }
};