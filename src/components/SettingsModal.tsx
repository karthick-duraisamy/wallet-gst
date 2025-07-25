
import React from 'react';
import { Drawer, Switch, Typography, Space, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';

const { Title, Text } = Typography;

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const { isDarkMode, toggleTheme, menuLayout, setMenuLayout, translate } = useTheme();

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🎨</span>
            <span>{translate('themeSettings')}</span>
          </div>
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
          <Title level={5} style={{ margin: '0 0 16px 0', color: isDarkMode ? '#ffffff' : '#000000' }}>
            {translate('theme')}
          </Title>

          {/* Theme Toggle Cards */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <div 
              onClick={() => !isDarkMode || toggleTheme()}
              style={{
                flex: 1,
                padding: '16px',
                border: !isDarkMode ? '2px solid #52c41a' : `1px solid ${isDarkMode ? '#424242' : '#d9d9d9'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                background: '#ffffff',
                textAlign: 'center',
                transition: 'all 0.2s',
                position: 'relative'
              }}
            >
              {!isDarkMode && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#52c41a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '10px' }}>✓</span>
                </div>
              )}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '40px', 
                  background: 'linear-gradient(135deg, #f0f2f5 0%, #ffffff 100%)',
                  borderRadius: '6px',
                  margin: '0 auto',
                  border: '1px solid #e8e8e8',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '4px'
                }}>
                  <div style={{ width: '100%', height: '8px', background: '#1890ff', borderRadius: '2px', marginBottom: '2px' }}></div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <div style={{ width: '8px', height: '24px', background: '#f0f0f0', borderRadius: '1px' }}></div>
                    <div style={{ flex: 1, height: '24px', background: '#f8f8f8', borderRadius: '1px' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              onClick={() => isDarkMode || toggleTheme()}
              style={{
                flex: 1,
                padding: '16px',
                border: isDarkMode ? '2px solid #52c41a' : `1px solid ${isDarkMode ? '#424242' : '#d9d9d9'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                background: '#1f1f1f',
                textAlign: 'center',
                transition: 'all 0.2s',
                position: 'relative'
              }}
            >
              {isDarkMode && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#52c41a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '10px' }}>✓</span>
                </div>
              )}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '40px', 
                  background: 'linear-gradient(135deg, #262626 0%, #1f1f1f 100%)',
                  borderRadius: '6px',
                  margin: '0 auto',
                  border: '1px solid #424242',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '4px'
                }}>
                  <div style={{ width: '100%', height: '8px', background: '#1890ff', borderRadius: '2px', marginBottom: '2px' }}></div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <div style={{ width: '8px', height: '24px', background: '#424242', borderRadius: '1px' }}></div>
                    <div style={{ flex: 1, height: '24px', background: '#333333', borderRadius: '1px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidemenu bg color */}
        {/* <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <Title level={5} style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#000000' }}>
              Sidemenu bg color
            </Title>
            <Switch checked={true} />
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#ffffff',
              border: '2px solid #d9d9d9',
              borderRadius: '6px',
              cursor: 'pointer'
            }}></div>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#595959',
              border: '2px solid #d9d9d9',
              borderRadius: '6px',
              cursor: 'pointer'
            }}></div>
          </div>
        </div> */}

        {/* Notifications */}
        {/* <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Title level={5} style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#000000' }}>
              Notifications
            </Title>
            <Switch checked={true} />
          </div>
        </div> */}

        {/* Menu Layout */}
        <div>
          <Title level={5} style={{ margin: '0 0 16px 0', color: isDarkMode ? '#ffffff' : '#000000' }}>
            Menu layout
          </Title>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Side Vertical Layout */}
            <div 
              onClick={() => setMenuLayout('vertical')}
              style={{
                flex: 1,
                padding: '16px',
                border: menuLayout === 'vertical' ? '2px solid #52c41a' : `1px solid ${isDarkMode ? '#424242' : '#d9d9d9'}`,
                borderRadius: '8px',
                background: isDarkMode ? '#262626' : '#f8f9fa',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative'
              }}
            >
              {menuLayout === 'vertical' && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#52c41a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '10px' }}>✓</span>
                </div>
              )}
              {/* Vertical menu visualization */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '40px', 
                  background: isDarkMode ? '#1f1f1f' : '#ffffff',
                  borderRadius: '6px',
                  margin: '0 auto',
                  border: `1px solid ${isDarkMode ? '#424242' : '#e8e8e8'}`,
                  display: 'flex',
                  padding: '4px'
                }}>
                  <div style={{ 
                    width: '12px', 
                    height: '100%', 
                    background: isDarkMode ? '#424242' : '#e9ecef',
                    borderRadius: '2px',
                    marginRight: '2px'
                  }}></div>
                  <div style={{ 
                    flex: 1, 
                    height: '100%', 
                    background: isDarkMode ? '#333333' : '#f8f8f8',
                    borderRadius: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    padding: '2px'
                  }}>
                    <div style={{ height: '4px', background: isDarkMode ? '#424242' : '#e9ecef', borderRadius: '1px' }}></div>
                    <div style={{ height: '4px', background: isDarkMode ? '#424242' : '#e9ecef', borderRadius: '1px' }}></div>
                    <div style={{ height: '4px', background: isDarkMode ? '#424242' : '#e9ecef', borderRadius: '1px' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Horizontal Layout */}
            <div 
              onClick={() => setMenuLayout('horizontal')}
              style={{
                flex: 1,
                padding: '16px',
                border: menuLayout === 'horizontal' ? '2px solid #52c41a' : `1px solid ${isDarkMode ? '#424242' : '#d9d9d9'}`,
                borderRadius: '8px',
                background: isDarkMode ? '#262626' : '#f8f9fa',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative'
              }}
            >
              {menuLayout === 'horizontal' && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#52c41a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '10px' }}>✓</span>
                </div>
              )}
              {/* Horizontal menu visualization */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '40px', 
                  background: isDarkMode ? '#1f1f1f' : '#ffffff',
                  borderRadius: '6px',
                  margin: '0 auto',
                  border: `1px solid ${isDarkMode ? '#424242' : '#e8e8e8'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '4px'
                }}>
                  <div style={{ 
                    width: '100%', 
                    height: '8px', 
                    background: isDarkMode ? '#424242' : '#e9ecef',
                    borderRadius: '2px',
                    marginBottom: '2px',
                    display: 'flex',
                    gap: '2px',
                    padding: '1px'
                  }}>
                    <div style={{ flex: 1, background: isDarkMode ? '#666' : '#ccc', borderRadius: '1px' }}></div>
                    <div style={{ flex: 1, background: isDarkMode ? '#666' : '#ccc', borderRadius: '1px' }}></div>
                    <div style={{ flex: 1, background: isDarkMode ? '#666' : '#ccc', borderRadius: '1px' }}></div>
                  </div>
                  <div style={{ 
                    flex: 1, 
                    width: '100%', 
                    background: isDarkMode ? '#333333' : '#f8f8f8',
                    borderRadius: '2px'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Space>
    </Drawer>
  );
};

export default SettingsModal;
