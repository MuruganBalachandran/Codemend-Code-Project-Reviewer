import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import './App.css';

// Import pages
import Home from './Pages/Home/Home';
import Review from './Pages/Review/Review';
import Projects from './Pages/Projects/Projects';
import ViewProject from './Components/Projects/ViewProject';
import About from './Pages/About/About';
import Profile from './Pages/Profile/Profile';
import Settings from './Pages/Settings/Settings';
import Notifications from './Pages/Notifications/Notifications';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';

// Import contexts
import { AuthProvider } from './contexts/AuthContext';

// Create a layout component that conditionally renders Header and Footer
import { ReactNode } from 'react';

const AppLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  
  return (
    <div className="app">
      {!isAuthPage && <Header />}
      <main className={`main-content ${isAuthPage ? 'auth-page-content' : ''}`}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={
            <AppLayout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Protected Routes */}
                <Route path="/review" element={
                  <ProtectedRoute>
                    <Review />
                  </ProtectedRoute>
                } />
                <Route path="/projects" element={
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
                } />
                <Route path="/projects/:projectId" element={
                  <ProtectedRoute>
                    <ViewProject />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/notifications" element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                } />
              </Routes>
            </AppLayout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;