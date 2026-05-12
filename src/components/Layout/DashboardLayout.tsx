import { useState } from 'react';
import { Layout, Button, Badge, Row, Col, Select, DatePicker, Typography, Tabs } from 'antd';
import {
  BellOutlined,
  ApiOutlined,
  AppstoreOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { useTrendsData, industriesConfig } from '../../hooks/useTrendsData';
import TrendCard from '../Cards/TrendCard';
import CompetitorTable from '../Table/CompetitorTable';
import ShareOfVoiceChart from '../Charts/ShareOfVoiceChart';
import TrendsAlertChart from '../Charts/TrendsAlertChart';
import TrendSpiderChart from '../Charts/TrendSpiderChart';
import AIRecommendations from '../Intelligence/AIRecommendations';
import AlertPanel from '../Alerts/AlertPanel';
import SearchTrendsView from '../Views/SearchTrendsView';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

const DashboardLayout = () => {
  const [activeIndustry, setActiveIndustry] = useState('telco');
  const [activeMainTab, setActiveMainTab] = useState('social');
  const selectedCategory = 'Dashboard';
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [impactFilter, setImpactFilter] = useState('All');

  const { 
    trends, 
    competitorsPosts, 
    competitorProfiles, 
    addCompetitorProfile, 
    removeCompetitorProfile,
    deleteTrend,
    loading,
    lastUpdated
  } = useTrendsData(selectedCategory, activeIndustry);

  const formattedTime = lastUpdated.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

  const filteredTrends = trends.filter(t => 
    impactFilter === 'All' ? true : t.relevance === impactFilter
  );

  // Filtra recomendaciones idénticas y sin información útil
  const uniqueTrends = filteredTrends.filter((trend, index, self) => {
    if (!trend.analysis && !trend.rawAction) return false;
    if (!trend.rawAction) return true;
    const currentAction = trend.rawAction.trim().toLowerCase();
    const firstIndex = self.findIndex(t => t.rawAction && t.rawAction.trim().toLowerCase() === currentAction);
    return firstIndex === index;
  });

  const mainTabItems = [
    { key: 'social', label: <span className="flex items-center gap-2"><AppstoreOutlined /> Tendencias Redes Sociales</span> },
    { key: 'search', label: <span className="flex items-center gap-2"><ApiOutlined /> Tendencias de Búsqueda</span> },
  ];

  return (
    <Layout className="min-h-screen bg-transparent">
      <Header 
        className="px-6 pt-3 pb-[15px] flex justify-between items-center bg-white border-b border-gray-200 z-10 sticky top-0 h-auto min-h-[80px] shadow-sm"
        style={{ background: '#ffffff' }}
      >
        <div className="flex items-center gap-6">
          <div className="flex flex-col mr-4 mt-1 justify-center">
            <div className="flex items-center cursor-pointer text-orange-600">
              <span className="font-black text-xl tracking-tighter text-slate-900 uppercase">TrendRadar</span>
            </div>
          </div>
          <Title level={4} style={{ margin: 0, color: '#111827' }} className="flex items-center gap-2 border-l border-gray-200 pl-6 hidden md:flex font-light tracking-wide text-gray-400">
            Inteligencia Estratégica
          </Title>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Radar Activo:</span>
            <Select 
              value={activeIndustry}
              onChange={setActiveIndustry}
              style={{ width: 220 }}
              options={Object.entries(industriesConfig).map(([key, config]) => ({
                value: key,
                label: config.name
              }))}
            />
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Online
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
        <div className="mb-6">
          <Tabs 
            activeKey={activeMainTab} 
            onChange={setActiveMainTab} 
            items={mainTabItems} 
            size="large"
            className="font-medium text-gray-600"
          />
        </div>

        {activeMainTab === 'social' ? (
          <div className="animate-fade-in">
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
          <div className="flex items-center gap-2 text-orange-700 bg-orange-50 px-4 py-2 rounded-none border border-orange-100 font-bold tracking-widest text-xs uppercase">
            <SyncOutlined className="text-orange-500" />
            LIVE: {formattedTime}
          </div>
        </div>

        <Row gutter={[20, 20]} className="mb-8">
          <Col xs={24} xl={14}>
            <CompetitorTable 
              postsData={competitorsPosts} 
              profiles={competitorProfiles}
              loading={loading}
              onAddProfile={addCompetitorProfile}
              onRemoveProfile={removeCompetitorProfile}
            />
          </Col>
          <Col xs={24} md={12} xl={5}>
            <ShareOfVoiceChart competitorsPosts={competitorsPosts} />
          </Col>
          <Col xs={24} md={12} xl={5}>
            <TrendsAlertChart trends={uniqueTrends} />
          </Col>
        </Row>

        <div className="mb-12">
            <div className="mb-8 flex justify-between items-end border-b-2 border-slate-900 pb-4">
              <Title level={3} className="uppercase font-black tracking-tighter m-0" style={{ color: '#111827' }}>
                Señales Detectadas <span className="text-orange-600 mx-2">/</span> {industriesConfig[activeIndustry].name}
              </Title>
            </div>
          
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={8} xl={7}>
              <TrendSpiderChart trends={uniqueTrends} />
              <AIRecommendations industry={industriesConfig[activeIndustry].name} />
            </Col>
            <Col xs={24} lg={16} xl={17}>
              <Row gutter={[20, 20]}>
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <Col xs={24} sm={12} key={i}>
                      <div className="h-64 bg-gray-50 animate-pulse border border-gray-100"></div>
                    </Col>
                  ))
                ) : (
                  uniqueTrends.map(trend => (
                    <Col xs={24} sm={12} key={trend.id}>
                      <TrendCard trend={trend} onDelete={deleteTrend} />
                    </Col>
                  ))
                )}
              </Row>
              {!loading && uniqueTrends.length === 0 && (
                <div className="text-center py-16 bg-gray-50 border border-dashed border-gray-300">
                  <ApiOutlined className="text-4xl mb-3 opacity-50" />
                  <p className="uppercase font-bold text-xs tracking-widest text-gray-400">Sin señales en el radar</p>
                </div>
              )}
            </Col>
          </Row>
        </div>
          </div>
        ) : (
          <SearchTrendsView industryName={industriesConfig[activeIndustry].name} />
        )}
      </Content>

      <Footer style={{ textAlign: 'center', backgroundColor: 'transparent', color: '#9ca3af', fontSize: '12px', padding: '12px 24px' }}>
        Powered By LoBueno
      </Footer>

      <AlertPanel open={alertsOpen} onClose={() => setAlertsOpen(false)} />
    </Layout>
  );
};

export default DashboardLayout;
