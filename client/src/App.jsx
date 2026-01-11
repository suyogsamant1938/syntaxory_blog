import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ConfirmProvider } from './contexts/ConfirmContext';
import ToastContainer from './components/common/ToastContainer';
import TopNavbar from './components/common/TopNavbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import BlogsPage from './pages/BlogsPage';
import AboutPage from './pages/AboutPage';
import LoginRegister from './components/authentication/LoginRegister';
import BlogDetailPage from './pages/BlogDetailPage';
import CreateBlogPage from './pages/CreateBlogPage';
import EditBlogPage from './pages/EditBlogPage';
import ProfilePage from './pages/ProfilePage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogManagement from './pages/admin/BlogManagement';
import UserManagement from './pages/admin/UserManagement';
import AdminSetup from './pages/admin/AdminSetup';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ConfirmProvider>
          <Router>
            <ToastContainer />
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <div className="app">
                <TopNavbar />
                <main className="main-content">
                  <HomePage />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/blogs" element={
              <div className="app">
                <TopNavbar />
                <main className="main-content">
                  <BlogsPage />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/about" element={
              <div className="app">
                <TopNavbar />
                <main className="main-content">
                  <AboutPage />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/login" element={
              <div className="app">
                <LoginRegister />
              </div>
            } />
            
            <Route path="/setup-admin" element={
              <div className="app">
                <TopNavbar />
                <main className="main-content">
                  <AdminSetup />
                </main>
                <Footer />
              </div>
            } />

            <Route path="/success" element={
              <div className="app">
                <TopNavbar />
                <main className="main-content">
                  <SuccessPage />
                </main>
                <Footer />
              </div>
            } />

            <Route path="/cancel" element={
              <div className="app">
                <TopNavbar />
                <main className="main-content">
                  <CancelPage />
                </main>
                <Footer />
              </div>
            } />

            {/* Admin Routes - Protected */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="blogs" element={<BlogManagement />} />
              <Route path="users" element={<UserManagement />} />
            </Route>

            {/* TODO: Add more routes */}
            <Route path="/blog/:id" element={
              <div className="app">
                <TopNavbar />
                <main className="main-content">
                  <BlogDetailPage />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/create" element={
              <ProtectedRoute requirePaid={true}>
                <div className="app">
                  <TopNavbar />
                  <main className="main-content">
                    <CreateBlogPage />
                  </main>
                  <Footer />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/edit/:id" element={
              <ProtectedRoute>
                <div className="app">
                  <TopNavbar />
                  <main className="main-content">
                    <EditBlogPage />
                  </main>
                  <Footer />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <div className="app">
                  <TopNavbar />
                  <main className="main-content">
                    <ProfilePage />
                  </main>
                  <Footer />
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
        </ConfirmProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
