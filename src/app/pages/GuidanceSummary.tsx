import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { useAppContext } from '../context/AppContext';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export function GuidanceSummary() {
  const navigate = useNavigate();
  const { guidanceSummary } = useAppContext();

  if (!guidanceSummary) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
          <p className="text-muted-foreground">No guidance summary available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-[32px] font-semibold text-foreground mb-2">
            Your Legal Guidance Summary
          </h1>
          <p className="text-[16px] text-muted-foreground">
            Based on your conversation with RAAH AI.
          </p>
        </div>
        
        <div className="grid grid-cols-[70%_30%] gap-6">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            {/* Card 1: Identified Issue */}
            <div className="bg-white border border-border rounded-[10px] p-6 shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
              <h3 className="text-[20px] font-semibold text-foreground mb-3">
                Identified Issue
              </h3>
              <p className="text-[16px] text-foreground">
                {guidanceSummary.identifiedIssue}
              </p>
            </div>
            
            {/* Card 2: Relevant Pakistani Law */}
            <div className="bg-white border border-border rounded-[10px] p-6 shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
              <h3 className="text-[20px] font-semibold text-foreground mb-4">
                Relevant Pakistani Law
              </h3>
              <div className="space-y-3">
                {guidanceSummary.relevantLaw.map((law, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-[15px] text-foreground">{law}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Card 3: Recommended Legal Steps */}
            <div className="bg-white border border-border rounded-[10px] p-6 shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
              <h3 className="text-[20px] font-semibold text-foreground mb-4">
                Recommended Legal Steps
              </h3>
              <ol className="space-y-3">
                {guidanceSummary.legalSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-[13px] font-semibold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-[15px] text-foreground pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            
            {/* Card 4: Required Documents */}
            <div className="bg-white border border-border rounded-[10px] p-6 shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
              <h3 className="text-[20px] font-semibold text-foreground mb-4">
                Required Documents
              </h3>
              <div className="space-y-3">
                {guidanceSummary.requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`doc-${index}`}
                      className="w-4 h-4 rounded border-border"
                    />
                    <label
                      htmlFor={`doc-${index}`}
                      className="text-[15px] text-foreground cursor-pointer"
                    >
                      {doc}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Safety & CTA */}
          <div className="space-y-6">
            {/* Safety Advice Box */}
            <div className="bg-accent border-2 border-secondary rounded-[10px] p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-secondary" />
                <h3 className="text-[20px] font-semibold text-foreground">
                  Safety Advice
                </h3>
              </div>
              <div className="space-y-3 text-[14px] text-foreground">
                <p>
                  • If you are in immediate danger, go to a safe location.
                </p>
                <p>
                  • Do not confront the abuser alone.
                </p>
                <p>
                  • Save emergency contacts.
                </p>
              </div>
            </div>
            
            {/* CTA Button */}
            <Button
              onClick={() => navigate('/lawyers')}
              className="w-full bg-primary text-white hover:bg-primary/90 h-12 text-[15px] font-semibold rounded-[10px]"
            >
              Connect with Verified Lawyer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
