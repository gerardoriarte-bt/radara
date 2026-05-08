import { Button, Typography, Row, Col, Card, Tag } from 'antd';
import { RadarChartOutlined, ThunderboltOutlined, LineChartOutlined, RobotOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface Props {
  onEnter: () => void;
}

const LandingPage = ({ onEnter }: Props) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-6 px-8 lg:px-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 text-orange-600">
          <RadarChartOutlined className="text-3xl" />
          <span className="font-extrabold text-2xl tracking-tight text-slate-900 uppercase">TrendRadar</span>
        </div>
        <Button type="primary" size="large" className="bg-orange-600 font-bold rounded-none px-8 shadow-sm hover:bg-orange-700 border-none" onClick={onEnter}>
          INGRESAR
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-32 px-6 lg:px-20 text-center flex flex-col items-center">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-cyan-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <Tag className="mb-8 bg-orange-50 text-orange-700 border border-orange-200 px-5 py-2 rounded-none text-xs font-bold tracking-widest uppercase">
          <ThunderboltOutlined className="mr-1 text-orange-500" /> Inteligencia Predictiva
        </Tag>
        
        <Title className="max-w-4xl text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1] mb-8" style={{ margin: 0 }}>
          ANTICÍPATE A LA <br className="hidden md:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
            CONVERSACIÓN.
          </span>
        </Title>
        
        <Paragraph className="max-w-3xl text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-light tracking-wide">
          Análisis de tendencias en tiempo real para equipos de alto rendimiento. <br/>
          Detecta señales críticas en TikTok y Google antes que la competencia.
        </Paragraph>
        
        <div className="flex gap-4 relative z-10">
          <Button type="primary" size="large" onClick={onEnter} className="bg-slate-900 hover:bg-orange-600 h-14 px-10 text-sm font-black tracking-widest rounded-none shadow-2xl flex items-center gap-3 border-none transition-all">
            ABRIR RADAR GLOBAL <ArrowRightOutlined />
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 lg:px-20 bg-white">
        <div className="text-center mb-20">
          <Title level={2} className="text-4xl font-bold text-slate-900 mb-4" style={{ margin: 0 }}>¿Por qué tu equipo necesita TrendRadar?</Title>
          <Text className="text-xl text-slate-500">Deja de reaccionar tarde. Convierte los datos masivos en estrategias accionables al instante.</Text>
        </div>
        
        <Row gutter={[40, 40]} className="max-w-7xl mx-auto">
          <Col xs={24} md={8}>
            <Card bordered={false} className="h-full bg-slate-50 rounded-3xl hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 shadow-inner">
                <RobotOutlined className="text-4xl text-indigo-600" />
              </div>
              <Title level={3} style={{ marginBottom: 16 }}>Detección Temprana con IA</Title>
              <Paragraph className="text-slate-500 text-base leading-relaxed">
                Nuestros algoritmos escanean las redes sociales 24/7. La IA clasifica automáticamente qué tendencias son oportunidades (<span className="text-green-600 font-bold">Subirse ya</span>) y cuáles son ruido, ahorrándote horas de investigación y curaduría manual.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} className="h-full bg-slate-50 rounded-3xl hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center mb-6 shadow-inner">
                <RadarChartOutlined className="text-4xl text-cyan-600" />
              </div>
              <Title level={3} style={{ marginBottom: 16 }}>Monitoreo de Competencia</Title>
              <Paragraph className="text-slate-500 text-base leading-relaxed">
                Observa exactamente qué está publicando tu competencia directa y visualiza el "Share of Voice". Entiende al instante qué estrategias y formatos les están generando más vistas, impacto e interacciones en tiempo real.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} className="h-full bg-slate-50 rounded-3xl hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 shadow-inner">
                <LineChartOutlined className="text-4xl text-emerald-600" />
              </div>
              <Title level={3} style={{ marginBottom: 16 }}>Alertas Automatizadas</Title>
              <Paragraph className="text-slate-500 text-base leading-relaxed">
                No tienes que estar pegado a la pantalla. Configura reglas precisas para que el sistema envíe un correo electrónico a tu equipo estratégico inmediatamente cuando se detecte una señal de alta relevancia o una crisis latente.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 lg:px-20 bg-slate-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #F97316 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <Title level={2} className="text-5xl font-black text-white mb-6 relative z-10 uppercase tracking-tighter" style={{ color: 'white', margin: 0 }}>
          LIDERAR ES <span className="text-orange-500">ANTICIPAR.</span>
        </Title>
        <Paragraph className="text-slate-500 text-xl max-w-2xl mx-auto mb-10 relative z-10 font-light">
          Únete a los equipos de medios que ya están dominando el pulso digital.
        </Paragraph>
        <Button size="large" onClick={onEnter} className="bg-orange-600 text-white hover:bg-orange-500 border-none h-14 px-12 text-sm font-black tracking-widest rounded-none shadow-2xl relative z-10">
          ACCEDER AHORA
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-gray-200 bg-white">
        <div className="flex justify-center items-center gap-2 mb-2">
          <RadarChartOutlined className="text-xl text-gray-400" />
          <span className="font-bold text-lg tracking-tight text-gray-400">TrendRadar</span>
        </div>
        <Text className="text-slate-400 text-sm font-medium">© 2026 Todos los derechos reservados. Powered By LoBueno.</Text>
      </footer>
    </div>
  );
};

export default LandingPage;
