import { useState } from 'react';
import { Layout, Button, Badge, Row, Col, Select, DatePicker, Typography, Tabs } from 'antd';
import {
  BellOutlined,
  ApiOutlined,
  AppstoreOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { useTrendsData } from '../../hooks/useTrendsData';
import TrendCard from '../Cards/TrendCard';
import CompetitorTable from '../Table/CompetitorTable';
import ProfileVolumeList from '../Table/ProfileVolumeList';
import AlertPanel from '../Alerts/AlertPanel';

const { Header, Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

const DashboardLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState('Dashboard');
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [impactFilter, setImpactFilter] = useState('All');

  const { 
    trends, 
    competitorsPosts, 
    competitorProfiles, 
    activeCategories,
    addCompetitorProfile, 
    removeCompetitorProfile,
    loading,
    lastUpdated
  } = useTrendsData(selectedCategory);

  const formattedTime = lastUpdated.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

  const filteredTrends = trends.filter(t => 
    impactFilter === 'All' ? true : t.relevance === impactFilter
  );

  // Filtra recomendaciones idénticas y sin información útil
  const uniqueTrends = filteredTrends.filter((trend, index, self) => {
    // Si la máquina no logró generar inteligencia (análisis o ejecución), ocultamos la tarjeta para no ensuciar la grilla.
    if (!trend.analysis && !trend.rawAction) return false;

    if (!trend.rawAction) return true;
    const currentAction = trend.rawAction.trim().toLowerCase();
    const firstIndex = self.findIndex(t => t.rawAction && t.rawAction.trim().toLowerCase() === currentAction);
    return firstIndex === index;
  });

  const tabItems = [
    { key: 'Dashboard', label: <span className="flex items-center gap-2"><AppstoreOutlined /> Todas las Categorías</span> },
    ...activeCategories.map(c => ({ 
      key: c, 
      label: <span className="flex items-center gap-2"><FilterOutlined /> {c}</span> 
    }))
  ];

  return (
    <Layout className="min-h-screen bg-transparent">
      <Header className="px-6 flex justify-between items-center bg-[#F2F3F5] border-b border-gray-200 z-10 sticky top-0 h-20 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 mr-4 mt-1">
            <ApiOutlined className="text-[#E1251B] text-2xl" />
            <div className="flex flex-col">
              <span className="text-xl font-black text-[#E1251B] tracking-wide hidden sm:inline-block leading-none m-0 p-0">
                AVIANCARADAR
              </span>
              <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest leading-none mt-1">
                powered by LoBueno
              </span>
            </div>
          </div>
          <Title level={4} style={{ margin: 0, color: '#111827' }} className="flex items-center gap-2 border-l border-gray-200 pl-6 hidden md:flex">
            Centro de Inteligencia Global
          </Title>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Sistemas Online Activos
            </div>
            <span className="text-[10px] text-gray-400 font-medium pr-1 mt-1 tracking-wide">
              Último escaneo: {formattedTime}
            </span>
          </div>
          <Badge count={3} size="small" offset={[-4, 4]}>
            <Button 
              type="text" 
              icon={<BellOutlined className="text-xl text-gray-400 hover:text-gray-700 transition-colors" />} 
              onClick={() => setAlertsOpen(true)}
            />
          </Badge>
        </div>
      </Header>

      <Content className="p-4 md:p-8 overflow-auto">
        {/* Category Tabs */}
        <div className="mb-6">
          <Tabs 
            activeKey={selectedCategory} 
            onChange={setSelectedCategory} 
            items={tabItems} 
            size="large"
            className="font-medium text-gray-600"
          />
        </div>

        {/* Fltros Superiores */}
        <div className="glass-panel p-4 rounded-xl mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Filtros Activos</span>
            <RangePicker className="border-gray-200 hover:border-gray-400" />
            <Select 
              defaultValue="All" 
              style={{ width: 180 }} 
              onChange={setImpactFilter}
              options={[
                { value: 'All', label: 'Todos los impactos' },
                { value: 'Green', label: '🟢 Subirse ya' },
                { value: 'Yellow', label: '🟡 Monitorear' },
                { value: 'Red', label: '🔴 Ignorar' },
              ]}
            />
          </div>
        </div>

        {/* Radar de Competencia y Volumen */}
        <Row gutter={[20, 20]} className="mb-8">
          <Col xs={24} xl={16}>
            <CompetitorTable 
              postsData={competitorsPosts} 
              profiles={competitorProfiles}
              loading={loading}
              onAddProfile={addCompetitorProfile}
              onRemoveProfile={removeCompetitorProfile}
            />
          </Col>
          <Col xs={24} xl={8}>
            <ProfileVolumeList 
              competitorsPosts={competitorsPosts} 
              profiles={competitorProfiles} 
            />
          </Col>
        </Row>

        {/* Cards Grid */}
        <div className="mb-10">
            <div className="mb-4 flex justify-between items-end">
              <Title level={4} style={{ color: '#111827', margin: 0 }}>Tendencias Detectadas</Title>
            </div>
          <Row gutter={[20, 20]}>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Col xs={24} sm={12} md={8} lg={6} key={i}>
                  <div className="h-40 glass-panel rounded-2xl animate-pulse bg-gray-100"></div>
                </Col>
              ))
            ) : (
              uniqueTrends.map(trend => (
                <Col xs={24} sm={12} lg={8} xl={6} key={trend.id}>
                  <TrendCard trend={trend} />
                </Col>
              ))
            )}
          </Row>
          {!loading && uniqueTrends.length === 0 && (
            <div className="text-center py-16 glass-panel rounded-2xl text-gray-400 border border-dashed border-gray-300">
              <ApiOutlined className="text-4xl mb-3 opacity-50" />
              <p>No se detectaron señales bajo estos criterios.</p>
            </div>
          )}
        </div>
      </Content>

      <AlertPanel open={alertsOpen} onClose={() => setAlertsOpen(false)} />
    </Layout>
  );
};

export default DashboardLayout;
