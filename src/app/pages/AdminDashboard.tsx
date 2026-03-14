import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { LayoutDashboard, Users, MessageSquare, Briefcase, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    interviewsCompleted: 0,
    activeAiChats: 0,
    pendingLawyers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await fetch('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError('Could not load statistics.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-slate-800 flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-primary" />
          Overview
        </h1>
        <p className="text-slate-500 mt-2">Welcome to the Platform Administration dashboard.</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-[10px] mb-8 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', value: loading ? '...' : stats.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Interviews Completed', value: loading ? '...' : stats.interviewsCompleted, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Active Ai Chats', value: loading ? '...' : stats.activeAiChats, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Pending Lawyers', value: loading ? '...' : stats.pendingLawyers, icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[16px] border border-slate-200 shadow-sm flex items-start justify-between">
            <div>
              <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</p>
              <h3 className="text-[28px] font-bold text-slate-800 mt-2">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-8 rounded-[16px] border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center min-h-[300px]">
        <FileText className="w-16 h-16 text-slate-200 mb-4" />
        <h3 className="text-[18px] font-semibold text-slate-700">Analytics Workspace</h3>
        <p className="text-[15px] text-slate-500 mt-2 max-w-md">Detailed charts and system analytics will populate here once enough data is collected.</p>
      </div>
    </AdminLayout>
  );
}
