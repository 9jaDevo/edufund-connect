import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Toast from './components/ui/Toast';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const StudentsPage = lazy(() => import('./pages/students/StudentsPage'));
const StudentDetailPage = lazy(() => import('./pages/students/StudentDetailPage'));
const DonorDashboardPage = lazy(() => import('./pages/dashboard/DonorDashboardPage'));
const StudentDashboardPage = lazy(() => import('./pages/dashboard/StudentDashboardPage'));
const NGODashboardPage = lazy(() => import('./pages/dashboard/NGODashboardPage'));
const MADashboardPage = lazy(() => import('./pages/dashboard/MADashboardPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));
const AboutPage = lazy(() => import('./pages/info/AboutPage'));
const ContactPage = lazy(() => import('./pages/info/ContactPage'));
const FAQPage = lazy(() => import('./pages/info/FAQPage'));
const HowItWorksPage = lazy(() => import('./pages/info/HowItWorksPage'));
const SuccessStoriesPage = lazy(() => import('./pages/info/SuccessStoriesPage'));
const MonitoringProcessPage = lazy(() => import('./pages/info/MonitoringProcessPage'));
const TransparencyReportPage = lazy(() => import('./pages/info/TransparencyReportPage'));
const TermsPage = lazy(() => import('./pages/info/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/info/PrivacyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>}>
        <Toast />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="students/:id" element={<StudentDetailPage />} />
            <Route path="donor/dashboard" element={<DonorDashboardPage />} />
            <Route path="student/dashboard" element={<StudentDashboardPage />} />
            <Route path="ngo/dashboard" element={<NGODashboardPage />} />
            <Route path="monitor/dashboard" element={<MADashboardPage />} />
            <Route path="admin" element={<AdminDashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="how-it-works" element={<HowItWorksPage />} />
            <Route path="success-stories" element={<SuccessStoriesPage />} />
            <Route path="monitoring-process" element={<MonitoringProcessPage />} />
            <Route path="transparency-report" element={<TransparencyReportPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;