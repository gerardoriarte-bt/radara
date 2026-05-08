import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Typography } from 'antd';
import type { Trend } from '../../hooks/useTrendsData';

const { Title, Text } = Typography;

interface Props {
  trends: Trend[];
}

const TrendsAlertChart = ({ trends }: Props) => {
  const data = useMemo(() => {
    let green = 0;
    let yellow = 0;
    let red = 0;

    trends.forEach(t => {
      if (t.relevance === 'Green') green++;
      else if (t.relevance === 'Yellow') yellow++;
      else red++;
    });

    return [
      { name: 'Acción Inmediata', value: green, color: '#10B981' },
      { name: 'Monitorear', value: yellow, color: '#F59E0B' },
      { name: 'Ignorar', value: red, color: '#EF4444' }
    ].filter(d => d.value > 0);
  }, [trends]);

  return (
    <div className="glass-panel p-6 rounded-2xl h-full flex flex-col bg-white border border-gray-100 shadow-sm">
      <div className="mb-2">
        <Title level={4} style={{ color: '#111827', margin: 0 }}>Diagnóstico de IA</Title>
        <Text type="secondary" className="text-sm">Distribución por relevancia</Text>
      </div>
      <div className="flex-grow min-h-[220px] flex items-center justify-center">
        {data.length === 0 ? (
          <Text type="secondary">No hay datos suficientes</Text>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ color: '#111827', fontWeight: 600 }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default TrendsAlertChart;
