import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAppContext } from '../context/AppContext';
import { MessageCircle, Send, Shield, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export function AIChat() {
  const navigate = useNavigate();
  const { 
    chatSessions, activeSessionId, addMessage, createNewSession, switchSession, 
    guidanceSummary, setGuidanceSummary, isAuthenticated, userProfile 
  } = useAppContext();
  
  const currentChat = chatSessions.find(s => s.id === activeSessionId)?.messages || [];
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  // Redirect to signup if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup');
    }
  }, [isAuthenticated, navigate]);

  // Generate summary on load if not present
  useEffect(() => {
    if (isAuthenticated && !guidanceSummary && userProfile) {
      generateSummary(userProfile);
    }
  }, [isAuthenticated, guidanceSummary, userProfile]);

  // Initial greeting prompt if chat history is totally blank for the current active session
  useEffect(() => {
    if (isAuthenticated && activeSessionId && currentChat.length === 0 && !isTyping) {
      addMessage({
        id: 'initial_greeting',
        role: 'assistant',
        content: "Hello. I am RAAH's Legal AI Assistant. I am here to help you understand your legal options safely and securely. How can I assist you today?"
      });
    }
  }, [isAuthenticated, activeSessionId, currentChat.length]);

  const generateSummary = (profile: any) => {
    setIsGeneratingSummary(true);

    // Fallback delays for UI UX (optional, can be very short or removed)
    setTimeout(() => {
      let identifiedIssue = 'General Legal Query';
      let urgencyLevel: 'high' | 'medium' | 'low' = 'medium';
      let immediateSafeActions = ['Keep all relevant documents safe', 'Do not confront the opposing party directly'];
      let relevantLaw = ['General Civil Procedure Code'];
      let legalSteps = ['Consult a lawyer to review documents', 'Draft a legal notice if required'];
      let requiredDocuments = ['CNIC copy', 'Any contracts or evidence'];

      // Parse Issue
      if (profile.legalConcern === 'marriage') identifiedIssue = 'Marriage, Divorce, or Khula';
      else if (profile.legalConcern === 'domestic') identifiedIssue = 'Domestic Violence or Safety';
      else if (profile.legalConcern === 'inheritance') identifiedIssue = 'Inheritance or Property Rights';
      else if (profile.legalConcern === 'harassment') identifiedIssue = 'Workplace or Public Harassment';

      // Parse Urgency
      if (profile.emergencyStatus === 'immediate') urgencyLevel = 'high';
      else if (profile.emergencyStatus === 'urgent') urgencyLevel = 'medium';
      else urgencyLevel = 'low';

      // Parse Safe Actions specifically based on concern
      if (profile.legalConcern === 'domestic' && urgencyLevel === 'high') {
        immediateSafeActions = [
          'Contact a trusted family member or friend',
          'Keep your phone and ID documents ready',
          'Move to a safe space immediately if possible'
        ];
      } else if (profile.legalConcern === 'harassment') {
        immediateSafeActions = [
          'Document times, dates, and locations of incidents',
          'Avoid being alone with the perpetrator',
          'Inform HR or a trusted authority figure'
        ];
      }

      // Relevant laws based on concern
      if (profile.legalConcern === 'domestic') {
        relevantLaw = ['Domestic Violence (Prevention and Protection) Act', 'PPC Section 337 (Hurt), 506 (Criminal Intimidation)'];
      } else if (profile.legalConcern === 'marriage') {
        relevantLaw = ['Muslim Family Laws Ordinance 1961', 'Family Courts Act 1964'];
      } else if (profile.legalConcern === 'harassment') {
        relevantLaw = ['Protection Against Harassment of Women at Workplace Act 2010', 'PPC Section 509'];
      } else if (profile.legalConcern === 'inheritance') {
        relevantLaw = ['Muslim Personal Law (Shariat) Application Act, 1962', 'Succession Act, 1925'];
      }

      setGuidanceSummary({
        identifiedIssue,
        urgencyLevel,
        immediateSafeActions,
        relevantLaw,
        legalSteps,
        requiredDocuments,
        nextStepRecommendation: 'Speak to a verified lawyer'
      });
      setIsGeneratingSummary(false);
    }, 800); // 800ms delay to still show the nice transition loading state
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = inputMessage;
    // Add user message
    addMessage({
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
    });

    setInputMessage('');
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key is not configured');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const systemPrompt = `You are a compassionate, expert Legal Guide for RAAH — a platform that helps women in Pakistan understand their legal rights and options. Your specialty is domestic violence, khula, divorce, harassment, inheritance, and family law.

TONE & STYLE:
- Warm, human, and professional. Use contractions (don't, it's, you're). Vary sentence lengths.
- Never sound robotic or clinical. Sound like a trusted friend who also happens to be a lawyer.

STRICT CONVERSATION RULES — follow these without exception:
1. The "One-Inquiry" Rule: Never provide more than ONE piece of legal information OR ask more than ONE question per response. If you find yourself writing more, stop and cut it down.
2. Micro-Dose Information: Keep responses to a maximum of 3 SHORT paragraphs. No walls of text. No bullet-point dumps.
3. Empathetic Validation First: Always acknowledge the user's emotional state BEFORE giving any legal information. Use phrases like "I hear you," "That sounds incredibly difficult," "It's brave of you to reach out."
4. End With a Next Step: Every single response must end with either a simple guiding question OR a clear "next step" — never leave the user without direction.
5. No Legalese: If you must use a legal term, immediately define it in plain everyday language in the same sentence.
6. Never ask for info you already have: Check the intake profile below first.

EXAMPLE OF HOW TO RESPOND:
User: "I want to leave my husband but I'm scared about my kids and home."
Good response: "I'm so sorry you're going through this — it takes real courage to even say those words. The good news is the law does have protections for both your home and your children. We can figure this out together, one step at a time. To start — is your biggest worry right now about staying safe in the house, or about the kids?"

${userProfile ? `INTAKE PROFILE (already collected — do NOT ask for this information again):
- Primary Concern: ${userProfile.legalConcern || 'Not specified'}
- Incident Description: ${userProfile.incidentDescription || 'Not specified'}
- Emergency Level: ${userProfile.emergencyStatus || 'Not specified'}
- Safety Status: ${userProfile.safetyStatus || 'Not specified'}
- Issue Duration: ${userProfile.issueDuration || 'Not specified'}
- Legal Action Taken: ${userProfile.legalProceedings || 'Not specified'}
- Evidence Available: ${userProfile.evidence || 'Not specified'}
- Preferred Outcome: ${userProfile.preferredOutcome || 'Not specified'}
- Province: ${userProfile.province || 'Not specified'}
- Consultant Preference: ${userProfile.consultantPreference || 'Not specified'}
Use this profile to tailor every response. Never ask the user to repeat anything already captured above.` : 'No intake profile available. Gently gather context through conversation, one question at a time.'}`;

      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: systemPrompt
      });

      // Convert chat history for Gemini, ensuring we omit the local greeting
      // Gemini requires the history array to start with a 'user' message and STRICTLY ALTERNATE
      const rawHistory = currentChat.filter(msg => msg.id !== 'initial_greeting');
      const formattedHistory: { role: string, parts: { text: string }[] }[] = [];

      let lastRole = '';
      for (const msg of rawHistory) {
        const currentRole = msg.role === 'user' ? 'user' : 'model';
        
        // Skip leading model messages if we don't have a user message yet
        if (formattedHistory.length === 0 && currentRole === 'model') {
           // We'll inject a dummy user request if the history somehow starts with a model message
           formattedHistory.push({ role: 'user', parts: [{ text: 'Hello' }] });
           lastRole = 'user';
        }

        if (currentRole === lastRole && formattedHistory.length > 0) {
          // If the role is the same as the last one, concatenate the text to avoid throwing an error
          const lastIndex = formattedHistory.length - 1;
          formattedHistory[lastIndex].parts[0].text += `\n\n[Message continued]\n${msg.content}`;
        } else {
          // Normal alternating role
          formattedHistory.push({
            role: currentRole,
            parts: [{ text: msg.content }]
          });
        }
        lastRole = currentRole;
      }


      const chat = model.startChat({
        history: formattedHistory,
      });

      const result = await chat.sendMessage(userMessage);
      const responseText = result.response.text();

      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
      });
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I am currently experiencing technical difficulties connecting to my knowledge base.',
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSeeLegalSteps = () => {
    navigate('/guidance-summary');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid grid-cols-[280px_1fr] gap-6 h-[calc(100vh-180px)]">
          {/* Sidebar */}
          <div className="bg-[#F8FAFC] rounded-[10px] p-6 h-full flex flex-col">
            <Button 
              onClick={createNewSession}
              className="bg-primary text-white hover:bg-primary/90 w-full mb-6 rounded-[10px]"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              New Chat
            </Button>

            <div className="flex-1 overflow-y-auto pr-2">
              <h3 className="text-[13px] font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Chat History
              </h3>
              
              {chatSessions.length === 0 ? (
                <div className="bg-white/50 border border-border rounded-lg p-3">
                  <p className="text-[12px] text-slate-600 leading-relaxed">
                    Your previous conversations will automatically appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {chatSessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => switchSession(session.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-[13px] truncate transition-colors ${
                        session.id === activeSessionId
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {session.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-border mt-4">
              <button className="text-[13px] text-secondary hover:underline">
                Help & Safety
              </button>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex flex-col h-full border border-border rounded-[10px]">
            {/* Chat Header */}
            <div className="border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-[20px] font-semibold text-foreground">
                AI Legal Assistant
              </h2>
              <div className="inline-flex items-center gap-2 bg-accent px-3 py-1.5 rounded-full">
                <Shield className="w-3 h-3 text-secondary" />
                <span className="text-[13px] font-medium text-secondary">
                  Confidential Mode ON
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Display chat history */}
              {currentChat.length === 0 && !isTyping ? (
                 <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                    Send a message to start the legal consultation.
                 </div>
              ) : (
                currentChat.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-[10px] px-4 py-3 max-w-[70%] ${message.role === 'user'
                        ? 'bg-[#F1F5F9] text-foreground'
                        : 'bg-accent text-foreground'
                        }`}
                    >
                      <p className="text-[15px]">{message.content}</p>
                    </div>
                  </div>
                ))
              )}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-accent text-foreground rounded-[10px] px-4 py-3 max-w-[70%] flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                    <p className="text-[15px] text-muted-foreground">AI is thinking...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 rounded-[10px]"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isTyping}
                  className="bg-primary text-white hover:bg-primary/90 rounded-[10px]"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}