import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { patientDataSchema } from "@shared/schema";

const SAMPLE_DATA = {
  patient_id: 'a1',
  device_id: 'd1',
  patient_name: 'Patient 1',
  patient_age: '22',
  LB: '1',
  AC: '1.0',
  FM: '1.0',
  UC: '1.0',
  DL: '1.0',
  DS: '1.0',
  DP: '1.0',
  ASTV: '1',
  MSTV: '1.0',
  ALTV: '1.0',
  MLTV: '1.0',
  Width: '1',
  Min: '1',
  Max: '1',
  Nmax: '1',
  Nzeros: '1',
  Mode: '1',
  Mean: '1',
  Median: '1',
  Variance: '1',
  Tendency: '1',
  CLASS: '1',
  NSP: '1'
};

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        // Generate sample data for 12 patients
        for (let i = 1; i <= 12; i++) {
          const data = {
            ...SAMPLE_DATA,
            patient_id: `a${i}`,
            patient_name: `Patient ${i}`,
            Mean: (Math.random() * 100).toFixed(1),
            timestamp: Date.now()
          };
          ws.send(JSON.stringify(data));
        }
      }
    }, 5000);

    ws.on('close', () => {
      clearInterval(interval);
      console.log('Client disconnected');
    });
  });

  return httpServer;
}
