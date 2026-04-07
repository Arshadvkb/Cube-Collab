import { io } from 'socket.io-client';

const socketUrl = import.meta.env.VITE_API_URL || '';
const socket = io(socketUrl, {
  withCredentials: true,
});

socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

socket.on('connect_error', (err) => {
  console.log('Connection error:', err.message);
});

export default socket;
