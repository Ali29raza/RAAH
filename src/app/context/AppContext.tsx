import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface GuidanceSummary {
  identifiedIssue: string;
  relevantLaw: string[];
  legalSteps: string[];
  requiredDocuments: string[];
  urgencyLevel: 'high' | 'medium' | 'low';
  immediateSafeActions?: string[];
  nextStepRecommendation?: string;
}

export interface Lawyer {
  id: string;
  name: string;
  city: string;
  specialization: string;
  experience: string;
  rating: number;
  verified: boolean;
  phone?: string | null;
  email?: string | null;
  chamberAddress?: string | null;
}

export interface UserProfile {
  safetyStatus: string;
  province: string;
  legalConcern: string;
  emergencyStatus: string;
  issueDuration: string;
  legalProceedings: string;
  evidence: string;
  incidentDescription: string;
  preferredOutcome: string;
  consultantPreference: string;
}

export interface LawyerProfile {
  id: string;
  full_name: string;
  bar_council_number: string;
  bar_council_name: string;
  chamber_address: string;
  city: string;
  practice_areas: string;
  years_of_experience: string;
  phone: string;
  cnic: string;
}

interface AppContextType {
  chatHistory: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  setChatHistory: (messages: ChatMessage[]) => void;
  guidanceSummary: GuidanceSummary | null;
  setGuidanceSummary: (summary: GuidanceSummary | null) => void;
  selectedLawyer: Lawyer | null;
  setSelectedLawyer: (lawyer: Lawyer | null) => void;
  consentGiven: boolean;
  setConsentGiven: (consent: boolean) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  interviewCompleted: boolean;
  setInterviewCompleted: (completed: boolean) => void;
  userRole: string;
  setUserRole: (role: string) => void;
  lawyerOnboardingCompleted: boolean;
  setLawyerOnboardingCompleted: (completed: boolean) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  lawyerProfile: LawyerProfile | null;
  setLawyerProfile: (profile: LawyerProfile | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [guidanceSummary, setGuidanceSummary] = useState<GuidanceSummary | null>(null);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [lawyerOnboardingCompleted, setLawyerOnboardingCompleted] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [lawyerProfile, setLawyerProfile] = useState<LawyerProfile | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const res = await fetch('/api/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setIsAuthenticated(true);
            setInterviewCompleted(data.user.interview_completed);
            setUserRole(data.user.role || 'user');
            setLawyerOnboardingCompleted(data.user.lawyer_onboarding_completed || false);
            setUserEmail(data.user.email || '');
            setLawyerProfile(data.user.lawyer_profile || null);
            
            if (data.user.profile_summary) {
              setUserProfile(data.user.profile_summary);
            }
            if (data.user.chat_history) {
              setChatHistory(data.user.chat_history);
            } else if (data.user.email) {
              // Fallback to local
              const stored = localStorage.getItem(`chat_history_${data.user.email}`);
              if (stored) setChatHistory(JSON.parse(stored));
            }
          } else {
            localStorage.removeItem('auth_token');
            setIsAuthenticated(false);
            setUserEmail('');
            setLawyerProfile(null);
            setUserRole('user');
            setLawyerOnboardingCompleted(false);
          }
        } catch (err) {
          console.error('Auth verification failed', err);
          setIsAuthenticated(false);
          setUserEmail('');
          setLawyerProfile(null);
        }
      }
    };
    checkAuth();
  }, []);

  // Local fallback if no backend history exists, handled in checkAuth already
  useEffect(() => {
    if (userEmail && chatHistory.length === 0) {
      const storedChat = localStorage.getItem(`chat_history_${userEmail}`);
      if (storedChat) {
        try {
          setChatHistory(JSON.parse(storedChat));
        } catch (e) {
          console.error("Failed to parse stored chat history");
        }
      }
    }
  }, [userEmail]);

  const syncChatToBackend = (messages: ChatMessage[]) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      fetch('/api/user/chat-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ history: messages })
      }).catch(err => console.error("Failed to sync chat history out of band", err));
    }
  };

  const addMessage = (message: ChatMessage) => {
    setChatHistory((prev) => {
      const newHistory = [...prev, message];
      if (userEmail) {
        localStorage.setItem(`chat_history_${userEmail}`, JSON.stringify(newHistory));
      }
      syncChatToBackend(newHistory);
      return newHistory;
    });
  };

  const setChatHistoryWithStorage = (messages: ChatMessage[]) => {
    setChatHistory(messages);
    if (userEmail) {
      localStorage.setItem(`chat_history_${userEmail}`, JSON.stringify(messages));
    }
    syncChatToBackend(messages);
  };

  const setUserProfileWithStorage = (profile: UserProfile | null) => {
    setUserProfile(profile);
    const token = localStorage.getItem('auth_token');
    if (token && profile) {
      fetch('/api/user/profile-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ summary: profile })
      }).catch(err => console.error("Failed to sync profile summary out of band", err));
    }
  };

  return (
    <AppContext.Provider
      value={{
        chatHistory,
        addMessage,
        setChatHistory: setChatHistoryWithStorage,
        guidanceSummary,
        setGuidanceSummary,
        selectedLawyer,
        setSelectedLawyer,
        consentGiven,
        setConsentGiven,
        userProfile,
        setUserProfile: setUserProfileWithStorage,
        isAuthenticated,
        setIsAuthenticated,
        interviewCompleted,
        setInterviewCompleted,
        userRole,
        setUserRole,
        lawyerOnboardingCompleted,
        setLawyerOnboardingCompleted,
        userEmail,
        setUserEmail,
        lawyerProfile,
        setLawyerProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};