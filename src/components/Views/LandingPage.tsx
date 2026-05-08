import { Button, Typography, Row, Col, Divider, Tag } from 'antd';
import { 
  RadarChartOutlined, 
  DatabaseOutlined, 
  NodeIndexOutlined, 
  RobotOutlined, 
  ArrowRightOutlined,
  EyeOutlined,
  SendOutlined,
  SearchOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface Props {
  onEnter: () => void;
}

const LandingPage = ({ onEnter }: Props) => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-100">
      {/* Navbar Simple */}
      <nav className="flex justify-between items-center py-5 px-8 lg:px-20 border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2 text-slate-900">
          <RadarChartOutlined className="text-2xl text-[#f97316]" />
          <span className="font-black text-xl tracking-tighter uppercase">TrendRadar</span>
          <Tag className="ml-2 bg-slate-100 text-slate-500 border-none font-bold text-[9px] tracking-widest">v1.0</Tag>
        </div>
        <Button 
          type="primary" 
          size="large" 
          className="bg-slate-900 hover:bg-[#f97316] font-bold rounded-none px-8 border-none text-[10px] tracking-widest uppercase transition-all" 
          onClick={onEnter}
        >
          Acceder al Radar
        </Button>
      </nav>

      {/* Hero Explicativo */}
      <section className="pt-24 pb-20 px-8 lg:px-20 max-w-6xl mx-auto">
        <Row gutter={[64, 64]} align="middle">
          <Col xs={24} lg={14}>
            <Title className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight mb-6" style={{ margin: 0 }}>
              RADAR DE <br/>
              <span className="text-[#f97316]">INTELIGENCIA.</span>
            </Title>
            <Paragraph className="text-lg text-slate-500 mt-8 mb-10 leading-relaxed font-medium">
                Plataforma diseñada para la centralización y análisis de señales digitales en tiempo real. Este sistema integra múltiples fuentes de datos para transformarlas en briefings estratégicos accionables.
            </Paragraph>
            <Button 
              type="primary" 
              size="large" 
              onClick={onEnter} 
              icon={<ArrowRightOutlined />} 
              className="bg-[#f97316] hover:bg-slate-900 h-14 px-10 text-[11px] font-black tracking-widest rounded-none border-none uppercase flex items-center gap-3 shadow-xl shadow-orange-100 transition-all"
            >
              Iniciar Exploración
            </Button>
          </Col>
          <Col xs={24} lg={10}>
            <div className="bg-slate-50 p-8 border border-slate-100 rounded-none relative">
                <Text className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">Estado del Ecosistema</Text>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <Text className="text-xs font-bold text-slate-700">Flujo de Integración</Text>
                        <Tag color="success" className="rounded-none font-bold text-[9px] border-none bg-green-100 text-green-700">ACTIVO</Tag>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <Text className="text-xs font-bold text-slate-700">Sincronización de Datos</Text>
                        <Tag color="success" className="rounded-none font-bold text-[9px] border-none bg-green-100 text-green-700">ONLINE</Tag>
                    </div>
                    <div className="flex justify-between items-center">
                        <Text className="text-xs font-bold text-slate-700">Procesamiento Cognitivo</Text>
                        <Tag color="success" className="rounded-none font-bold text-[9px] border-none bg-green-100 text-green-700">READY</Tag>
                    </div>
                </div>
            </div>
          </Col>
        </Row>
      </section>

      <Divider className="my-0 border-gray-100" />

      {/* Workflow de Inteligencia */}
      <section className="py-24 px-8 lg:px-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <Text className="text-[#f97316] text-[11px] font-black uppercase tracking-[0.3em] block mb-2">Proceso de Análisis</Text>
            <Title level={2} className="text-4xl font-black text-slate-900 tracking-tighter uppercase m-0">Arquitectura de Decisión</Title>
          </div>
          
          <Row gutter={[40, 40]}>
            <Col xs={24} md={6}>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-white flex items-center justify-center border border-slate-200 text-slate-900 shadow-sm">
                  <DatabaseOutlined className="text-xl" />
                </div>
                <Title level={4} className="m-0 uppercase text-sm font-black tracking-widest">1. Ingestión</Title>
                <Text className="text-slate-500 text-xs leading-relaxed font-medium">
                  Captura automatizada de señales, métricas de impacto y tendencias desde fuentes globales y redes sociales.
                </Text>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-white flex items-center justify-center border border-slate-200 text-slate-900 shadow-sm">
                  <NodeIndexOutlined className="text-xl" />
                </div>
                <Title level={4} className="m-0 uppercase text-sm font-black tracking-widest">2. Estructuración</Title>
                <Text className="text-slate-500 text-xs leading-relaxed font-medium">
                  Organización y limpieza de la data cruda para su correcta interpretación por los modelos de análisis.
                </Text>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-white flex items-center justify-center border border-slate-200 text-[#f97316] shadow-sm">
                  <RobotOutlined className="text-xl" />
                </div>
                <Title level={4} className="m-0 uppercase text-sm font-black tracking-widest text-[#f97316]">3. Inteligencia</Title>
                <Text className="text-slate-500 text-xs leading-relaxed font-medium">
                  Algoritmos avanzados evalúan el contexto y la relevancia para identificar señales críticas de mercado.
                </Text>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-slate-900 flex items-center justify-center border border-slate-900 text-white shadow-xl">
                  <EyeOutlined className="text-xl" />
                </div>
                <Title level={4} className="m-0 uppercase text-sm font-black tracking-widest">4. Despliegue</Title>
                <Text className="text-slate-500 text-xs leading-relaxed font-medium">
                  Entrega de información curada mediante tableros interactivos y sistemas de alerta táctica.
                </Text>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Módulos */}
      <section className="py-24 px-8 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
            <Title level={3} className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-12">Módulos del Sistema</Title>
            <Row gutter={[24, 24]}>
                <Col xs={24} md={12} lg={8}>
                    <div className="border border-slate-100 p-8 hover:bg-slate-50 transition-all cursor-default">
                        <SendOutlined className="text-2xl text-[#f97316] mb-6" />
                        <Title level={5} className="uppercase font-black tracking-widest text-xs mb-4">Briefing Táctico</Title>
                        <Text className="text-slate-500 text-xs leading-relaxed">Narrativa técnica sobre las acciones sugeridas basadas en el comportamiento del radar.</Text>
                    </div>
                </Col>
                <Col xs={24} md={12} lg={8}>
                    <div className="border border-slate-100 p-8 hover:bg-slate-50 transition-all cursor-default">
                        <SearchOutlined className="text-2xl text-slate-900 mb-6" />
                        <Title level={5} className="uppercase font-black tracking-widest text-xs mb-4">Search Trends</Title>
                        <Text className="text-slate-500 text-xs leading-relaxed">Monitoreo de intención de búsqueda para identificar intereses de mercado antes de su masificación.</Text>
                    </div>
                </Col>
                <Col xs={24} md={12} lg={8}>
                    <div className="border border-slate-100 p-8 hover:bg-slate-50 transition-all cursor-default">
                        <RadarChartOutlined className="text-2xl text-slate-900 mb-6" />
                        <Title level={5} className="uppercase font-black tracking-widest text-xs mb-4">Benchmarking</Title>
                        <Text className="text-slate-500 text-xs leading-relaxed">Seguimiento de perfiles competitivos y análisis de impacto comparado (Share of Voice).</Text>
                    </div>
                </Col>
            </Row>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 lg:px-20 border-t border-gray-100 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-slate-300">
                <RadarChartOutlined className="text-xl" />
                <span className="font-black text-sm tracking-tighter uppercase">TrendRadar</span>
            </div>
            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                Documentación de Producto • © 2026 Powered By LoBueno.
            </Text>
            <div className="flex gap-4">
                <Text className="text-[9px] font-black text-slate-400 cursor-pointer hover:text-[#f97316]">RECURSOS</Text>
                <Text className="text-[9px] font-black text-slate-400 cursor-pointer hover:text-[#f97316]">SOPORTE</Text>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
