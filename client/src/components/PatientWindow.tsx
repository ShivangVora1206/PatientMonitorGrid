import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientChart } from "./PatientChart";
import type { PatientData } from "@shared/schema";

interface PatientWindowProps {
  data: PatientData[];
}

export function PatientWindow({ data }: PatientWindowProps) {
  const latestData = data[data.length - 1];

  if (!latestData) {
    return (
      <Card className="w-full h-full flex items-center justify-center">
        <CardContent>
          <p className="text-muted-foreground">Waiting for patient data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex justify-between items-center">
          <span>{latestData.patient_name}</span>
          <span className="text-sm font-normal text-muted-foreground">
            ID: {latestData.patient_id}
          </span>
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Age: {latestData.patient_age} | Device: {latestData.device_id}
        </div>
      </CardHeader>
      <CardContent>
        <PatientChart data={data} />
        <div className="grid grid-cols-4 gap-2 mt-4 text-sm">
          <div>
            <div className="font-medium">ASTV</div>
            <div className="text-muted-foreground">{latestData.ASTV}</div>
          </div>
          <div>
            <div className="font-medium">MSTV</div>
            <div className="text-muted-foreground">{latestData.MSTV}</div>
          </div>
          <div>
            <div className="font-medium">ALTV</div>
            <div className="text-muted-foreground">{latestData.ALTV}</div>
          </div>
          <div>
            <div className="font-medium">MLTV</div>
            <div className="text-muted-foreground">{latestData.MLTV}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}