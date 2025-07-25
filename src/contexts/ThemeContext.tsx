
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import { Locale } from 'antd/lib/locale-provider';

interface ThemeContextType {
  isDarkMode: boolean;
  language: 'en' | 'hi';
  menuLayout: 'horizontal' | 'vertical';
  toggleTheme: () => void;
  setLanguage: (lang: 'en' | 'hi') => void;
  setMenuLayout: (layout: 'horizontal' | 'vertical') => void;
  translate: (key: string) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Comprehensive translations object
const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    upload: 'Upload',
    reconciliation: 'Reconciliation',
    cumulative: 'Cumulative',
    home: 'Home',
    settings: 'Settings',
    
    // User menu
    profile: 'Profile',
    logout: 'Logout',
    
    // Theme settings
    themeSettings: 'Theme settings',
    theme: 'Theme',
    default: 'Default',
    dark: 'Dark',
    sideMenu: 'Side Menu',
    sidemenuBgColor: 'Sidemenu bg color',
    notifications: 'Notifications',
    menuLayout: 'Menu layout',
    
    // Common
    english: 'English',
    hindi: 'हिंदी',
    superadmin: 'Superadmin',
    
    // Login
    login: 'Login',
    email: 'Email Address',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    
    // Dashboard
    overallSummary: 'Overall summary',
    recentFailures: 'Recent failures',
    
    // Upload
    uploadFiles: 'Upload Files',
    selectFiles: 'Select Files',
    
    // Footer
    poweredBy: '@Powered by Infinitisoftware Solution.',
    
    // Menu Layout
    horizontal: 'Horizontal',
    vertical: 'Vertical',
    topHorizontal: 'Top Horizontal',
    sideVertical: 'Side Vertical',
    
    // Dashboard specific
    email: 'Email',
    pushNotification: 'Push Notification',
    
    // Upload specific
    clickDragFiles: 'Click or drag files to this area to upload',
    uploadHint: 'Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.'
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    upload: 'अपलोड',
    reconciliation: 'सुलह',
    cumulative: 'संचयी',
    home: 'होम',
    settings: 'सेटिंग्स',
    
    // User menu
    profile: 'प्रोफ़ाइल',
    logout: 'लॉग आउट',
    
    // Theme settings
    themeSettings: 'थीम सेटिंग्स',
    theme: 'थीम',
    default: 'डिफ़ॉल्ट',
    dark: 'डार्क',
    sideMenu: 'साइड मेन्यू',
    sidemenuBgColor: 'साइड मेन्यू बैकग्राउंड रंग',
    notifications: 'सूचनाएं',
    menuLayout: 'मेन्यू लेआउट',
    
    // Common
    english: 'English',
    hindi: 'हिंदी',
    superadmin: 'सुपरएडमिन',
    
    // Login
    login: 'लॉगिन',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    rememberMe: 'मुझे याद रखें',
    forgotPassword: 'पासवर्ड भूल गए?',
    
    // Dashboard
    overallSummary: 'समग्र सारांश',
    recentFailures: 'हाल की असफलताएं',
    
    // Upload
    uploadFiles: 'फ़ाइलें अपलोड करें',
    selectFiles: 'फ़ाइलें चुनें',
    
    // Footer
    poweredBy: '@इन्फिनिटिसॉफ्टवेयर सोल्यूशन द्वारा संचालित।',
    
    // Menu Layout
    horizontal: 'क्षैतिज',
    vertical: 'खड़ा',
    topHorizontal: 'शीर्ष क्षैतिज',
    sideVertical: 'साइड वर्टिकल',
    
    // Dashboard specific
    email: 'ईमेल',
    pushNotification: 'पुश सूचना',
    
    // Upload specific
    clickDragFiles: 'अपलोड करने के लिए इस क्षेत्र में फ़ाइलों को क्लिक करें या खींचें',
    uploadHint: 'एकल या बल्क अपलोड के लिए समर्थन। कंपनी डेटा या अन्य प्रतिबंधित फ़ाइलों को अपलोड करना सख्त वर्जित है।'
  }
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguageState] = useState<'en' | 'hi'>('en');
  const [menuLayout, setMenuLayoutState] = useState<'horizontal' | 'vertical'>('vertical');

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('gst_theme');
    const savedLanguage = localStorage.getItem('gst_language');
    const savedMenuLayout = localStorage.getItem('gst_menu_layout');
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
    
    if (savedLanguage) {
      setLanguageState(savedLanguage as 'en' | 'hi');
    }
    
    if (savedMenuLayout) {
      setMenuLayoutState(savedMenuLayout as 'horizontal' | 'vertical');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('gst_theme', newTheme ? 'dark' : 'light');
  };

  const setLanguage = (lang: 'en' | 'hi') => {
    setLanguageState(lang);
    localStorage.setItem('gst_language', lang);
  };

  const setMenuLayout = (layout: 'horizontal' | 'vertical') => {
    setMenuLayoutState(layout);
    localStorage.setItem('gst_menu_layout', layout);
  };

  // Translation helper function
  const translate = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const antdTheme = {
    token: {
      colorPrimary: '#6B46C1',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#ff4d4f',
      borderRadius: 8,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
      colorBgElevated: isDarkMode ? '#262626' : '#ffffff',
      colorBgLayout: isDarkMode ? '#141414' : '#f5f5f5',
      colorText: isDarkMode ? '#ffffff' : '#000000',
      colorTextSecondary: isDarkMode ? '#a6a6a6' : '#666666',
      colorBorder: isDarkMode ? '#424242' : '#d9d9d9',
    },
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  // Simple locale mapping (in real app, you'd use proper i18n)
  const locale: Locale = enUS;

  return (
    <ThemeContext.Provider value={{ isDarkMode, language, menuLayout, toggleTheme, setLanguage, setMenuLayout, translate }}>
      <ConfigProvider theme={antdTheme} locale={locale}>
        <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
          {children}
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
