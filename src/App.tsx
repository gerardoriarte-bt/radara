import { ConfigProvider, theme } from 'antd';
import esES from 'antd/locale/es_ES';
import DashboardLayout from './components/Layout/DashboardLayout';

function App() {
  return (
    <ConfigProvider 
      locale={esES}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#E1251B', // Avianca Red
          fontFamily: 'Inter, system-ui, sans-serif',
          colorBgBase: '#F9FAFB', // Light gray background
          colorBgContainer: '#FFFFFF', // White components
          colorBorderSecondary: 'rgba(0,0,0,0.06)',
          colorTextBase: '#111827', // Dark gray text
        },
      }}
    >
      <DashboardLayout />
    </ConfigProvider>
  );
}

export default App;
