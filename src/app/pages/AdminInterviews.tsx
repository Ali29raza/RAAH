import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { FileText, Plus, Edit2, Trash2, Check, X, MoveUp, MoveDown, Save } from 'lucide-react';
import { Button } from '../components/ui/button';

interface QuestionOption {
  label: string;
  value: string;
}

interface InterviewQuestion {
  id: number;
  question_text: string;
  subtitle: string;
  options: QuestionOption[];
  order_index: number;
  is_active: boolean;
}

export function AdminInterviews() {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState<number | 'new' | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<InterviewQuestion>>({
    question_text: '',
    subtitle: '',
    options: [{ label: '', value: '' }],
    order_index: 0,
    is_active: true
  });

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/admin/questions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch questions');
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      setError('Could not load interview questions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAddNew = () => {
    setFormData({
      question_text: '',
      subtitle: '',
      options: [{ label: '', value: '' }, { label: '', value: '' }],
      order_index: questions.length + 1,
      is_active: true
    });
    setIsEditing('new');
  };

  const handleEdit = (q: InterviewQuestion) => {
    setFormData({ ...q });
    setIsEditing(q.id);
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleOptionChange = (idx: number, field: 'label' | 'value', val: string) => {
    const newOptions = [...(formData.options || [])];
    newOptions[idx] = { ...newOptions[idx], [field]: val };
    
    // Auto-generate value from label if value is empty and we are typing label
    if (field === 'label' && !newOptions[idx].value) {
        newOptions[idx].value = val.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    }
    
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...(formData.options || []), { label: '', value: '' }] });
  };

  const removeOption = (idx: number) => {
    const newOptions = [...(formData.options || [])];
    newOptions.splice(idx, 1);
    setFormData({ ...formData, options: newOptions });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const url = isEditing === 'new' ? '/api/admin/questions' : `/api/admin/questions/${isEditing}`;
      const method = isEditing === 'new' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to save question');
      
      await fetchQuestions();
      setIsEditing(null);
    } catch (err) {
      alert('Error saving question.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this question? This may break historical interview data references.")) return;
    
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/admin/questions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error('Failed to delete');
      
      setQuestions(questions.filter(q => q.id !== id));
    } catch (err) {
      alert('Error deleting question.');
    }
  };

  const handleToggleActive = async (q: InterviewQuestion) => {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/admin/questions/${q.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ ...q, is_active: !q.is_active })
      });
      
      if (!res.ok) throw new Error('Failed to toggle active status');
      
      setQuestions(questions.map(item => item.id === q.id ? { ...item, is_active: !q.is_active } : item));
    } catch (err) {
      alert('Error updating status.');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === questions.length - 1) return;

    const newQuestions = [...questions];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap order_index
    const tempOrder = newQuestions[index].order_index;
    newQuestions[index].order_index = newQuestions[targetIndex].order_index;
    newQuestions[targetIndex].order_index = tempOrder;
    
    // Swap array position for optimistic UI
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[targetIndex];
    newQuestions[targetIndex] = temp;
    
    setQuestions(newQuestions);

    // Save both to DB
    const token = localStorage.getItem('auth_token');
    try {
        await fetch(`/api/admin/questions/${newQuestions[index].id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(newQuestions[index])
        });
        await fetch(`/api/admin/questions/${newQuestions[targetIndex].id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(newQuestions[targetIndex])
        });
    } catch (e) {
        alert("Failed to save new order to database.");
        fetchQuestions(); // Revert
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-slate-800 flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            Interview Configuration
          </h1>
          <p className="text-slate-500 mt-2">Manage the mandatory legal assessment questions and their options.</p>
        </div>
        <Button onClick={handleAddNew} className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Question
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-[10px] mb-8">
          {error}
        </div>
      )}

      {isEditing && (
        <div className="bg-white p-6 rounded-[16px] border border-slate-200 shadow-[0px_8px_24px_rgba(15,23,42,0.04)] mb-8">
          <h3 className="text-[18px] font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-4">
            {isEditing === 'new' ? 'Create New Question' : 'Edit Question'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-slate-700 mb-1">Question Text</label>
              <input 
                type="text" 
                value={formData.question_text || ''} 
                onChange={e => setFormData({...formData, question_text: e.target.value})}
                className="w-full border border-slate-300 rounded-[8px] px-3 py-2 text-[14px]"
                placeholder="e.g., Are you currently in a safe location?"
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-medium text-slate-700 mb-1">Subtitle (Optional)</label>
              <input 
                type="text" 
                value={formData.subtitle || ''} 
                onChange={e => setFormData({...formData, subtitle: e.target.value})}
                className="w-full border border-slate-300 rounded-[8px] px-3 py-2 text-[14px]"
                placeholder="e.g., Your safety is our top priority."
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-slate-700 mb-2">Options (Choices)</label>
              <div className="space-y-3">
                {formData.options?.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input 
                      type="text" 
                      value={opt.label} 
                      onChange={e => handleOptionChange(idx, 'label', e.target.value)}
                      className="flex-1 border border-slate-300 rounded-[8px] px-3 py-2 text-[14px]"
                      placeholder="Display Label (e.g., Yes, I am safe)"
                    />
                    <input 
                      type="text" 
                      value={opt.value} 
                      onChange={e => handleOptionChange(idx, 'value', e.target.value)}
                      className="w-1/3 border border-slate-300 rounded-[8px] px-3 py-2 text-[14px] bg-slate-50"
                      placeholder="Internal Value (e.g., safe)"
                    />
                    <button onClick={() => removeOption(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button onClick={addOption} className="text-[13px] text-primary font-medium flex items-center gap-1 hover:underline mt-2">
                  <Plus className="w-3 h-3" /> Add Option
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Question
              </Button>
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[16px] shadow-[0px_8px_24px_rgba(15,23,42,0.04)] border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading questions...</div>
        ) : questions.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No questions configured. Add one to get started.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {questions.map((q, index) => (
              <div key={q.id} className={`p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors ${!q.is_active ? 'opacity-60 grayscale' : ''}`}>
                <div className="flex flex-col gap-1 items-center mt-1">
                  <button onClick={() => handleMove(index, 'up')} disabled={index === 0} className="p-1 text-slate-400 hover:text-primary disabled:opacity-30">
                    <MoveUp className="w-4 h-4" />
                  </button>
                  <span className="text-[12px] font-bold text-slate-400">{q.order_index}</span>
                  <button onClick={() => handleMove(index, 'down')} disabled={index === questions.length - 1} className="p-1 text-slate-400 hover:text-primary disabled:opacity-30">
                    <MoveDown className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[16px] font-semibold text-slate-800">{q.question_text}</h3>
                      {q.subtitle && <p className="text-[13px] text-slate-500 mt-1">{q.subtitle}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                         onClick={() => handleToggleActive(q)}
                         className={`px-3 py-1 text-[12px] font-medium rounded-full border ${q.is_active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}
                      >
                        {q.is_active ? 'Active' : 'Draft'}
                      </button>
                      <button onClick={() => handleEdit(q)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(q.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {q.options.map((opt, i) => (
                      <span key={i} className="inline-flex items-center bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-[6px] text-[12px]">
                        {opt.label} <span className="text-slate-400 ml-2 font-mono text-[10px]">{opt.value}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
