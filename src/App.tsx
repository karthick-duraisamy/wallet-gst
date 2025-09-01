import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from './store/store';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Reconciliation from './pages/Reconciliation';
import CumulativeInvoice from './pages/CumulativeInvoice';
import Report from './pages/Report'; // Import the Report component
import SavedReports from './pages/SavedReports'; // Import SavedReports component
import QueuedReports from './pages/QueuedReports'; // Import QueuedReports component
import './assets/fonts.scss'
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ConfigProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                  <Route path="login" element={<Login />} />
                  <Route path="forgot-password" element={<ForgotPassword />} />
                  <Route path="reset-password" element={<ResetPassword />} />
                </Route>

                <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/reconciliation" element={<Reconciliation />} />
                  <Route path="/cumulative-invoice" element={<CumulativeInvoice />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/saved-reports" element={<SavedReports />} />
                  <Route path="/queued-reports" element={<QueuedReports />} />
                </Route>
              </Routes>
            </div>
          </Router>
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;