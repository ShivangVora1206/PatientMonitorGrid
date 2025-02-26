import { io, Socket } from 'socket.io-client';
import { store } from '@/store/store';
import { updatePatientData } from '@/store/patientSlice';
import type { PatientData } from '@shared/schema';
import { log } from 'console';

let socket: Socket | null = null;
let reconnectTimeout: NodeJS.Timeout | null = null;

export function connectWebSocket() {
  if (socket?.connected) {
    return;
  }

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const wsUrl = `${protocol}//127.0.0.1:5000`;

  console.log(`Connecting to WebSocket at ${wsUrl}`);
  socket = io(wsUrl);

  socket.on('connect', () => {
    console.log('WebSocket connected');
    socket?.emit('join', {username:'client', room: '2'});
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
  });

  socket.on('message', (data: string) => {
    try {
      console.log('Received WebSocket message:', data);
      const parsedData = JSON.parse(data) as PatientData;
      store.dispatch(updatePatientData(parsedData));
    } catch (err) {
      console.error('Failed to parse websocket message:', err);
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('WebSocket disconnected. Attempting to reconnect...', reason);
    socket = null;
    reconnectTimeout = setTimeout(connectWebSocket, 5000);
  });

  socket.on('connect_error', (error) => {
    console.error('WebSocket error:', error);
    socket?.disconnect();
  });
}

export function closeWebSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }
}