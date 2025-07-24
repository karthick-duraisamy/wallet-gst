
import React from 'react';
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

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

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
        width={70} 
        className="side-menu"
        style={{
          background: '#5A4FCF',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          zIndex: 100,
          overflow: 'visible',
        }}
      >
        <div className="side-menu-content">
          <div className="logo-section">
            <div className="logo-icon">
              <FileTextOutlined style={{ color: 'white', fontSize: '24px' }} />
            </div>
          </div>
          
          <div className="menu-navigation">
            {sideMenuItems.map(item => (
              <div 
                key={item.key}
                className={`nav-item ${getCurrentKey() === item.key ? 'active' : ''}`}
                onClick={item.onClick}
                title={item.label}
              >
                <div className="nav-icon">
                  {item.icon}
                </div>
                <div className="nav-tooltip">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          
          <div className="menu-footer">
            <div className="nav-item" title="Settings">
              <div className="nav-icon">
                <SettingOutlined />
              </div>
              <div className="nav-tooltip">
                Settings
              </div>
            </div>
          </div>
        </div>
      </Sider>

      <Layout style={{ marginLeft: 70 }}>
        <Header className="main-header" style={{
          background: 'white',
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div className="header-left">
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#2B4CB8' }}>
              GST Claim
            </h1>
          </div>
          
          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button type="text" icon={<NotificationOutlined />} style={{ color: '#666' }} />
            <Button type="text" icon={<SettingOutlined />} style={{ color: '#666' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#666' }}>India (INR)</span>
              <Avatar style={{ backgroundColor: '#f56a00' }}>IN</Avatar>
            </div>
            
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button type="text" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Avatar style={{ backgroundColor: '#1890ff' }}>
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </Avatar>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '12px', color: '#666' }}>Mr. {user?.name || 'User'}</div>
                  <div style={{ fontSize: '10px', color: '#999' }}>Admin</div>
                </div>
              </Button>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ padding: '24px', background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
          <div className="fade-in">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
