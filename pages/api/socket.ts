import { Server as HTTPServer } from 'http';
import { Socket } from 'net';
import { Server as IOServer } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';

type NextApiResponseWithSocket = NextApiResponse & {
  socket: Socket & {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    console.log('Initializing new Socket.io server...');

    const io = new IOServer(res.socket.server as any, {
      path: '/api/socket',
      addTrailingSlash: false,
    });

    io.on('connection', (socket) => {
      console.log('✅ A user connected');

      socket.on('sendMessage', (msg) => {
        console.log('📩 Message received:', msg);
        socket.broadcast.emit('receiveMessage', msg); // send to other clients
      });

      socket.on('disconnect', () => {
        console.log('❌ User disconnected');
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('Socket.io server already running');
  }

  res.end(); // ✅ Important to end the response
};

export default SocketHandler;
