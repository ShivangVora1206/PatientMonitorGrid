import { store } from '@/store/store';
import { updatePatientData } from '@/store/patientSlice';
import type { PatientData } from '@shared/schema';

let socket: WebSocket | null = null;
let reconnectTimeout: NodeJS.Timeout | null = null;

export function connectWebSocket() {
  if (socket?.readyState === WebSocket.OPEN) {
    return;
  }

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const wsUrl = `${protocol}//${window.location.host}/ws`;

  socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    console.log('WebSocket connected');
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data) as PatientData;
      store.dispatch(updatePatientData(data));
    } catch (err) {
      console.error('Failed to parse websocket message:', err);
    }
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected. Attempting to reconnect...');
    socket = null;
    reconnectTimeout = setTimeout(connectWebSocket, 5000);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
    socket?.close();
  };
}

export function closeWebSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }
}