import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { AdminSidebar } from './AdminSidebar';
import { Search, Bell, LogOut, User } from 'lucide-react';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { 
    isAuthenticated, 
    userRole, 
    setIsAuthenticated, 
    setUserProfile, 
    setChatHistory, 
    setGuidanceSummary, 
    setUserEmail, 
    setLawyerProfile, 
    setInterviewCompleted, 
    setUserRole: setGlobalUserRole,
    setLawyerOnboardingCompleted,
    userEmail
  } = useAppContext();
  
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Security Wall
  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, userRole, navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setUserProfile(null);
    setChatHistory([]);
    setGuidanceSummary(null);
    setUserEmail('');
    setLawyerProfile(null);
    setInterviewCompleted(false);
    setGlobalUserRole('user');
    setLawyerOnboardingCompleted(false);
    navigate('/');
  };

  const getInitials = () => {
    if (userEmail) {
      return userEmail[0].toUpperCase();
    }
    return 'A';
  };

  if (!isAuthenticated || userRole !== 'admin') return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <AdminSidebar />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 max-w-md w-full">
            {/* Search Placeholder */}
            <div className="relative w-full">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                  {getInitials()}
                </div>
              </button>
              
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-[10px] shadow-[0px_8px_24px_rgba(15,23,42,0.15)] py-2 z-50" ref={menuRef}>
                  <div className="px-4 py-2 border-b border-slate-100 mb-2">
                    <p className="text-[13px] font-medium text-slate-800 truncate">{userEmail}</p>
                    <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Super Admin</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-[14px] text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
