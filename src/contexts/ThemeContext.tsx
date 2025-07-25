
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import { Locale } from 'antd/lib/locale-provider';

interface ThemeContextType {
  isDarkMode: boolean;
  language: 'en' | 'hi';
  toggleTheme: () => void;
  setLanguage: (lang: 'en' | 'hi') => void;
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

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguageState] = useState<'en' | 'hi'>('en');

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('gst_theme');
    const savedLanguage = localStorage.getItem('gst_language');
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
    
    if (savedLanguage) {
      setLanguageState(savedLanguage as 'en' | 'hi');
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
    <ThemeContext.Provider value={{ isDarkMode, language, toggleTheme, setLanguage }}>
      <ConfigProvider theme={antdTheme} locale={locale}>
        <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
          {children}
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
