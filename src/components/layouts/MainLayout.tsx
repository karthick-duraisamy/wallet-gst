import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Tabs, Dropdown, Button } from 'antd';
import { LogoutOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import UserAvatar from '../UserAvatar';

const { Header, Content } = Layout;

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

  const tabItems = [
    {
      key: '/dashboard',
      label: 'Dashboard',
    },
    {
      key: '/upload',
      label: 'Upload',
    },
    {
      key: '/reconciliation',
      label: 'Reconciliation',
    },
    {
      key: '/cumulative-invoice',
      label: 'Cumulative Invoice',
    },
  ];

  const handleTabChange = (key: string) => {
    navigate(key);
  };

  const getCurrentTab = () => {
    return location.pathname;
  };

  return (
    <Layout className="main-layout">
      <Header className="main-header">
        <div className="header-content">
          <div className="logo">
            <FileTextOutlined />
            GST Claim Tool
          </div>
          <div className="user-section">
            <span>Welcome, {user?.name || user?.email}</span>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button type="text" className="user-dropdown">
                <UserAvatar name={user?.name || user?.email || ''} />
              </Button>
            </Dropdown>
          </div>
        </div>
      </Header>
      
      <div className="nav-tabs">
        <Tabs
          activeKey={getCurrentTab()}
          onChange={handleTabChange}
          items={tabItems}
          type="line"
        />
      </div>

      <Content className="main-content">
        <div className="fade-in">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;