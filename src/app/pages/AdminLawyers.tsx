import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { ShieldCheck, CheckCircle, XCircle, Clock, FileText, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

interface LawyerProfile {
  id: number;
  user_id: number;
  email: string;
  full_name: string;
  bar_council_number: string;
  bar_council_name: string;
  chamber_address: string;
  city: string;
  practice_areas: string;
  years_of_experience: string;
  phone: string;
  cnic: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export function AdminLawyers() {
  const [lawyers, setLawyers] = useState<LawyerProfile[]>([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, categories: {} as Record<string, number> });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [confirmDialog, setConfirmDialog] = useState<{ isOpen: boolean; id: number | null; status: string }>({ isOpen: false, id: null, status: '' });

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');

      const [lawyersRes, statsRes] = await Promise.all([
        fetch('/api/admin/lawyers', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/lawyers/stats', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (!lawyersRes.ok || !statsRes.ok) throw new Error('Failed to fetch lawyer data');

      const lawyersData = await lawyersRes.json();
      const statsData = await statsRes.json();

      setLawyers(lawyersData);
      setStats(statsData);
    } catch (err) {
      setError('Could not load lawyer data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    setConfirmDialog({ isOpen: false, id: null, status: '' });


    try {
      console.log(`Updating lawyer ${id} to status ${newStatus}`);
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/admin/lawyers/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      console.log(`Response status: ${res.status}`);
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to update status:', errorText);
        throw new Error('Failed to update status');
      }

      // Refresh to get accurate stats and lists
      fetchData();
    } catch (err) {
      console.error('Error in handleStatusChange:', err);
      alert('Error updating lawyer status.');
    }
  };

  const filteredLawyers = lawyers.filter(l => filter === 'all' || l.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="inline-flex items-center gap-1 text-[12px] font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200"><CheckCircle className="w-3 h-3" /> Approved</span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1 text-[12px] font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200"><XCircle className="w-3 h-3" /> Rejected</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[12px] font-medium px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200"><Clock className="w-3 h-3" /> Pending</span>;
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-slate-800 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            Lawyer Management
          </h1>
          <p className="text-slate-500 mt-2">Approve registrations, manage availability, and review lawyer profiles.</p>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-[10px] mb-8">
          {error}
        </div>
      )}

      {/* Stats Summary First Line */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-[16px] border border-slate-200 shadow-[0px_8px_24px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-3 text-yellow-600 mb-2">
            <Clock className="w-5 h-5" />
            <h3 className="font-semibold">Pending Approval</h3>
          </div>
          <p className="text-[32px] font-bold text-slate-800">{stats.pending}</p>
        </div>

        <div className="bg-white p-6 rounded-[16px] border border-slate-200 shadow-[0px_8px_24px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-3 text-green-600 mb-2">
            <CheckCircle className="w-5 h-5" />
            <h3 className="font-semibold">Approved Lawyers</h3>
          </div>
          <p className="text-[32px] font-bold text-slate-800">{stats.approved}</p>
        </div>

        <div className="bg-white p-6 rounded-[16px] border border-slate-200 shadow-[0px_8px_24px_rgba(15,23,42,0.04)] flex flex-col justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setFilter(filter === 'all' ? 'pending' : 'all')}>
          <div className="flex items-center justify-center gap-2 text-slate-600 mb-1">
            <Filter className="w-5 h-5" />
            <span className="font-medium text-[14px]">Current Filter</span>
          </div>
          <p className="text-[18px] font-semibold text-primary capitalize">{filter} Lawyers</p>
        </div>
      </div>

      {/* Categories Breakdown */}
      <div className="bg-slate-50 p-6 rounded-[16px] border border-slate-200 mb-8">
        <h3 className="text-[14px] font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4" /> Waitlist & Network Capability by Practice Area
        </h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(stats.categories).length === 0 && (
            <span className="text-[13px] text-slate-500">No categories data yet.</span>
          )}
          {Object.entries(stats.categories).map(([category, count]) => (
            <div key={category} className="bg-white px-4 py-2 rounded-[8px] border border-slate-200 flex items-center gap-3 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
              <span className="text-[13px] font-medium text-slate-700">{category}</span>
              <span className="bg-primary/10 text-primary text-[11px] font-bold px-2 py-0.5 rounded-full">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lawyers List */}
      <div className="bg-white rounded-[16px] shadow-[0px_8px_24px_rgba(15,23,42,0.04)] border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading records...</div>
        ) : filteredLawyers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No lawyers found matching the current filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] text-slate-600">
              <thead className="bg-slate-50 text-[12px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Lawyer</th>
                  <th className="px-6 py-4">Bar Council Info</th>
                  <th className="px-6 py-4 hidden md:table-cell">Contact & Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLawyers.map((lawyer) => (
                  <tr key={lawyer.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{lawyer.full_name}</div>
                      <div className="text-[12px] text-slate-500 mt-0.5">{lawyer.years_of_experience} exp.</div>
                      <div className="text-[11px] text-slate-400 mt-1 font-mono">ID: {lawyer.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{lawyer.bar_council_number}</div>
                      <div className="text-[12px] capitalize mt-0.5">{lawyer.bar_council_name}</div>
                      <div className="text-[12px] mt-1 text-slate-500">CNIC: {lawyer.cnic}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div>{lawyer.city}</div>
                      <div className="text-[12px] text-slate-500 mt-0.5">{lawyer.phone}</div>
                      <div className="text-[12px] text-slate-500">{lawyer.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(lawyer.status)}
                      <div className="text-[11px] text-slate-400 mt-2">
                        Added: {new Date(lawyer.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {lawyer.status === 'pending' && (
                        <div className="flex flex-col gap-2 items-end">
                          <Button size="sm" onClick={() => setConfirmDialog({ isOpen: true, id: lawyer.id, status: 'approved' })} className="bg-green-600 hover:bg-green-700 text-white h-7 px-3 text-[12px] rounded w-24">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setConfirmDialog({ isOpen: true, id: lawyer.id, status: 'rejected' })} className="border-red-200 text-red-600 hover:bg-red-50 h-7 px-3 text-[12px] rounded w-24">
                            Reject
                          </Button>
                        </div>
                      )}
                      {lawyer.status === 'approved' && (
                        <Button size="sm" variant="outline" onClick={() => setConfirmDialog({ isOpen: true, id: lawyer.id, status: 'rejected' })} className="border-slate-200 text-slate-600 hover:bg-slate-100 h-7 px-3 text-[12px] rounded">
                          Revoke Approval
                        </Button>
                      )}
                      {lawyer.status === 'rejected' && (
                        <Button size="sm" variant="outline" onClick={() => setConfirmDialog({ isOpen: true, id: lawyer.id, status: 'approved' })} className="border-green-200 text-green-700 hover:bg-green-50 h-7 px-3 text-[12px] rounded">
                          Restore
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AlertDialog open={confirmDialog.isOpen} onOpenChange={(open) => !open && setConfirmDialog({ isOpen: false, id: null, status: '' })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this lawyer as {confirmDialog.status}? This action can be modified later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => confirmDialog.id && setConfirmDialog(prev => ({ ...prev, isOpen: false })) || confirmDialog.id && handleStatusChange(confirmDialog.id, confirmDialog.status)}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </AdminLayout>
  );
}
