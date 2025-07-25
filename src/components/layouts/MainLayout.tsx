
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Dropdown, Button, Avatar } from 'antd';
import { 
  LogoutOutlined, 
  UserOutlined, 
  FileTextOutlined,
  DashboardOutlined,
  UploadOutlined,
  ReconciliationOutlined,
  SettingOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import { useTheme } from '../../contexts/ThemeContext';
import SettingsModal from '../SettingsModal';

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { isDarkMode, language, setLanguage, translate } = useTheme();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: translate('profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: translate('logout'),
      onClick: handleLogout,
    },
  ];

  const sideMenuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: translate('dashboard'),
      onClick: () => navigate('/dashboard'),
    },
    {
      key: '/upload',
      icon: <UploadOutlined />,
      label: translate('upload'),
      onClick: () => navigate('/upload'),
    },
    {
      key: '/reconciliation',
      icon: <ReconciliationOutlined />,
      label: translate('reconciliation'),
      onClick: () => navigate('/reconciliation'),
    },
    {
      key: '/cumulative-invoice',
      icon: <FileTextOutlined />,
      label: translate('cumulative'),
      onClick: () => navigate('/cumulative-invoice'),
    },
  ];

  const getCurrentKey = () => {
    return location.pathname;
  };

  return (
    <Layout className="main-layout" style={{ minHeight: '100vh' }}>
      <Sider 
        width={200} 
        className="side-menu"
        style={{
          background: isDarkMode ? '#262626' : '#5A4FCF',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 64,
          zIndex: 50,
          overflow: 'visible',
        }}
      >
        <div className="side-menu-content" style={{ height: 'calc(100vh - 64px)' }}>
          <div className="menu-navigation" style={{ paddingTop: '24px' }}>
            {sideMenuItems.map(item => (
              <div 
                key={item.key}
                className={`nav-item-with-label ${getCurrentKey() === item.key ? 'active' : ''}`}
                onClick={item.onClick}
              >
                <div className="nav-icon">
                  {item.icon}
                </div>
                <span className="nav-label">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          
          <div className="menu-footer">
            <div className="nav-item-with-label">
              <div className="nav-icon">
                <SettingOutlined />
              </div>
              <span className="nav-label">
                {translate('settings')}
              </span>
            </div>
          </div>
        </div>
      </Sider>

      {/* Header spanning full width */}
      <Header className="main-header" style={{
        background: isDarkMode ? '#1f1f1f' : 'white',
        padding: '0 24px',
        boxShadow: isDarkMode ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        width: '100%',
        height: '64px',
        borderBottom: isDarkMode ? '1px solid #424242' : '1px solid #f0f0f0'
      }}>
        <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/src/assets/gst-logo.png" alt="GST Claim" style={{ width: '40px', height: '40px' }} />
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: isDarkMode ? '#a6a6a6' : '#8c8c8c',
            fontSize: '14px'
          }}>
            <span style={{ cursor: 'pointer' }}>{translate('home')}</span>
            <span>/</span>
            <span style={{ color: isDarkMode ? '#ffffff' : '#1a1a1a' }}>
              {location.pathname === '/dashboard' ? translate('dashboard') : 
               location.pathname === '/upload' ? translate('upload') :
               location.pathname === '/reconciliation' ? translate('reconciliation') :
               location.pathname === '/cumulative-invoice' ? translate('cumulative') : translate('dashboard')}
            </span>
          </div>
        </div>
        
        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Dropdown 
            menu={{ 
              items: [
                {
                  key: 'en',
                  label: (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Avatar size={16} style={{ backgroundColor: '#52c41a' }}>🇺🇸</Avatar>
                      {translate('english')}
                    </div>
                  ),
                  onClick: () => setLanguage('en')
                },
                {
                  key: 'hi', 
                  label: (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Avatar size={16} style={{ backgroundColor: '#ff7a45' }}>🇮🇳</Avatar>
                      {translate('hindi')}
                    </div>
                  ),
                  onClick: () => setLanguage('hi')
                }
              ]
            }} 
            placement="bottomRight"
          >
            <Button 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                background: 'transparent',
                color: isDarkMode ? '#ffffff' : '#1a1a1a',
                fontSize: '14px',
                fontWeight: '500',
                padding: '4px 8px'
              }}
            >
              <Avatar size={16} style={{ backgroundColor: language === 'en' ? '#52c41a' : '#ff7a45' }}>
                {language === 'en' ? '🇺🇸' : '🇮🇳'}
              </Avatar>
              {language === 'en' ? translate('english') : translate('hindi')}
              <span style={{ fontSize: '12px' }}>▼</span>
            </Button>
          </Dropdown>

          <Button 
            type="text" 
            style={{ 
              color: isDarkMode ? '#a6a6a6' : '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              border: 'none',
              fontSize: '18px'
            }} 
            onClick={() => setSettingsModalOpen(true)}
          >
            🎨
          </Button>

          <Button 
            type="text" 
            style={{ 
              color: isDarkMode ? '#a6a6a6' : '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              border: 'none',
              fontSize: '18px'
            }} 
          >
            ⛶
          </Button>
          
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button 
              type="text" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '4px 8px',
                height: 'auto',
                border: 'none'
              }}
            >
              <Avatar size="small" style={{ backgroundColor: '#87d068' }}>S</Avatar>
              <div style={{ textAlign: 'left' }}>
                <div style={{ 
                  fontSize: '14px', 
                  color: isDarkMode ? '#ffffff' : '#1a1a1a',
                  fontWeight: '500'
                }}>
                  {translate('superadmin')}
                </div>
              </div>
              <span style={{ fontSize: '12px', color: isDarkMode ? '#a6a6a6' : '#666' }}>▼</span>
            </Button>
          </Dropdown>
        </div>
      </Header>

      <Layout style={{ marginLeft: 200, marginTop: 64 }}>
        <Content style={{ 
          padding: '24px', 
          background: isDarkMode ? '#141414' : '#f5f5f5', 
          minHeight: 'calc(100vh - 128px)' 
        }}>
          <div className="fade-in">
            <Outlet />
          </div>
        </Content>
        
        {/* Footer */}
        <div style={{
          background: isDarkMode ? '#141414' : '#f5f5f5',
          textAlign: 'center',
          padding: '16px 24px',
          borderTop: isDarkMode ? '1px solid #424242' : '1px solid #e8e8e8',
          fontSize: '14px',
          color: isDarkMode ? '#a6a6a6' : '#666'
        }}>
          {translate('poweredBy')}
        </div>
        
        {/* Settings Modal */}
        <SettingsModal 
          open={settingsModalOpen} 
          onClose={() => setSettingsModalOpen(false)} 
        />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
