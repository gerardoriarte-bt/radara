import { Drawer, List, Typography, Space } from 'antd';
import { WhatsAppOutlined, MailOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
}

const mockAlerts = [
  { id: 1, type: 'whatsapp', message: 'Tendencia "Eco-rutas" superó el umbral verde.', time: 'Hace 5 min' },
  { id: 2, type: 'email', message: 'Resumen diario de competidores LATAM/Wingo.', time: 'Hace 1 hora' },
  { id: 3, type: 'whatsapp', message: 'Alerta Roja: Crisis detectada en Facebook.', time: 'Hace 2 horas' },
];

const AlertPanel = ({ open, onClose }: Props) => {
  return (
    <Drawer 
      title={<span className="text-white">Centro de Alertas</span>} 
      placement="right" 
      onClose={onClose} 
      open={open}
      className="custom-dark-drawer"
      drawerStyle={{ backgroundColor: '#0B0E14', borderLeft: '1px solid rgba(255,255,255,0.05)' }}
      headerStyle={{ backgroundColor: '#151A23', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <List
        itemLayout="horizontal"
        dataSource={mockAlerts}
        renderItem={(item) => (
          <List.Item className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[#151A23] p-3 rounded-lg transition-colors cursor-pointer mb-2">
            <List.Item.Meta
              avatar={
                item.type === 'whatsapp' ? (
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                    <WhatsAppOutlined className="text-green-500 text-xl" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <MailOutlined className="text-blue-500 text-xl" />
                  </div>
                )
              }
              title={<Text className="text-gray-200 font-semibold">{item.type === 'whatsapp' ? 'WhatsApp' : 'Sistema Core'}</Text>}
              description={
                <Space direction="vertical" size={2}>
                  <Text className="text-gray-400 text-sm">{item.message}</Text>
                  <Text type="secondary" className="text-xs font-mono mt-1 text-gray-500">{item.time}</Text>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default AlertPanel;
