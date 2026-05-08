import { useState } from 'react';
import { Drawer, List, Typography, Button, Form, Input, Select, Switch, Divider, message, Tag, Popconfirm } from 'antd';
import { SaveOutlined, ArrowLeftOutlined, DeleteOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

interface Props {
  open: boolean;
  onClose: () => void;
}

interface AlertConfig {
  id: string;
  email: string;
  level: string;
  frequency: string;
  enabled: boolean;
}

const AlertPanel = ({ open, onClose }: Props) => {
  const [isConfigMode, setIsConfigMode] = useState(false);
  const [form] = Form.useForm();

  // Estado para manejar las alertas activas/creadas
  const [activeConfigs, setActiveConfigs] = useState<AlertConfig[]>([
    { id: '1', email: 'equipo.estrategia@telco.com', level: 'green', frequency: 'immediate', enabled: true },
    { id: '2', email: 'gerencia@telco.com', level: 'yellow', frequency: 'weekly', enabled: false },
  ]);

  const handleSaveConfig = (values: any) => {
    const newConfig: AlertConfig = {
      id: Math.random().toString(36).substring(2, 9),
      email: values.email,
      level: values.level,
      frequency: values.frequency,
      enabled: values.enabled,
    };
    setActiveConfigs([newConfig, ...activeConfigs]);
    message.success('Alerta creada exitosamente.');
    setIsConfigMode(false);
    form.resetFields();
  };

  const toggleConfig = (id: string, checked: boolean) => {
    setActiveConfigs(configs => configs.map(c => c.id === id ? { ...c, enabled: checked } : c));
    message.success(`Alerta ${checked ? 'activada' : 'pausada'}.`);
  };

  const deleteConfig = (id: string) => {
    setActiveConfigs(configs => configs.filter(c => c.id !== id));
    message.success('Alerta eliminada.');
  };

  const getLevelTag = (level: string) => {
    if (level === 'green') return <Tag color="success" className="border-none">🟢 Solo Inmediatas</Tag>;
    if (level === 'yellow') return <Tag color="warning" className="border-none">🟡 Inmediatas y Monitoreo</Tag>;
    return <Tag color="processing" className="border-none">Todas las señales</Tag>;
  };

  const getFreqLabel = (freq: string) => {
    const map: Record<string, string> = {
      'immediate': '⚡ Inmediato',
      'daily_morning': '🌅 Diario (8AM)',
      'daily_evening': '🌇 Diario (6PM)',
      'weekly': '📅 Semanal'
    };
    return map[freq] || freq;
  };

  return (
    <Drawer 
      title={
        <div className="flex items-center gap-3">
          {isConfigMode && (
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined className="text-gray-500 hover:text-gray-800" />} 
              onClick={() => setIsConfigMode(false)}
              className="p-0"
            />
          )}
          <span className="text-gray-900 font-bold tracking-wide">
            {isConfigMode ? 'Nueva Alerta Automática' : 'Gestión de Alertas'}
          </span>
        </div>
      } 
      placement="right" 
      width={420}
      onClose={() => {
        onClose();
        setIsConfigMode(false);
      }} 
      open={open}
      styles={{ 
        body: { backgroundColor: '#F9FAFB', padding: '24px' }, 
        header: { backgroundColor: '#FFFFFF', borderBottom: '1px solid #F3F4F6', padding: '20px 24px' } 
      }}
    >
      {isConfigMode ? (
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleSaveConfig} 
          initialValues={{ enabled: true, level: 'green', frequency: 'immediate' }}
          className="animate-fade-in"
        >
          <div className="bg-white p-5 rounded-xl border border-gray-200 mb-6 shadow-sm">
            <Form.Item name="enabled" valuePropName="checked" className="mb-0">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-gray-900 font-bold">Activar Notificaciones</div>
                  <div className="text-gray-500 text-xs mt-1">Empezará a funcionar inmediatamente</div>
                </div>
                <Switch className="bg-gray-300 checked:bg-indigo-600" />
              </div>
            </Form.Item>
          </div>
          
          <Form.Item 
            name="email" 
            label={<span className="text-gray-700 font-semibold">Correo Electrónico Destino</span>} 
            rules={[{ required: true, type: 'email', message: 'Ingresa un correo válido' }]}
          >
            <Input placeholder="equipo@telco.com" size="large" className="rounded-lg shadow-sm" />
          </Form.Item>
          
          <Form.Item name="level" label={<span className="text-gray-700 font-semibold">Nivel de Urgencia</span>}>
            <Select size="large" className="rounded-lg shadow-sm">
              <Option value="green">🟢 Solo Acciones Inmediatas (Subirse ya)</Option>
              <Option value="yellow">🟢 + 🟡 Inmediatas y Monitoreo</Option>
              <Option value="all">Todas las señales de inteligencia</Option>
            </Select>
          </Form.Item>

          <Form.Item name="frequency" label={<span className="text-gray-700 font-semibold">Frecuencia de Envío</span>}>
            <Select size="large" className="rounded-lg shadow-sm">
              <Option value="immediate">⚡ Inmediato (Tan pronto se detecta)</Option>
              <Option value="daily_morning">🌅 Resumen Diario (8:00 AM)</Option>
              <Option value="daily_evening">🌇 Resumen Diario (6:00 PM)</Option>
              <Option value="weekly">📅 Resumen Semanal (Lunes)</Option>
            </Select>
          </Form.Item>

          <Divider className="border-gray-200 my-8" />
          
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large" className="w-full bg-slate-900 hover:bg-orange-600 border-none font-bold tracking-widest rounded-none h-12 shadow-md uppercase text-xs">
            CREAR Y ACTIVAR ALERTA
          </Button>
        </Form>
      ) : (
        <div className="animate-fade-in flex flex-col h-full">
          <Button 
            type="dashed" 
            block 
            icon={<PlusOutlined />} 
            onClick={() => setIsConfigMode(true)}
            className="mb-8 bg-white border-gray-300 text-gray-500 hover:text-orange-600 hover:border-orange-400 h-12 rounded-none font-bold tracking-widest uppercase text-xs shadow-sm"
          >
            Nueva Alerta Automática
          </Button>

          <div className="mb-4 px-1">
            <Text type="secondary" className="font-bold text-xs uppercase tracking-wider text-gray-500">Tus Reglas Activas</Text>
          </div>

          <List
            dataSource={activeConfigs}
            locale={{ emptyText: 'No tienes alertas configuradas.' }}
            renderItem={(item) => (
              <List.Item className={`bg-white border ${item.enabled ? 'border-gray-300 shadow-sm' : 'border-gray-200 opacity-70'} p-4 rounded-none mb-4 flex-col items-start gap-4 transition-all duration-300 hover:shadow-md`}>
                <div className="flex justify-between items-start w-full">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.enabled ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                      <MailOutlined className="text-lg" />
                    </div>
                    <div className="flex flex-col">
                      <Text className={`font-bold ${item.enabled ? 'text-gray-900' : 'text-gray-500'}`}>
                        {item.email}
                      </Text>
                      <Text className="text-xs text-gray-400">Vía Email</Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <Popconfirm 
                      title="¿Seguro que deseas eliminar esta alerta?" 
                      description="Esta acción no se puede deshacer."
                      onConfirm={() => deleteConfig(item.id)} 
                      okText="Eliminar" 
                      cancelText="Cancelar"
                      okButtonProps={{ danger: true }}
                    >
                      <Button type="text" danger icon={<DeleteOutlined />} size="small" className="hover:bg-red-50" />
                    </Popconfirm>
                    <Switch 
                      size="small" 
                      checked={item.enabled} 
                      onChange={(checked) => toggleConfig(item.id, checked)} 
                      className="bg-gray-300 checked:bg-indigo-600" 
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap w-full pl-[52px]">
                  {getLevelTag(item.level)}
                  <Tag className="bg-gray-100 border-gray-200 text-gray-600 m-0 font-medium">{getFreqLabel(item.frequency)}</Tag>
                </div>
              </List.Item>
            )}
          />
        </div>
      )}
    </Drawer>
  );
};

export default AlertPanel;
