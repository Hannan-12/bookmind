// src/App.js
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import routes from './routes';
import './styles/global.css';

// Loading component for suspense fallback
const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => {
        const RouteComponent = route.component;
        
        // Return a protected or regular route based on the route config
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoute>
                  <RouteComponent />
                </ProtectedRoute>
              ) : (
                <RouteComponent />
              )
            }
          />
        );
      })}
      
      {/* Default redirect for unmatched routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Suspense fallback={<Loading />}>
            <AppRoutes />
          </Suspense>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;