import { useEffect } from "react";
import { useSelector } from "react-redux";
import { connectWebSocket, closeWebSocket } from "@/lib/websocket";
import { PatientWindow } from "@/components/PatientWindow";
import type { RootState } from "@/store/store";

export default function Dashboard() {
  const patientData = useSelector((state: RootState) => state.patients.patientData);

  useEffect(() => {
    // Connect WebSocket when component mounts
    connectWebSocket();

    // Cleanup WebSocket when component unmounts
    return () => {
      closeWebSocket();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6">Patient Monitoring Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }, (_, i) => {
          const patientId = `a${i + 1}`;
          const patientDataPoints = patientData[patientId] || [];

          return (
            <div key={patientId} className="min-h-[300px]">
              <PatientWindow
                data={patientDataPoints}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}