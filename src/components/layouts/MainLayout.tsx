
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
  const { isDarkMode, language, setLanguage } = useTheme();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const sideMenuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: '/upload',
      icon: <UploadOutlined />,
      label: 'Upload',
      onClick: () => navigate('/upload'),
    },
    {
      key: '/reconciliation',
      icon: <ReconciliationOutlined />,
      label: 'Reconciliation',
      onClick: () => navigate('/reconciliation'),
    },
    {
      key: '/cumulative-invoice',
      icon: <FileTextOutlined />,
      label: 'Cumulative',
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
                Settings
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
        <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileTextOutlined style={{ fontSize: '24px', color: '#2B4CB8' }} />
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#2B4CB8' }}>
              GST Claim
            </h1>
          </div>
        </div>
        
        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button 
            type="text" 
            icon={<NotificationOutlined />} 
            style={{ 
              color: isDarkMode ? '#a6a6a6' : '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px'
            }} 
          />
          
          <Button 
            type="text" 
            icon={<SettingOutlined />} 
            style={{ 
              color: isDarkMode ? '#a6a6a6' : '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px'
            }} 
            onClick={() => setSettingsModalOpen(true)}
          />
          
          <Dropdown 
            menu={{ 
              items: [
                {
                  key: 'en',
                  label: 'English',
                  onClick: () => setLanguage('en')
                },
                {
                  key: 'hi', 
                  label: 'हिंदी',
                  onClick: () => setLanguage('hi')
                }
              ]
            }} 
            placement="bottomRight"
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '4px 12px',
              borderRadius: '6px',
              background: isDarkMode ? '#262626' : '#f5f5f5',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <span style={{ 
                color: isDarkMode ? '#a6a6a6' : '#666',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {language === 'en' ? 'English' : 'हिंदी'}
              </span>
              <Avatar size="small" style={{ backgroundColor: '#f56a00', fontSize: '10px' }}>
                {language === 'en' ? 'EN' : 'हि'}
              </Avatar>
            </div>
          </Dropdown>
          
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button type="text" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '4px 8px',
              height: 'auto'
            }}>
              <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </Avatar>
              <div style={{ textAlign: 'left' }}>
                <div style={{ 
                  fontSize: '12px', 
                  color: isDarkMode ? '#ffffff' : '#666',
                  fontWeight: '500'
                }}>
                  Mr. {user?.name || 'User'}
                </div>
                <div style={{ 
                  fontSize: '10px', 
                  color: isDarkMode ? '#a6a6a6' : '#999'
                }}>
                  Admin
                </div>
              </div>
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
          @Powered by Infinitisoftware Solution.
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
