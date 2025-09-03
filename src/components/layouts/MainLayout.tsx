import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu, Dropdown, Button, Avatar } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  FileTextOutlined,
  DashboardOutlined,
  UploadOutlined,
  ReconciliationOutlined,
  SettingOutlined,
  NotificationOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { RootState } from "../../store/store";
import { logout } from "../../store/slices/authSlice";
import { useTheme } from "../../contexts/ThemeContext";
import SettingsModal from "../SettingsModal";
import ProfileModal from "../ProfileModal";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Logo } from "../../components/Icons/Logo";
import '../../styles/Menu.scss';

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { isDarkMode, language, menuLayout, setLanguage, translate } =
    useTheme();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleLogout = () => {
    Modal.confirm({
      title: "Sign Out",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to sign out?",
      okText: "Sign Out",
      cancelText: "Cancel",
      onOk() {
        dispatch(logout());
        navigate("/auth/login");
      },
    });
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: translate("profile"),
      onClick: () => setProfileModalOpen(true),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: translate("logout"),
      onClick: handleLogout,
    },
  ];

  const sideMenuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: translate("dashboard"),
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "/upload",
      icon: <UploadOutlined />,
      label: translate("upload"),
      onClick: () => navigate("/upload"),
    },
    {
      key: "/reconciliation",
      icon: <ReconciliationOutlined />,
      label: translate("reconciliation"),
      onClick: () => navigate("/reconciliation"),
    },
    {
      key: "/cumulative-invoice",
      icon: <FileTextOutlined />,
      label: translate("cumulative"),
      onClick: () => navigate("/cumulative-invoice"),
    },
    {
      key: "/report",
      icon: <BarChartOutlined />,
      label: "Report",
      onClick: () => navigate("/report"),
    },
  ];

  const getCurrentKey = () => {
    // Handle report-related paths
    if (location.pathname.startsWith('/report') ||
      location.pathname === '/saved-reports' ||
      location.pathname === '/queued-reports') {
      return '/report';
    }
    return location.pathname;
  };

  return (
    <Layout className="main-layout">
      {/* Conditional Header based on menu layout */}
      {menuLayout === "horizontal" ? (
        /* Top Horizontal Menu Layout */
        <>
          <Header
            className="main-header"
            style={{
              background: isDarkMode ? "#1f1f1f" : "white",
              boxShadow: isDarkMode
                ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                : "0 2px 8px rgba(0, 0, 0, 0.06)",
              borderBottom: isDarkMode
                ? "1px solid #424242"
                : "1px solid #f0f0f0",
            }}
          >
            <div className="cls-header-left">
              <div className="cls-logo-section">
                <Logo />
                {/* <img src="/src/assets/gst-logo.svg" alt="GST Claim" /> */}
              </div>
            </div>

            <div className="cls-header-right" >
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "en",
                      label: (
                        <div className="cls-header-section" >
                          <div className="cls-language">
                            🇺🇸
                          </div>
                          {translate("english")}
                        </div>
                      ),
                      onClick: () => setLanguage("en"),
                    },
                    {
                      key: "hi",
                      label: (
                        <div className="cls-header-section">
                          <div className="cls-language">
                            🇮🇳
                          </div>
                          {translate("hindi")}
                        </div>
                      ),
                      onClick: () => setLanguage("hi"),
                    },
                  ],
                }}
                placement="bottomRight"
              >
                <Button className="cls-header-btns"
                  style={{
                    color: isDarkMode ? "#ffffff" : "#1a1a1a",
                  }}
                >
                  <div className="cls-lang-drops">
                    {language === "en" ? "🇺🇸" : "🇮🇳"}
                  </div>
                  {language === "en"
                    ? translate("english")
                    : translate("hindi")}
                  <span className="cls-dropdwns">▼</span>
                </Button>
              </Dropdown>

              <Button
                type="text"
                className="cls-profile-section"
                style={{
                  color: isDarkMode ? "#a6a6a6" : "#666",
                }}
                onClick={() => setSettingsModalOpen(true)}
              >
                <div
                className="cls-profile"
                  style={{
                    background: isDarkMode
                      ? "linear-gradient(90deg, #666 50%, transparent 50%)"
                      : "linear-gradient(90deg, #333 50%, transparent 50%)",
                    border: isDarkMode ? "2px solid #666" : "2px solid #333",
                  }}
                />
              </Button>

              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" className="cls-user-dropdown">
                  <Button type="text" className="cls-user-dropdown-btn">
                    <Avatar size="small" className="cls-user-avatar">
                      S
                    </Avatar>
                    <div className="cls-user-info">
                      <div
                        className="cls-user-role"
                        style={{ color: isDarkMode ? "#ffffff" : "#1a1a1a" }}
                      >
                        {translate("superadmin")}
                      </div>
                    </div>
                    <span
                      className="cls-dropdown-arrow"
                      style={{ color: isDarkMode ? "#a6a6a6" : "#666" }}
                    >
                      ▼
                    </span>
                  </Button>
                </Dropdown>

            </div>
          </Header>

          {/* Horizontal Navigation Menu Below Header */}
          <div className="cls-horizontal-menu"
            style={{
              background: isDarkMode ? "#262626" : "#4C1D95",
              borderBottom: isDarkMode
                ? "1px solid #424242"
                : "1px solid #FFFFFF",
            }}
          >
            <div className="cls-header">
              {sideMenuItems.map((item) => (
                <div
                  key={item.key}
                  className={`nav-item-horizontal ${getCurrentKey() === item.key ? "active" : ""}`}
                  onClick={item.onClick}
                  style={{
                    backgroundColor:
                      getCurrentKey() === item.key
                        ? isDarkMode
                          ? "rgba(24, 144, 255, 0.2)"
                          : "rgba(24, 144, 255, 0.1)"
                        : "transparent",
                    color:
                      getCurrentKey() === item.key
                        ? "#ffffff"
                        : isDarkMode
                          ? "#ffffff"
                          : "#ffffff  ",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div className="cls-headerIcons">{item.icon}</div>
                  <span className="cls-headerLabel" >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Layout className="cls-layout">
            <Content className="cls-content"
              style={{
                background: isDarkMode ? "#141414" : "#f5f5f5",
              }}
            >
              <div className="fade-in">
                <Outlet />
              </div>
            </Content>

            {/* Footer */}
            <div className="cls-footer-section"
              style={{
                background: isDarkMode ? "#141414" : "#f5f5f5",
                borderTop: isDarkMode ? "1px solid #424242" : "1px solid #e8e8e8",
                color: isDarkMode ? "#a6a6a6" : "#666",
              }}
            >
              {translate("poweredBy")}
            </div>
          </Layout>
        </>
      ) : (
        /* Side Vertical Menu Layout */
        <>
          <Sider
            className="cls-side-menu"
            style={{
              background: isDarkMode ? "#262626" : "#5A4FCF",
            }}
          >
            <div
              className="cls-side-menu-content">
              <div className="menu-navigation">
                {sideMenuItems.map((item) => (
                  <div
                    key={item.key}
                    className={`nav-item-with-label ${getCurrentKey() === item.key ? "active" : ""}`}
                    onClick={item.onClick}
                  >
                    <div className="nav-icon">{item.icon}</div>
                    <span className="nav-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Sider>

          {/* Header spanning full width */}
          <Header
            className="main-header"
            style={{
              background: isDarkMode ? "#1f1f1f" : "white",
              boxShadow: isDarkMode
                ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                : "0 2px 8px rgba(0, 0, 0, 0.06)",
              borderBottom: isDarkMode
                ? "1px solid #424242"
                : "1px solid #f0f0f0",
            }}
          >
            <div className="cls-header-left">
              <div className="cls-logo-section">
                {/* <img src="/src/assets/gst-logo.svg" alt="GST Claim"/> */}
                <Logo />
              </div>

              <div className="cls-breadcrumb"
                style={{
                  color: isDarkMode ? "#a6a6a6" : "#8c8c8c",
                }}
              >
                <span className="cls-home">{translate("home")}</span>
                <span>/</span>
                <span className="cls-pages" style={{ color: isDarkMode ? "#ffffff" : "#1a1a1a" }}>
                  {location.pathname === "/dashboard"
                    ? translate("dashboard")
                    : location.pathname === "/upload"
                      ? translate("upload")
                      : location.pathname === "/reconciliation"
                        ? translate("reconciliation")
                        : location.pathname === "/cumulative-invoice"
                          ? translate("cumulative")
                          : location.pathname.startsWith("/report") ||
                            location.pathname === "/saved-reports" ||
                            location.pathname === "/queued-reports"
                            ? "Report"
                            : translate("dashboard")}
                </span>
              </div>
            </div>

            <div className="cls-header-right" >
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "en",
                      label: (
                        <div className="cls-header-section">
                          <div className="cls-language">
                            🇺🇸
                          </div>
                          {translate("english")}
                        </div>
                      ),
                      onClick: () => setLanguage("en"),
                    },
                    {
                      key: "hi",
                      label: (
                        <div className="cls-header-section">
                          <div className="cls-language" >
                            🇮🇳
                          </div>
                          {translate("hindi")}
                        </div>
                      ),
                      onClick: () => setLanguage("hi"),
                    },
                  ],
                }}
                placement="bottomRight"
              >
                <Button className="cls-header-btns">
                  <div className="cls-langBox">
                    {language === "en" ? "🇺🇸" : "🇮🇳"}
                  </div>
                  {language === "en"
                    ? translate("english")
                    : translate("hindi")}
                  <span className="cls-dropdwns">▼</span>
                </Button>
              </Dropdown>

              <Button
                type="text"
                style={{
                  color: isDarkMode ? "#a6a6a6" : "#666",
                }}
                className="cls-profile-section"
                onClick={() => setSettingsModalOpen(true)}
              >
                <div className="cls-contrast" />
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
                  type="text" className="cls-user-dropdown-btn" >
                  <Avatar size="small" className="cls-user-avatar" >
                    S
                  </Avatar>
                  <div className="cls-user-info">
                    <div
                      className="cls-user-role"
                      style={{
                        color: isDarkMode ? "#ffffff" : "#1a1a1a",
                      }}
                    >
                      {translate("superadmin")}
                    </div>
                  </div>
                  <span
                   className="cls-dropdown-arrow"
                    style={{
                      color: isDarkMode ? "#a6a6a6" : "#666",
                    }}
                  >
                    ▼
                  </span>
                </Button>
              </Dropdown>
            </div>
          </Header>

          <Layout className="cls-overall-main-page">
            <Content className="cls-content"
              style={{
                background: isDarkMode ? "#141414" : "#f5f5f5",
              }}
            >
              <div className="fade-in">
                <Outlet />
              </div>
            </Content>

            {/* Footer */}
            <div className="cls-footer-section"
              style={{
                background: isDarkMode ? "#141414" : "#f5f5f5",
                borderTop: isDarkMode
                  ? "1px solid #424242"
                  : "1px solid #e8e8e8",
                color: isDarkMode ? "#a6a6a6" : "#666",
              }}
            >
              {translate("poweredBy")}
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
