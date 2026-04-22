import { Table, Typography, Avatar, Tag } from 'antd';
import { UserOutlined, FireOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { CompetitorData, CompetitorProfile } from '../../hooks/useTrendsData';
import { useMemo } from 'react';

const { Title, Text } = Typography;

interface AggregatedCompetitor {
  id: string;
  name: string;
  handle: string;
  platform: string;
  totalViews: number;
}

interface Props {
  competitorsPosts: CompetitorData[];
  profiles: CompetitorProfile[];
}

const ProfileVolumeList = ({ competitorsPosts, profiles }: Props) => {
  const data = useMemo(() => {
    const volumeMap = new Map<string, AggregatedCompetitor>();

    competitorsPosts.forEach(post => {
      // Find matching profile to get the handle
      const profile = profiles.find(p => p.name.toLowerCase() === post.airline.toLowerCase());
      const key = profile ? profile.id : post.airline;

      if (!volumeMap.has(key)) {
        volumeMap.set(key, {
          id: key,
          name: post.airline,
          handle: profile ? profile.handle : '@' + post.airline.replace(/\s/g, '').toLowerCase(),
          platform: profile ? profile.platform : post.platform,
          totalViews: 0
        });
      }
      
      volumeMap.get(key)!.totalViews += post.views;
    });

    return Array.from(volumeMap.values()).sort((a, b) => b.totalViews - a.totalViews);
  }, [competitorsPosts, profiles]);

  const columns: ColumnsType<AggregatedCompetitor> = [
    {
      title: 'Aerolínea',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar icon={<UserOutlined />} className="bg-gray-100 border border-gray-200 text-gray-400 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-gray-900 font-bold tracking-wide">{record.name}</span>
            <span className="text-[11px] text-gray-500 font-mono">{record.handle}</span>
          </div>
        </div>
      )
    },
    {
      title: 'Interacciones',
      dataIndex: 'totalViews',
      key: 'totalViews',
      width: 160,
      render: (views) => (
        <Tag color="orange" className="bg-orange-50 border-orange-200 text-orange-600 px-3 py-1 font-mono text-sm rounded-lg flex items-center gap-2 w-fit">
          <FireOutlined /> {views >= 1000000 ? (views / 1000000).toFixed(1) + 'M' : views >= 1000 ? (views / 1000).toFixed(1) + 'K' : views}
        </Tag>
      )
    }
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl h-full flex flex-col bg-white">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <Title level={4} style={{ color: '#111827', margin: 0 }}>Líderes de Impacto</Title>
        <Text type="secondary" className="text-sm">Acumulado de vistas por marca de la competencia</Text>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="flex-grow"
        rowClassName={() => "hover:bg-gray-50 transition-colors"}
        locale={{ emptyText: 'No hay interacciones registradas' }}
      />
    </div>
  );
};

export default ProfileVolumeList;
