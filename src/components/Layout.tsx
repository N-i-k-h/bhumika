import React, { useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    localStorage.setItem('isAdmin', 'true');
    navigate('/admin');
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header 
        onMenuToggle={handleMenuToggle}
        onLoginSuccess={handleLoginSuccess}
      />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={handleSidebarClose}
      />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
