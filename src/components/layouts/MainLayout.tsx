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
  NotificationOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import { useTheme } from '../../contexts/ThemeContext';
import SettingsModal from '../SettingsModal';
import ProfileModal from '../ProfileModal';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Logo } from '../../components/Icons/Logo'

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { isDarkMode, language, menuLayout, setLanguage, translate } = useTheme();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleLogout = () => {
    Modal.confirm({
      title: 'Sign Out',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to sign out?',
      okText: 'Sign Out',
      cancelText: 'Cancel',
      onOk() {
        dispatch(logout());
        navigate('/auth/login');
      },
    });
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: translate('profile'),
      onClick: () => setProfileModalOpen(true),
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
    {
      key: '/report',
      icon: <BarChartOutlined />,
      label: 'Report',
      onClick: () => navigate('/report'),
    },
  ];

  const getCurrentKey = () => {
    return location.pathname;
  };

  return (
    <Layout className="main-layout" style={{ minHeight: '100vh' }}>
      {/* Conditional Header based on menu layout */}
      {menuLayout === 'horizontal' ? (
        /* Top Horizontal Menu Layout */
        <>
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
                <Logo/>
                {/* <img src="/src/assets/gst-logo.svg" alt="GST Claim" /> */}
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
                          <div style={{ 
                            width: '20px', 
                            height: '14px', 
                            borderRadius: '2px', 
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            lineHeight: '1',
                          }}>
                            🇺🇸
                          </div>
                          {translate('english')}
                        </div>
                      ),
                      onClick: () => setLanguage('en')
                    },
                    {
                      key: 'hi', 
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ 
                            width: '20px', 
                            height: '14px', 
                            borderRadius: '2px', 
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            lineHeight: '1'
                          }}>
                            🇮🇳
                          </div>
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
                  <div style={{ 
                    width: '20px', 
                    height: '14px', 
                    borderRadius: '2px', 
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    lineHeight: '1'
                  }}>
                    {language === 'en' ? '🇺🇸' : '🇮🇳'}
                  </div>
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
                  fontSize: '20px'
                }} 
                onClick={() => setSettingsModalOpen(true)}
              >
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  background: isDarkMode ? 
                    'linear-gradient(90deg, #666 50%, transparent 50%)' : 
                    'linear-gradient(90deg, #333 50%, transparent 50%)',
                  border: isDarkMode ? '2px solid #666' : '2px solid #333',
                  transition: 'all 0.3s ease'
                }} />
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

          {/* Horizontal Navigation Menu Below Header */}
          <div style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            zIndex: 199,
            background: isDarkMode ? '#262626' : '#4C1D95',
            borderBottom: isDarkMode ? '1px solid #424242' : '1px solid #FFFFFF',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              {sideMenuItems.map(item => (
                <div 
                  key={item.key}
                  className={`nav-item-horizontal ${getCurrentKey() === item.key ? 'active' : ''}`}
                  onClick={item.onClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: getCurrentKey() === item.key ? 
                      (isDarkMode ? 'rgba(24, 144, 255, 0.2)' : 'rgba(24, 144, 255, 0.1)') : 'transparent',
                    color: getCurrentKey() === item.key ? 
                      '#ffffff' : (isDarkMode ? '#ffffff' : '#ffffff  '),
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '20px' }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: '500' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Layout style={{ marginTop: 124 }}>
            <Content style={{ 
              padding: '24px', 
              background: isDarkMode ? '#141414' : '#f5f5f5', 
              minHeight: 'calc(100vh - 188px)' 
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
          </Layout>
        </>
      ) : (
        /* Side Vertical Menu Layout */
        <>
          <Sider 
            width={200} 
            className="side-menu"
            style={{
              background: isDarkMode ? '#262626' : '#5A4FCF',
              position: 'fixed',
              height: 'calc(100vh - 64px)',
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
            {/* <img src="/src/assets/gst-logo.svg" alt="GST Claim"/> */}
            <Logo/>
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
               location.pathname === '/cumulative-invoice' ? translate('cumulative') :
               location.pathname.startsWith('/report') ? 'Report' : translate('dashboard')}
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
                      <div style={{ 
                        width: '20px', 
                        height: '14px', 
                        borderRadius: '2px', 
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        lineHeight: '1'
                      }}>
                        🇺🇸
                      </div>
                      {translate('english')}
                    </div>
                  ),
                  onClick: () => setLanguage('en')
                },
                {
                  key: 'hi', 
                  label: (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ 
                        width: '20px', 
                        height: '14px', 
                        borderRadius: '2px', 
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        lineHeight: '1'
                      }}>
                        🇮🇳
                      </div>
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
              <div className="cls-langBox">
                {language === 'en' ? '🇺🇸' : '🇮🇳'}
              </div>
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
              fontSize: '20px'
            }} 
            onClick={() => setSettingsModalOpen(true)}
          >
            <div style={{ 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              background: isDarkMode ? 
                'linear-gradient(90deg, #666 50%, transparent 50%)' : 
                'linear-gradient(90deg, #333 50%, transparent 50%)',
              border: isDarkMode ? '2px solid #666' : '2px solid #333',
              transition: 'all 0.3s ease'
            }} />
          </Button>

          {/* <Button 
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
          </Button> */}

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


      </Layout>
        </>
      )}

      {/* Settings Modal - moved outside conditional rendering */}
      <SettingsModal 
        open={settingsModalOpen} 
        onClose={() => setSettingsModalOpen(false)} 
      />

      {/* Profile Modal */}
      <ProfileModal 
        open={profileModalOpen} 
        onClose={() => setProfileModalOpen(false)} 
      />
    </Layout>
  );
};

export default MainLayout;