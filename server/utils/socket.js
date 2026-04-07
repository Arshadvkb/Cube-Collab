import { Server } from 'socket.io';
import documentModel from '../models/document.model.js';

let io;

export const initSocket = async (server) => {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    socket.on('join-document', async (documentId) => {
      socket.join(documentId);
      socket.documentId = documentId;

      try {
        const document = await documentModel.findById(documentId);
        if (document) {
          socket.emit('load-document', document.content || { ops: [{ insert: '\n' }] });
        } else {
          socket.emit('load-document', { ops: [{ insert: '\n' }] });
        }
      } catch (err) {
        console.error('Error finding document:', err);
      }
    });

    socket.on('send-changes', (delta) => {
      if (socket.documentId) {
        socket.broadcast.to(socket.documentId).emit('receive-changes', delta);
      }
    });

    socket.on('cursor-change', (cursorData) => {
      if (socket.documentId) {
        socket.broadcast.to(socket.documentId).emit('receive-cursor', cursorData);
      }
    });

    socket.on('save-document', async (data) => {
      if (socket.documentId) {
        try {
          await documentModel.findByIdAndUpdate(socket.documentId, {
            content: data,
          });
        } catch (err) {
          console.error('Error saving document:', err);
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected: ' + socket.id);
    });
  });
};

export const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
