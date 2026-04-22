import { Card, Typography, Space, Tooltip, Avatar } from 'antd';
import { 
  RiseOutlined, 
  FallOutlined, 
  SwapOutlined, 
  FireFilled, 
  UserOutlined, 
  LinkOutlined, 
  InstagramOutlined, 
  GlobalOutlined, 
  TikTokOutlined,
  BulbOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import RelevanceBadge from '../DecisionEngine/RelevanceBadge';
import type { Trend } from '../../hooks/useTrendsData';

const { Title, Text, Paragraph } = Typography;

interface Props {
  trend: Trend;
}

const TrendCard = ({ trend }: Props) => {
  const renderSpeedIcon = () => {
    switch (trend.growthSpeed) {
      case 'High': return <RiseOutlined className="text-green-500 text-xl" />;
      case 'Medium': return <SwapOutlined className="text-yellow-500 text-xl" />;
      case 'Low': return <FallOutlined className="text-red-500 text-xl" />;
    }
  };

  const isViral = trend.growthSpeed === 'High' && trend.relevance === 'Green';
  
  const rawLink = trend.bioLink || trend.profileUrl;
  let finalUrl = rawLink;
  let displayText = rawLink;
  let isTikTok = false;

  if (rawLink) {
    if (!rawLink.startsWith('http')) {
      const cleanUsername = rawLink.replace(/^@/, '');
      finalUrl = `https://www.tiktok.com/@${cleanUsername}`;
      displayText = `@${cleanUsername}`;
      isTikTok = true;
    } else {
      isTikTok = rawLink.toLowerCase().includes('tiktok');
      displayText = rawLink.replace(/^https?:\/\/(www\.)?/, '').split('?')[0];
    }
  }

  return (
    <Card 
      className="glass-panel border-none hologram-glow rounded-2xl h-full flex flex-col justify-between overflow-hidden relative group cursor-default bg-white"
      bodyStyle={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-100 rounded-full blur-3xl group-hover:bg-[#E1251B]/10 transition-all duration-500 z-0 pointer-events-none"></div>

      <div className="flex justify-between items-start z-10">
        <Space>
          {trend.avatar ? (
            <Avatar src={trend.avatar} size="small" className="border border-gray-200 bg-white" />
          ) : (
            <Avatar icon={<UserOutlined />} size="small" className="bg-gray-100 border border-gray-200 text-gray-400" />
          )}
          <div className="px-3 py-1 rounded-md bg-gray-100 border border-gray-200 text-xs font-bold tracking-wider text-gray-600 uppercase shadow-sm">
            {trend.origin}
          </div>
          {trend.rawScore !== undefined && (
             <Tooltip title="Puntaje del Scraping">
               <div className="flex items-center justify-center px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[11px] text-blue-600 font-mono font-bold">
                 PTS: {trend.rawScore}
               </div>
             </Tooltip>
          )}
          {isViral && (
             <Tooltip title="Tendencia Viral">
               <FireFilled className="text-orange-500 text-lg animate-pulse" />
             </Tooltip>
          )}
        </Space>
        <Text type="secondary" className="text-[10px] font-mono bg-gray-100 text-gray-500 px-2 py-1 rounded border border-gray-200">
          {trend.date}
        </Text>
      </div>

      <div className="z-10 mt-1">
        <Title level={5} className="mb-1 line-clamp-2" style={{ color: '#111827' }}>
          {rawLink ? (
            <a 
              href={finalUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-600 text-gray-900 transition-colors flex items-start gap-2 group-hover:text-blue-500"
            >
              {trend.title}
              <LinkOutlined className="text-[10px] text-blue-400 mt-1.5" />
            </a>
          ) : (
            trend.title
          )}
        </Title>
        
        {trend.analysis && (
          <Paragraph className="text-gray-500 text-xs line-clamp-3 leading-relaxed mb-0 mt-2">
            <BulbOutlined className="text-yellow-500 mr-1.5" />
            {trend.analysis}
          </Paragraph>
        )}
      </div>

      <div className="flex-grow z-10 flex flex-col justify-end">
        {trend.rawAction && (
          <div className="bg-green-50/50 border border-green-200 rounded-lg p-3 my-3">
            <div className="flex items-center gap-1.5 text-green-700 text-xs font-bold uppercase tracking-wider mb-1.5">
              <ThunderboltOutlined /> Ejecución Sugerida
            </div>
            <div className="text-sm text-gray-700 leading-snug">
              {trend.rawAction}
            </div>
          </div>
        )}

        {rawLink && (
          <div className="flex items-center gap-2 text-[11px] text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-200 w-fit max-w-full">
            {isTikTok ? (
              <TikTokOutlined className="text-gray-800 text-sm flex-shrink-0" />
            ) : rawLink.toLowerCase().includes('instagram') ? (
              <InstagramOutlined className="text-pink-500 text-sm flex-shrink-0" />
            ) : (
              <GlobalOutlined className="text-blue-500 text-sm flex-shrink-0" />
            )}
            <a 
              href={finalUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="truncate hover:text-blue-500 transition-colors"
              title="Abrir perfil web"
            >
              {displayText}
            </a>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-1 pt-4 border-t border-gray-100 z-10 w-full">
        <Space size="small">
          {renderSpeedIcon()}
          <Text className="text-sm font-medium text-gray-500 w-max">Velocidad</Text>
        </Space>
        <RelevanceBadge relevance={trend.relevance} />
      </div>
    </Card>
  );
};

export default TrendCard;
