import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Typography } from 'antd';
import type { CompetitorData } from '../../hooks/useTrendsData';

const { Title, Text } = Typography;

interface Props {
  competitorsPosts: CompetitorData[];
}

const COLORS = ['#F97316', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0'];

const ShareOfVoiceChart = ({ competitorsPosts }: Props) => {
  const data = useMemo(() => {
    const volumeMap = new Map<string, number>();
    competitorsPosts.forEach(post => {
      const current = volumeMap.get(post.brand) || 0;
      volumeMap.set(post.brand, current + post.views);
    });

    return Array.from(volumeMap.entries())
      .map(([name, views]) => ({ name, views }))
      .sort((a, b) => b.views - a.views); // Highest first
  }, [competitorsPosts]);

  return (
    <div className="glass-panel p-6 rounded-2xl h-full flex flex-col bg-white border border-gray-100 shadow-sm">
      <div className="mb-6">
        <Title level={4} style={{ color: '#111827', margin: 0 }}>Share of Voice</Title>
        <Text type="secondary" className="text-sm">Impacto acumulado por marca</Text>
      </div>
      <div className="flex-grow min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={75} tick={{ fill: '#4B5563', fontSize: 11, fontWeight: 600 }} />
            <Tooltip 
              cursor={{fill: '#F3F4F6'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              formatter={(value: any) => [Number(value).toLocaleString(), 'Vistas']}
            />
            <Bar dataKey="views" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ShareOfVoiceChart;
