import { Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import CameraCapturePage from '../pages/CameraCapturePage';
import HomePage from '../pages/HomePage';
import LandingPage from '../pages/LandingPage';
import ServicesPage from '../pages/services/ServicesPage';
import BankTransferPage from '../pages/services/bank-transfer/BankTransferPage';
import BankTransferAmountPage from '../pages/services/bank-transfer/BankTransferAmountPage';
import SettingsPage from '../pages/SettingsPage';
import NotificationsPage from '../pages/NotificationsPage';
import TransactionsHistoryPage from '../pages/TransactionsHistoryPage';
import paths from './paths';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.root} element={<LandingPage />} />
      <Route path={paths.auth} element={<AuthPage />} />
      <Route path={paths.cameraCapture} element={<CameraCapturePage />} />
      <Route path={paths.home} element={<HomePage />} />
      <Route path={paths.services} element={<ServicesPage />} />
      <Route path={paths.bankTransfer} element={<BankTransferPage />} />
      <Route path={paths.bankTransferAmount} element={<BankTransferAmountPage />} />
      <Route path={paths.settings} element={<SettingsPage />} />
      <Route path={paths.notifications} element={<NotificationsPage />} />
      <Route path={paths.transactionsHistory} element={<TransactionsHistoryPage />} />
    </Routes>
  );
};

export default AppRoutes;
