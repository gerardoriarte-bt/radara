import { useState } from 'react';
import { Table, Tag, Button, Modal, Form, Input, Select, Avatar, Typography } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { CompetitorData, CompetitorProfile } from '../../hooks/useTrendsData';

const { Title, Text } = Typography;
const { Option } = Select;

interface Props {
  postsData: CompetitorData[];
  profiles: CompetitorProfile[];
  loading: boolean;
  onAddProfile: (profile: Omit<CompetitorProfile, 'id'>) => void;
  onRemoveProfile: (id: string) => void;
}

const CompetitorTable = ({ postsData, profiles, loading, onAddProfile, onRemoveProfile }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = (values: any) => {
    onAddProfile({
      name: values.name,
      platform: values.platform,
      handle: values.handle,
    });
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns: ColumnsType<CompetitorData> = [
    {
      title: 'Aerolínea / Marca',
      dataIndex: 'airline',
      key: 'airline',
      render: (airline) => {
        const color = airline.toUpperCase() === 'LATAM' ? 'blue' : airline.toUpperCase() === 'WINGO' ? 'purple' : 'cyan';
        return <Tag color={color} className="font-bold border-0 bg-opacity-20 uppercase tracking-wider">{airline}</Tag>;
      }
    },
    {
      title: 'Post/Tema',
      dataIndex: 'post',
      key: 'post',
      render: (text) => <Text className="text-gray-600">{text}</Text>
    },
    {
      title: 'Plataforma',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: 'Vistas',
      dataIndex: 'views',
      key: 'views',
      sorter: (a, b) => a.views - b.views,
      render: (views) => <Text className="text-green-600 font-mono font-medium">{views.toLocaleString()}</Text>,
    },
    {
      title: 'Compartidos',
      dataIndex: 'shares',
      key: 'shares',
      sorter: (a, b) => a.shares - b.shares,
      render: (shares) => <Text className="text-blue-600 font-mono font-medium">{shares.toLocaleString()}</Text>,
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (date) => <Text type="secondary">{date}</Text>
    }
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl mb-8 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <Title level={4} style={{ color: '#111827', margin: 0 }}>Radar de Competencia</Title>
          <Text type="secondary" className="text-sm">Monitoreo en tiempo real de aerolíneas vigiladas</Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => setIsModalOpen(true)}
          className="mt-4 md:mt-0 bg-[#E1251B] hover:bg-red-700 border-none shadow-md"
        >
          Agregar Perfil
        </Button>
      </div>

      {/* Profiles Tags List */}
      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
        {profiles.map(profile => (
          <Tag 
            key={profile.id} 
            closable 
            onClose={() => onRemoveProfile(profile.id)}
            className="flex items-center gap-2 py-1.5 px-3 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm shadow-sm"
          >
            <Avatar size="small" icon={<UserOutlined />} className="bg-gray-100 text-gray-400" />
            <span><strong className="text-gray-900">{profile.name}</strong> • {profile.handle}</span>
          </Tag>
        ))}
      </div>

      <Table 
        columns={columns} 
        dataSource={postsData} 
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 'max-content' }}
        rowClassName={() => "hover:bg-gray-50 transition-colors"}
      />

      <Modal 
        title="Agregar Perfil de Competencia" 
        open={isModalOpen} 
        onOk={() => form.submit()} 
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{ className: 'bg-[#E1251B] hover:bg-red-700 border-none' }}
      >
        <Form form={form} layout="vertical" onFinish={handleAdd} className="mt-4">
          <Form.Item name="name" label="Nombre de la marca / Aerolínea" rules={[{ required: true, message: 'Requerido' }]}>
            <Input placeholder="Ej. Copa Airlines" className="bg-white border-gray-300" />
          </Form.Item>
          <Form.Item name="platform" label="Red Social" rules={[{ required: true, message: 'Requerido' }]}>
            <Select placeholder="Selecciona una red">
              <Option value="Twitter">Twitter / X</Option>
              <Option value="Instagram">Instagram</Option>
              <Option value="TikTok">TikTok</Option>
              <Option value="Facebook">Facebook</Option>
            </Select>
          </Form.Item>
          <Form.Item name="handle" label="Usuario / Handle" rules={[{ required: true, message: 'Requerido' }]}>
            <Input prefix="@" placeholder="CopaAirlines" className="bg-white border-gray-300" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CompetitorTable;
