import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { PatientData } from '@shared/schema';

interface PatientChartProps {
  data: PatientData[];
}

export function PatientChart({ data }: PatientChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis 
          dataKey="timestamp" 
          domain={['auto', 'auto']}
          tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
          style={{ fontSize: '12px' }}
        />
        <YAxis style={{ fontSize: '12px' }} />
        <Tooltip
          labelFormatter={(timestamp) => new Date(Number(timestamp)).toLocaleTimeString()}
          contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
        />
        <Line 
          type="monotone" 
          dataKey="LB" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
