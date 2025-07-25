
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
  const { isDarkMode, language, toggleTheme, setLanguage } = useTheme();

  const translations = {
    en: {
      settings: 'Theme settings',
      theme: 'Theme',
      language: 'Language',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      english: 'English',
      hindi: 'Hindi',
      themeDescription: 'Choose your preferred theme',
      languageDescription: 'Select your preferred language',
      sidemenuBgColor: 'Sidemenu bg color',
      backgroundColor: 'Background color',
      textColor: 'Text color',
      activeBackgroundColor: 'Active background color',
      activeTextColor: 'Active text color',
      menuIconColor: 'Menu icon color',
      primary: 'Primary',
      secondary: 'Secondary',
      notifications: 'Notifications',
      menuLayout: 'Menu layout',
    },
    hi: {
      settings: 'थीम सेटिंग्स',
      theme: 'थीम',
      language: 'भाषा',
      darkMode: 'डार्क मोड',
      lightMode: 'लाइट मोड',
      english: 'अंग्रेजी',
      hindi: 'हिंदी',
      themeDescription: 'अपनी पसंदीदा थीम चुनें',
      languageDescription: 'अपनी पसंदीदा भाषा चुनें',
      sidemenuBgColor: 'साइड मेन्यू बैकग्राउंड रंग',
      backgroundColor: 'बैकग्राउंड रंग',
      textColor: 'टेक्स्ट रंग',
      activeBackgroundColor: 'सक्रिय बैकग्राउंड रंग',
      activeTextColor: 'सक्रिय टेक्स्ट रंग',
      menuIconColor: 'मेन्यू आइकन रंग',
      primary: 'प्राथमिक',
      secondary: 'द्वितीयक',
      notifications: 'सूचनाएं',
      menuLayout: 'मेन्यू लेआउट',
    },
  };

  const t = translations[language];

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{t.settings}</span>
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
              {t.theme}
            </Title>
          </Space>
          
          {/* Theme Toggle Cards */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <div 
              onClick={() => !isDarkMode || toggleTheme()}
              style={{
                flex: 1,
                padding: '16px',
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
                  width: '40px', 
                  height: '30px', 
                  background: 'linear-gradient(135deg, #f0f2f5 0%, #ffffff 100%)',
                  borderRadius: '4px',
                  margin: '0 auto',
                  border: '1px solid #e8e8e8'
                }}></div>
              </div>
              <Text style={{ fontSize: '12px', color: '#000' }}>Default</Text>
            </div>
            
            <div 
              onClick={() => isDarkMode || toggleTheme()}
              style={{
                flex: 1,
                padding: '16px',
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
                  width: '40px', 
                  height: '30px', 
                  background: 'linear-gradient(135deg, #262626 0%, #1f1f1f 100%)',
                  borderRadius: '4px',
                  margin: '0 auto',
                  border: '1px solid #424242'
                }}></div>
              </div>
              <Text style={{ fontSize: '12px', color: '#fff' }}>Dark</Text>
            </div>
          </div>

          {/* Additional Theme Controls */}
          <div style={{ marginBottom: '16px' }}>
            <Text style={{ display: 'block', marginBottom: '8px', color: isDarkMode ? '#a6a6a6' : '#666' }}>
              {t.sidemenuBgColor}
            </Text>
            <Switch checked={true} style={{ marginRight: '8px' }} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Text style={{ display: 'block', marginBottom: '8px', color: isDarkMode ? '#a6a6a6' : '#666' }}>
              {t.backgroundColor}
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input 
                type="color" 
                value="#0044ff" 
                style={{ width: '40px', height: '30px', border: 'none', borderRadius: '4px' }}
              />
              <Text style={{ color: isDarkMode ? '#a6a6a6' : '#666' }}>#0044ff</Text>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Text style={{ display: 'block', marginBottom: '8px', color: isDarkMode ? '#a6a6a6' : '#666' }}>
              {t.textColor}
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input 
                type="color" 
                value="#ffffff" 
                style={{ width: '40px', height: '30px', border: 'none', borderRadius: '4px' }}
              />
              <Text style={{ color: isDarkMode ? '#a6a6a6' : '#666' }}>#ffffff</Text>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Text style={{ display: 'block', marginBottom: '8px', color: isDarkMode ? '#a6a6a6' : '#666' }}>
              {t.activeBackgroundColor}
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input 
                type="color" 
                value="#0c28a8" 
                style={{ width: '40px', height: '30px', border: 'none', borderRadius: '4px' }}
              />
              <Text style={{ color: isDarkMode ? '#a6a6a6' : '#666' }}>#0c28a8</Text>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Text style={{ display: 'block', marginBottom: '8px', color: isDarkMode ? '#a6a6a6' : '#666' }}>
              {t.activeTextColor}
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input 
                type="color" 
                value="#ff0000" 
                style={{ width: '40px', height: '30px', border: 'none', borderRadius: '4px' }}
              />
              <Text style={{ color: isDarkMode ? '#a6a6a6' : '#666' }}>#ff0000</Text>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Text style={{ display: 'block', marginBottom: '8px', color: isDarkMode ? '#a6a6a6' : '#666' }}>
              {t.menuIconColor}
            </Text>
            <div style={{ marginBottom: '8px' }}>
              <Text style={{ color: isDarkMode ? '#a6a6a6' : '#666' }}>{t.primary}</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <input 
                  type="color" 
                  value="#0a2071" 
                  style={{ width: '40px', height: '30px', border: 'none', borderRadius: '4px' }}
                />
                <Text style={{ color: isDarkMode ? '#a6a6a6' : '#666' }}>#0a2071</Text>
              </div>
            </div>
            <div>
              <Text style={{ color: isDarkMode ? '#a6a6a6' : '#666' }}>{t.secondary}</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <input 
                  type="color" 
                  value="#fd9646" 
                  style={{ width: '40px', height: '30px', border: 'none', borderRadius: '4px' }}
                />
                <Text style={{ color: isDarkMode ? '#a6a6a6' : '#666' }}>#fd9646</Text>
              </div>
            </div>
          </div>
        </div>

        <Divider style={{ borderColor: isDarkMode ? '#424242' : '#f0f0f0' }} />

        {/* Notifications */}
        <div>
          <Space align="center" style={{ marginBottom: 12, justifyContent: 'space-between', width: '100%' }}>
            <Title level={5} style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#000000' }}>
              {t.notifications}
            </Title>
            <Switch checked={true} />
          </Space>
        </div>

        <Divider style={{ borderColor: isDarkMode ? '#424242' : '#f0f0f0' }} />

        {/* Menu Layout */}
        <div>
          <Title level={5} style={{ margin: '0 0 16px 0', color: isDarkMode ? '#ffffff' : '#000000' }}>
            {t.menuLayout}
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

        <Divider style={{ borderColor: isDarkMode ? '#424242' : '#f0f0f0' }} />

        {/* Language Settings */}
        <div>
          <Space align="center" style={{ marginBottom: 12 }}>
            <GlobalOutlined />
            <Title level={5} style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#000000' }}>
              {t.language}
            </Title>
          </Space>
          <Text type="secondary" style={{ display: 'block', marginBottom: 16, color: isDarkMode ? '#a6a6a6' : '#666' }}>
            {t.languageDescription}
          </Text>
          <Select
            value={language}
            onChange={setLanguage}
            style={{ width: '100%' }}
            size="large"
          >
            <Option value="en">{t.english}</Option>
            <Option value="hi">{t.hindi}</Option>
          </Select>
        </div>
      </Space>
    </Drawer>
  );
};

export default SettingsModal;
