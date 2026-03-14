import React, { useState, useEffect } from 'react';
import { Shield, Trash2, Edit2, Check, X, Users, AlertCircle } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';

interface UserData {
  id: number;
  email: string;
  role: string;
  interview_completed: boolean;
  lawyer_onboarding_completed: boolean;
  created_at: string;
  full_name: string | null;
  bar_council_number: string | null;
}

export function AdminUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Edit State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editRole, setEditRole] = useState('user');
  const [editEmail, setEditEmail] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError('Could not load user data. Ensure you have admin privileges.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId: number) => {
    if (!window.confirm("Are you sure you want to permanently delete this user? This action cannot be undone.")) return;
    
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
      
      setUsers(users.filter(u => u.id !== userId));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEditClick = (user: UserData) => {
    setEditingId(user.id);
    setEditRole(user.role);
    setEditEmail(user.email);
  };

  const handleSaveEdit = async (userId: number) => {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ role: editRole, email: editEmail })
      });
      
      if (!res.ok) throw new Error('Failed to update');
      
      setUsers(users.map(u => u.id === userId ? { ...u, role: editRole, email: editEmail } : u));
      setEditingId(null);
    } catch (err) {
      alert('Error saving modifications.');
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-slate-800 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            User Management
          </h1>
          <p className="text-slate-500 mt-2">Manage all registered accounts, roles, and onboarding status.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white px-4 py-2 rounded-[10px] border border-slate-200 shadow-sm flex items-center gap-3">
            <Users className="w-5 h-5 text-slate-400" />
            <span className="text-[15px] font-medium text-slate-700">Total Accounts: {users.length}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-[10px] mb-8 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="bg-white rounded-[16px] shadow-[0px_8px_24px_rgba(15,23,42,0.04)] border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[13px] uppercase tracking-wide text-slate-500 font-semibold">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Account Details</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Onboarding Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Loading user database...
                  </td>
                </tr>
              ) : users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-[14px] text-slate-500">#{user.id}</td>
                  
                  <td className="px-6 py-4">
                    {editingId === user.id ? (
                      <input 
                        type="email" 
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="border border-slate-300 rounded px-2 py-1 text-[14px] w-full"
                      />
                    ) : (
                      <div>
                        <p className="text-[14px] font-medium text-slate-800">{user.email}</p>
                        {user.full_name && (
                          <p className="text-[13px] text-slate-500 mt-1 flex items-center gap-2">
                            {user.full_name} 
                            {user.bar_council_number && <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-medium">Bar: {user.bar_council_number}</span>}
                          </p>
                        )}
                        <p className="text-[12px] text-slate-400 mt-1">Joined {new Date(user.created_at).toLocaleDateString()}</p>
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {editingId === user.id ? (
                        <select 
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          className="border border-slate-300 rounded px-2 py-1 text-[14px]"
                        >
                          <option value="user">User</option>
                          <option value="lawyer">Lawyer</option>
                          <option value="admin">Admin</option>
                        </select>
                    ) : (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium capitalize border ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                        user.role === 'lawyer' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {user.role}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <span className={`inline-flex items-center gap-1.5 text-[13px] ${user.interview_completed ? 'text-green-600' : 'text-slate-400'}`}>
                        {user.interview_completed ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                        Intake
                      </span>
                      <span className={`inline-flex items-center gap-1.5 text-[13px] ${user.lawyer_onboarding_completed ? 'text-green-600' : 'text-slate-400'}`}>
                        {user.lawyer_onboarding_completed ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                        Lawyer KYC
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    {editingId === user.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setEditingId(null)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                          <X className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleSaveEdit(user.id)} className="p-1.5 text-green-600 hover:bg-green-50 rounded">
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEditClick(user)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit Role or Email"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Account"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>

                </tr>
              ))}
              {users.length === 0 && !loading && !error && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No users found in database.
                    </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
