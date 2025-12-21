import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavbar from './components/common/TopNavbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import BlogsPage from './pages/BlogsPage';
import AboutPage from './pages/AboutPage';
import LoginRegister from './components/authentication/LoginRegister';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <TopNavbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginRegister />} />
            {/* TODO: Add more routes */}
            {/* <Route path="/blog/:id" element={<BlogDetailPage />} /> */}
            {/* <Route path="/create" element={<CreateBlogPage />} /> */}
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
