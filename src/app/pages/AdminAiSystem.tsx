import React from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Bot } from 'lucide-react';

export function AdminAiSystem() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-slate-800 flex items-center gap-3">
          <Bot className="w-8 h-8 text-primary" />
          AI & RAG System
        </h1>
        <p className="text-slate-500 mt-2">Monitor legal chatbot activity, knowledge base, and safety flags.</p>
      </div>
      <div className="bg-white p-8 rounded-[16px] border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center min-h-[400px]">
        <h3 className="text-[18px] font-semibold text-slate-700">AI Controls Coming Soon</h3>
      </div>
    </AdminLayout>
  );
}
