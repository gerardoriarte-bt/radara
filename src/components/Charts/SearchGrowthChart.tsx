import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const data = [
  { day: 'Lun', volume: 4000 },
  { day: 'Mar', volume: 6000 },
  { day: 'Mie', volume: 12000 },
  { day: 'Jue', volume: 27000 },
  { day: 'Vie', volume: 45000 },
  { day: 'Sab', volume: 68000 },
  { day: 'Dom', volume: 82000 },
];

const SearchGrowthChart = () => {
  return (
    <div className="glass-panel p-6 rounded-2xl bg-white border border-gray-100 shadow-sm mb-8">
      <div className="mb-6">
        <Title level={4} style={{ color: '#111827', margin: 0 }}>Evolución de Búsquedas (Top Keyword)</Title>
        <Text type="secondary" className="text-sm">Tráfico estimado diario para la keyword de mayor crecimiento</Text>
      </div>
      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '0px', border: '1px solid #e2e8f0', boxShadow: 'none' }}
              formatter={(value: any) => [Number(value).toLocaleString(), 'Búsquedas']}
            />
            <Area type="monotone" dataKey="volume" name="Volumen" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SearchGrowthChart;
