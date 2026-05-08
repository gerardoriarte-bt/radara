import { Row, Col, Typography, Table, Tag, Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, GoogleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import SearchGrowthChart from '../Charts/SearchGrowthChart';

const { Title, Text } = Typography;

interface SearchTrend {
  key: string;
  keyword: string;
  volume: number;
  growth: number;
  intent: 'Transaccional' | 'Informativo' | 'Comercial';
  competition: 'Alta' | 'Media' | 'Baja';
}

const SearchTrendsView = ({ industryName }: { industryName: string }) => {
  // Datos mock para el MVP
  const data: SearchTrend[] = [
    { key: '1', keyword: 'portabilidad movistar', volume: 45000, growth: 12.5, intent: 'Transaccional', competition: 'Alta' },
    { key: '2', keyword: 'planes 5g colombia', volume: 32000, growth: 45.2, intent: 'Informativo', competition: 'Media' },
    { key: '3', keyword: 'cancelar plan claro', volume: 28000, growth: -5.4, intent: 'Transaccional', competition: 'Baja' },
    { key: '4', keyword: 'wom vs tigo', volume: 15000, growth: 8.9, intent: 'Comercial', competition: 'Media' },
    { key: '5', keyword: 'celulares a cuotas tigo', volume: 22000, growth: 18.2, intent: 'Transaccional', competition: 'Alta' },
  ];

  const columns: ColumnsType<SearchTrend> = [
    {
      title: 'Palabra Clave (Keyword)',
      dataIndex: 'keyword',
      key: 'keyword',
      render: (text) => <Text strong className="text-gray-800"><GoogleOutlined className="mr-2 text-blue-500" />{text}</Text>
    },
    {
      title: 'Volumen Mensual',
      dataIndex: 'volume',
      key: 'volume',
      sorter: (a, b) => a.volume - b.volume,
      render: (vol) => <Text className="font-mono">{vol.toLocaleString()}</Text>
    },
    {
      title: 'Tendencia (Crecimiento)',
      dataIndex: 'growth',
      key: 'growth',
      render: (val) => {
        const color = val > 0 ? 'text-green-600' : 'text-red-600';
        const Icon = val > 0 ? ArrowUpOutlined : ArrowDownOutlined;
        return <span className={`font-mono font-bold ${color}`}><Icon className="mr-1"/>{Math.abs(val)}%</span>
      }
    },
    {
      title: 'Intención de Búsqueda',
      dataIndex: 'intent',
      key: 'intent',
      render: (intent) => {
        const color = intent === 'Transaccional' ? 'purple' : intent === 'Comercial' ? 'blue' : 'cyan';
        return <Tag color={color}>{intent}</Tag>
      }
    },
    {
      title: 'Competencia Ads',
      dataIndex: 'competition',
      key: 'competition',
      render: (comp) => {
        const color = comp === 'Alta' ? 'red' : comp === 'Media' ? 'orange' : 'green';
        return <Tag color={color} bordered={false}>{comp}</Tag>
      }
    }
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <Title level={4} style={{ color: '#111827', margin: 0 }}>Tendencias de Búsqueda Google - {industryName}</Title>
        <Text type="secondary">Datos de volumen y crecimiento extraídos de Google Trends y Keyword Planner.</Text>
      </div>

      <Row gutter={[20, 20]} className="mb-8">
        <Col xs={24} md={8}>
          <Card className="shadow-none border-gray-200 rounded-none bg-white">
            <div className="flex flex-col">
              <Text type="secondary" className="mb-1 uppercase text-[10px] font-bold tracking-widest text-gray-400">Top Growth</Text>
              <Title level={3} style={{ margin: 0, color: '#F97316' }} className="uppercase tracking-tighter">planes 5g colombia</Title>
              <Text className="text-orange-600 font-bold mt-2 text-xs">+45.2% esta semana</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="shadow-none border-gray-200 rounded-none bg-white">
            <div className="flex flex-col">
              <Text type="secondary" className="mb-1 uppercase text-[10px] font-bold tracking-widest text-gray-400">Total Volume</Text>
              <Title level={3} style={{ margin: 0, color: '#111827' }} className="tracking-tighter font-black">1.2M</Title>
              <Text className="text-gray-400 mt-2 text-xs">Últimos 30 días</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="shadow-none border-gray-200 rounded-none bg-white">
            <div className="flex flex-col">
              <Text type="secondary" className="mb-1 uppercase text-[10px] font-bold tracking-widest text-gray-400">Ad Opportunity</Text>
              <Title level={3} style={{ margin: 0, color: '#F97316' }} className="uppercase tracking-tighter">wom vs tigo</Title>
              <Text className="text-gray-400 mt-2 text-xs">Competencia Baja</Text>
            </div>
          </Card>
        </Col>
      </Row>

      <SearchGrowthChart />

      <div className="glass-panel p-6 rounded-2xl bg-white shadow-sm border border-gray-200">
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={false}
          rowClassName={() => "hover:bg-gray-50 transition-colors"}
        />
      </div>
    </div>
  );
};

export default SearchTrendsView;
