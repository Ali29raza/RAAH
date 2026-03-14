import { useState } from 'react';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle, Star, TrendingUp, ArrowLeft, Bot, FileText, Send, Languages, Book } from 'lucide-react';
import { Link } from 'react-router';
import { useAppContext } from '../context/AppContext';

export function LawyerDashboard() {
  const { lawyerProfile } = useAppContext();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiQuery, setAIQuery] = useState('');
  const [aiMessages, setAIMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [showCaseUpdate, setShowCaseUpdate] = useState(false);
  const [caseUpdate, setCaseUpdate] = useState('');

  const isPending = lawyerProfile?.status === 'pending';

  const handleAIQuery = () => {
    if (!aiQuery.trim()) return;

    // Add user message
    setAIMessages(prev => [...prev, { role: 'user', content: aiQuery }]);

    // Simulate AI response
    setTimeout(() => {
      const mockResponse = `Based on Pakistani law, regarding "${aiQuery.substring(0, 50)}...": Under Section 498-A PPC and the Domestic Violence (Prevention and Protection) Act 2013, victims have the right to immediate protection orders. Key legal provisions include:\n\n1. Protection from domestic violence\n2. Right to file FIR under Section 154 CrPC\n3. Interim custody and maintenance provisions\n\nWould you like me to draft a legal notice template or explain specific procedural steps?`;
      
      setAIMessages(prev => [...prev, { role: 'assistant', content: mockResponse }]);
    }, 1000);

    setAIQuery('');
  };

  const handleCaseUpdate = () => {
    if (!caseUpdate.trim()) return;
    // In production, this would update the case status
    alert('Case update submitted successfully! Client will be notified.');
    setCaseUpdate('');
    setShowCaseUpdate(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button 
              variant="outline" 
              className="border-border text-foreground hover:bg-muted/10 h-10 px-4 text-[14px] font-medium rounded-[10px]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Main App
            </Button>
          </Link>
        </div>

        {isPending ? (
          <div className="bg-white border border-border rounded-[10px] p-12 text-center shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-[28px] font-semibold text-foreground mb-4">
              Verification Pending
            </h1>
            <p className="text-[16px] text-muted-foreground max-w-lg mx-auto mb-8">
              Thank you for onboarding with RAAH. Our administrative team is currently verifying your Bar Council credentials. This process typically takes 24-48 hours.
            </p>
            <div className="bg-accent rounded-[10px] p-6 text-left max-w-md mx-auto">
               <h3 className="font-semibold text-[15px] mb-3">While you wait:</h3>
               <ul className="space-y-2 text-[14px] text-muted-foreground list-disc pl-5">
                  <li>Keep an eye on your email for the approval notification.</li>
                  <li>Ensure your email matches your bar council registration.</li>
                  <li>Incomplete or mismatched information may delay approval.</li>
               </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-[32px] font-semibold text-foreground">
                Lawyer Dashboard
              </h1>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowAIAssistant(!showAIAssistant)}
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/5 h-10 px-4 text-[14px] font-medium rounded-[10px]"
            >
              <Bot className="w-4 h-4 mr-2" />
              AI Legal Assistant
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Status Row */}
            <div className="grid grid-cols-3 gap-4">
              {/* Subscription Status */}
              <div className="bg-white border border-border rounded-[10px] p-4 shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
                <h3 className="text-[13px] font-medium text-muted-foreground mb-2">
                  Subscription Status
                </h3>
                <div className="inline-flex items-center gap-2 bg-accent px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <span className="text-[13px] font-semibold text-secondary">
                    Professional Plan
                  </span>
                </div>
              </div>
              
              {/* Leads This Week */}
              <div className="bg-white border border-border rounded-[10px] p-4 shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
                <h3 className="text-[13px] font-medium text-muted-foreground mb-2">
                  Leads This Week
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[28px] font-bold text-foreground">0</span>
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
              
              {/* Rating */}
              <div className="bg-white border border-border rounded-[10px] p-4 shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
                <h3 className="text-[13px] font-medium text-muted-foreground mb-2">
                  Rating
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[28px] font-bold text-foreground">N/A</span>
                  <Star className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </div>
            
            {/* Empty State for New Leads */}
            <div className="bg-white border border-dashed border-border rounded-[10px] p-12 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-[18px] font-semibold text-foreground mb-2">No New Leads Yet</h3>
              <p className="text-[14px] text-muted-foreground max-w-md mx-auto">
                Your profile is active. We will notify you when a new AI-qualified lead that matches your practice areas is assigned to you.
              </p>
            </div>
            
            {/* Previous Leads Section */}
            <div>
              <h2 className="text-[20px] font-semibold text-foreground mb-4">
                Active Cases
              </h2>
              
              <div className="space-y-3">
                <div className="bg-white border border-border rounded-[10px] p-6 shadow-[0px_8px_24px_rgba(15,23,42,0.08)] flex justify-center items-center text-center">
                  <p className="text-[14px] text-muted-foreground">You currently have no active cases.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - AI Assistant */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border rounded-[10px] p-5 shadow-[0px_8px_24px_rgba(15,23,42,0.08)] sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-[16px] font-semibold text-foreground">
                  Professional AI Assistant
                </h3>
              </div>

              <p className="text-[12px] text-muted-foreground mb-4">
                Get instant legal references, draft documents, and translate to Urdu
              </p>

              {/* Quick Actions */}
              <div className="space-y-2 mb-4">
                <button 
                  className="w-full text-left p-3 border border-border rounded-[8px] hover:border-secondary hover:bg-secondary/5 transition-colors group"
                  onClick={() => {
                    setShowAIAssistant(true);
                    setAIQuery('Explain Section 498-A PPC in simple terms');
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Book className="w-4 h-4 text-muted-foreground group-hover:text-secondary" />
                    <span className="text-[13px] font-medium text-foreground">Legal Reference Lookup</span>
                  </div>
                </button>

                <button 
                  className="w-full text-left p-3 border border-border rounded-[8px] hover:border-secondary hover:bg-secondary/5 transition-colors group"
                  onClick={() => {
                    setShowAIAssistant(true);
                    setAIQuery('Draft a legal notice for domestic violence case');
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground group-hover:text-secondary" />
                    <span className="text-[13px] font-medium text-foreground">Draft Legal Document</span>
                  </div>
                </button>

                <button 
                  className="w-full text-left p-3 border border-border rounded-[8px] hover:border-secondary hover:bg-secondary/5 transition-colors group"
                  onClick={() => {
                    setShowAIAssistant(true);
                    setAIQuery('Translate this legal explanation to Urdu');
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-muted-foreground group-hover:text-secondary" />
                    <span className="text-[13px] font-medium text-foreground">Urdu Translation</span>
                  </div>
                </button>
              </div>

              {/* AI Chat Interface - Compact */}
              {showAIAssistant && (
                <div className="border-t border-border pt-4 mt-4">
                  <div className="space-y-3 max-h-[400px] overflow-y-auto mb-3">
                    {aiMessages.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`p-3 rounded-[8px] text-[12px] ${
                          msg.role === 'user' 
                            ? 'bg-primary/10 text-foreground ml-4' 
                            : 'bg-accent text-foreground mr-4'
                        }`}
                      >
                        {msg.content}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask about Pakistani law..."
                      value={aiQuery}
                      onChange={(e) => setAIQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAIQuery()}
                      className="h-10 rounded-[8px] text-[13px]"
                    />
                    <Button 
                      onClick={handleAIQuery}
                      className="bg-secondary text-white hover:bg-secondary/90 h-10 px-4 rounded-[8px]"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-[11px] text-muted-foreground">
                  <strong>Usage:</strong> Unlimited queries on Professional plan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Case Update Modal */}
        {showCaseUpdate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-[10px] p-6 max-w-[500px] w-full shadow-[0px_16px_48px_rgba(15,23,42,0.24)]">
              <h3 className="text-[20px] font-semibold text-foreground mb-4">
                Submit Case Update
              </h3>
              <p className="text-[13px] text-muted-foreground mb-4">
                This update will be sent to the client and tracked in the system
              </p>
              <Textarea
                placeholder="Enter case update details (e.g., 'Consultation completed. Legal notice drafted and ready for review.')"
                value={caseUpdate}
                onChange={(e) => setCaseUpdate(e.target.value)}
                className="min-h-[120px] rounded-[10px] mb-4"
              />
              <div className="flex gap-3">
                <Button
                  onClick={handleCaseUpdate}
                  className="bg-primary text-white hover:bg-primary/90 h-11 px-6 rounded-[10px] flex-1"
                >
                  Submit Update
                </Button>
                <Button
                  onClick={() => setShowCaseUpdate(false)}
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted/10 h-11 px-6 rounded-[10px]"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
}
