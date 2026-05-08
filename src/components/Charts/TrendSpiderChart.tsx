import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { Typography } from 'antd';
import type { Trend } from '../../hooks/useTrendsData';

const { Title, Text } = Typography;

interface Props {
  trends: Trend[];
}

const TrendSpiderChart = ({ trends }: Props) => {
  // En un escenario real, esto calcularía promedios del arreglo 'trends'
  // Para el MVP usamos un perfil dimensional basado en la industria
  const data = [
    { subject: 'Impacto IA', A: 85, fullMark: 100 },
    { subject: 'Viralidad', A: 70, fullMark: 100 },
    { subject: 'Engagement', A: 95, fullMark: 100 },
    { subject: 'Sentimiento', A: 60, fullMark: 100 },
    { subject: 'Relevancia', A: 80, fullMark: 100 },
    { subject: 'Autoridad', A: 50, fullMark: 100 },
  ];

  return (
    <div className="bg-white p-8 rounded-none border border-gray-200 border-b-0 h-auto flex flex-col justify-center">
      <div className="mb-8">
        <Title level={4} className="uppercase tracking-tighter font-black m-0" style={{ fontSize: '1.25rem' }}>Análisis Dimensional</Title>
        <Text type="secondary" className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Perfil acumulado de señales detectadas</Text>
      </div>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Radar"
              dataKey="A"
              stroke="#F97316"
              strokeWidth={2}
              fill="#F97316"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
        <div>
          <div className="text-[10px] uppercase font-bold text-gray-400">Total Señales</div>
          <div className="text-xl font-black text-slate-900">{trends.length}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold text-gray-400">Salud del Radar</div>
          <div className="text-xl font-black text-orange-500">ÓPTIMA</div>
        </div>
      </div>
    </div>
  );
};

export default TrendSpiderChart;
