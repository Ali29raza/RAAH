import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Progress } from '../components/ui/progress';
import { Textarea } from '../components/ui/textarea';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, ChevronLeft, Shield, AlertCircle } from 'lucide-react';

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
}

export function Interview() {
  const navigate = useNavigate();
  const { setUserProfile, isAuthenticated, setInterviewCompleted } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dynamic form tracking based on question ID
  const [formData, setFormData] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/questions');
        if (!res.ok) throw new Error('Failed to fetch questions');
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error("Error loading interview questions from database", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  if (loading) {
     return <div className="min-h-screen bg-white flex items-center justify-center">Loading interview...</div>;
  }

  if (questions.length === 0) {
      return (
          <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
              <Header />
              <div className="flex-1 flex flex-col items-center justify-center">
                <AlertCircle className="w-12 h-12 text-slate-300 mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Interview Available</h2>
                <p className="text-slate-500 text-center max-w-md">The admin has not configured the interview gate yet. Please check back later.</p>
              </div>
          </div>
      );
  }

  const TOTAL_QUESTIONS = questions.length;
  const progress = (currentStep / TOTAL_QUESTIONS) * 100;
  const currentQuestion = questions[currentStep - 1];

  const handleNext = async () => {
    if (currentStep < TOTAL_QUESTIONS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Map form data strictly to UserProfile expectations based on question order
      const profile = {
        safetyStatus: formData[questions[0]?.id] || '',
        province: formData[questions[1]?.id] || '',
        legalConcern: formData[questions[2]?.id] || '',
        emergencyStatus: formData[questions[3]?.id] || '',
        issueDuration: formData[questions[4]?.id] || '',
        legalProceedings: formData[questions[5]?.id] || '',
        evidence: formData[questions[6]?.id] || '',
        incidentDescription: formData[questions[7]?.id] || '',
        preferredOutcome: formData[questions[8]?.id] || '',
        consultantPreference: formData[questions[9]?.id] || ''
      };
      
      setUserProfile(profile);

      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          await fetch('/api/user/complete-interview', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setInterviewCompleted(true);
        }
      } catch (error) {
        console.error('Failed to mark interview as completed:', error);
      }

      navigate('/chat');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentQuestionData = () => {
    return formData[currentQuestion.id] || '';
  };

  const isCurrentStepValid = () => {
    const currentValue = getCurrentQuestionData();
    return currentValue !== '';
  };

  // Determine if it's a textarea vs radio
  const isTextArea = currentQuestion.options.length === 1 && currentQuestion.options[0].value === 'textarea';

  // Check if we need to show the exit banner (if one of the options had 'exit' value and user picked it)
  const showQuickExit = formData[currentQuestion.id] === 'exit' || 
                       (currentStep === 1 && Object.values(formData).includes('exit'));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-[800px] mx-auto px-6 py-12">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-[14px] font-semibold text-secondary">Legal Assessment</h2>
              <p className="text-[13px] text-muted-foreground">
                Question {currentStep} of {TOTAL_QUESTIONS}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[24px] font-bold text-primary">{Math.round(progress)}%</p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Privacy Notice - Show on first question */}
        {currentStep === 1 && (
          <div className="bg-accent border border-secondary/20 rounded-[10px] p-4 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-[14px] font-semibold text-foreground mb-1">
                  Your Privacy is Protected
                </h3>
                <p className="text-[13px] text-muted-foreground">
                  All responses are confidential and encrypted. This information helps us provide personalized legal guidance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Question Card */}
        <div className="bg-white border border-border rounded-[10px] p-8 shadow-[0px_8px_24px_rgba(15,23,42,0.08)] mb-6">
          <div className="space-y-6">
            <div className="flex items-start gap-3 mb-4">
               {currentQuestion.options.some(opt => opt.value === 'exit') && (
                  <AlertCircle className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
               )}
               <div>
                  <h3 className="text-[22px] font-semibold text-foreground mb-2">
                    {currentQuestion.question_text}
                  </h3>
                  {currentQuestion.subtitle && (
                    <p className="text-[14px] text-muted-foreground">
                      {currentQuestion.subtitle}
                    </p>
                  )}
               </div>
            </div>

            {isTextArea ? (
               <div>
                <Textarea
                  value={formData[currentQuestion.id] || ''}
                  onChange={(e) => setFormData({ ...formData, [currentQuestion.id]: e.target.value })}
                  placeholder="Type your answer here..."
                  className="min-h-[120px] rounded-[10px] text-[15px] resize-none"
                />
               </div>
            ) : (
              <RadioGroup
                value={formData[currentQuestion.id] || ''}
                onValueChange={(value) => setFormData({ ...formData, [currentQuestion.id]: value })}
                className="space-y-3"
              >
                {currentQuestion.options.map((opt, idx) => {
                   const isDangerOption = opt.value === 'immediate' || opt.value === 'exit';
                   
                   return (
                    <div key={idx} className={`flex items-center space-x-3 border rounded-[10px] p-4 cursor-pointer transition-colors
                        ${isDangerOption ? 'border-red-200 bg-red-50 hover:border-red-400' : 'border-border hover:border-secondary'}
                    `}>
                      <RadioGroupItem value={opt.value} id={`opt-${idx}`} />
                      <Label htmlFor={`opt-${idx}`} className={`cursor-pointer flex-1 text-[15px] ${isDangerOption ? 'text-red-700' : ''}`}>
                        {opt.label}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            )}
            
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handleBack}
            variant="outline"
            disabled={currentStep === 1}
            className="border-border text-foreground hover:bg-accent disabled:opacity-50 h-12 px-6 rounded-[10px]"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isCurrentStepValid()}
            className="bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed h-12 px-6 rounded-[10px]"
          >
            {currentStep === TOTAL_QUESTIONS ? 'Complete Assessment' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>

        {/* Emergency Help Banner */}
        {showQuickExit && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-[10px] p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-[14px] font-semibold text-red-900 mb-1">
                  Quick Exit Available
                </h4>
                <p className="text-[13px] text-red-700 mb-3">
                  Press ESC key anytime to quickly close this window. For immediate help:
                </p>
                <div className="space-y-1 text-[13px] text-red-700">
                  <p>• <strong>Mera Haq Helpline:</strong> 1099 (24/7)</p>
                  <p>• <strong>Domestic Violence Helpline:</strong> 0800-90009</p>
                  <p>• <strong>Police Emergency:</strong> 15</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
