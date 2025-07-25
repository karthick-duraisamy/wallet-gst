
import React from 'react';
import { Drawer, Select, Switch, Typography, Space, Divider } from 'antd';
import { MoonOutlined, SunOutlined, GlobalOutlined, CloseOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';

const { Title, Text } = Typography;
const { Option } = Select;

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const { isDarkMode, toggleTheme, translate } = useTheme();

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{translate('themeSettings')}</span>
          <CloseOutlined 
            onClick={onClose} 
            style={{ 
              cursor: 'pointer', 
              fontSize: '16px',
              color: isDarkMode ? '#a6a6a6' : '#666'
            }} 
          />
        </div>
      }
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      width={400}
      headerStyle={{
        background: isDarkMode ? '#1f1f1f' : '#ffffff',
        borderBottom: isDarkMode ? '1px solid #424242' : '1px solid #f0f0f0',
        color: isDarkMode ? '#ffffff' : '#000000'
      }}
      bodyStyle={{
        background: isDarkMode ? '#1f1f1f' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000'
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Theme Settings */}
        <div>
          <Space align="center" style={{ marginBottom: 12 }}>
            {isDarkMode ? <MoonOutlined /> : <SunOutlined />}
            <Title level={5} style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#000000' }}>
              {translate('theme')}
            </Title>
          </Space>
          
          {/* Theme Toggle Cards */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <div 
              onClick={() => !isDarkMode || toggleTheme()}
              style={{
                flex: 1,
                padding: '12px',
                border: !isDarkMode ? '2px solid #1890ff' : '1px solid #d9d9d9',
                borderRadius: '8px',
                cursor: 'pointer',
                background: '#ffffff',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ marginBottom: '8px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '24px', 
                  background: 'linear-gradient(135deg, #f0f2f5 0%, #ffffff 100%)',
                  borderRadius: '4px',
                  margin: '0 auto',
                  border: '1px solid #e8e8e8'
                }}></div>
              </div>
              <Text style={{ fontSize: '11px', color: '#000' }}>{translate('default')}</Text>
            </div>
            
            <div 
              onClick={() => isDarkMode || toggleTheme()}
              style={{
                flex: 1,
                padding: '12px',
                border: isDarkMode ? '2px solid #1890ff' : '1px solid #d9d9d9',
                borderRadius: '8px',
                cursor: 'pointer',
                background: '#1f1f1f',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ marginBottom: '8px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '24px', 
                  background: 'linear-gradient(135deg, #262626 0%, #1f1f1f 100%)',
                  borderRadius: '4px',
                  margin: '0 auto',
                  border: '1px solid #424242'
                }}></div>
              </div>
              <Text style={{ fontSize: '11px', color: '#fff' }}>{translate('dark')}</Text>
            </div>

            <div 
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid #d9d9d9',
                borderRadius: '8px',
                cursor: 'pointer',
                background: isDarkMode ? '#262626' : '#f8f9fa',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ marginBottom: '8px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '24px', 
                  background: isDarkMode ? '#424242' : '#e9ecef',
                  borderRadius: '4px',
                  margin: '0 auto',
                  border: '1px solid #d9d9d9'
                }}></div>
              </div>
              <Text style={{ fontSize: '11px', color: isDarkMode ? '#a6a6a6' : '#666' }}>{translate('sideMenu')}</Text>
            </div>
          </div>

          {/* Additional Theme Controls */}
          <div style={{ marginBottom: '16px' }}>
            <Text style={{ display: 'block', marginBottom: '8px', color: isDarkMode ? '#a6a6a6' : '#666' }}>
              {translate('sidemenuBgColor')}
            </Text>
            <Switch checked={true} style={{ marginRight: '8px' }} />
          </div>
        </div>

        <Divider style={{ borderColor: isDarkMode ? '#424242' : '#f0f0f0' }} />

        {/* Notifications */}
        <div>
          <Space align="center" style={{ marginBottom: 12, justifyContent: 'space-between', width: '100%' }}>
            <Title level={5} style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#000000' }}>
              {translate('notifications')}
            </Title>
            <Switch checked={true} />
          </Space>
        </div>

        <Divider style={{ borderColor: isDarkMode ? '#424242' : '#f0f0f0' }} />

        {/* Menu Layout */}
        <div>
          <Title level={5} style={{ margin: '0 0 16px 0', color: isDarkMode ? '#ffffff' : '#000000' }}>
            {translate('menuLayout')}
          </Title>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              flex: 1,
              padding: '12px',
              border: '2px solid #1890ff',
              borderRadius: '8px',
              background: isDarkMode ? '#262626' : '#f8f9fa',
              textAlign: 'center'
            }}>
              <div style={{ 
                width: '30px', 
                height: '20px', 
                background: isDarkMode ? '#424242' : '#e9ecef',
                borderRadius: '2px',
                margin: '0 auto 8px'
              }}></div>
            </div>
            <div style={{
              flex: 1,
              padding: '12px',
              border: `1px solid ${isDarkMode ? '#424242' : '#d9d9d9'}`,
              borderRadius: '8px',
              background: isDarkMode ? '#262626' : '#f8f9fa',
              textAlign: 'center'
            }}>
              <div style={{ 
                width: '30px', 
                height: '20px', 
                background: isDarkMode ? '#424242' : '#e9ecef',
                borderRadius: '2px',
                margin: '0 auto 8px'
              }}></div>
            </div>
          </div>
        </div>

        
      </Space>
    </Drawer>
  );
};

export default SettingsModal;
