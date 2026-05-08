import { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import esES from 'antd/locale/es_ES';
import DashboardLayout from './components/Layout/DashboardLayout';
import LandingPage from './components/Views/LandingPage';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <ConfigProvider 
      locale={esES}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#F97316', // Premium Orange
          fontFamily: 'Inter, system-ui, sans-serif',
          colorBgBase: '#F9FAFB',
          colorBgContainer: '#FFFFFF',
          colorBorderSecondary: 'rgba(0,0,0,0.06)',
          colorTextBase: '#111827',
          borderRadius: 8,
        },
      }}
    >
      {showDashboard ? (
        <DashboardLayout />
      ) : (
        <LandingPage onEnter={() => setShowDashboard(true)} />
      )}
    </ConfigProvider>
  );
}

export default App;
