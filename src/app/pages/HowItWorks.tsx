import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { Lock, MessageSquare, Brain, Sliders, Users, CheckCircle, Shield, ArrowRight, Sparkles } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Secure Access',
      icon: Lock,
      description: "Begin your journey by selecting 'Get Legal Help'. We establish stringent access controls through a secure signup process via email or phone with OTP verification to ensure your privacy.",
      features: [
        'Email or phone registration',
        'OTP verification for security',
        'Encrypted data storage',
        'Complete confidentiality'
      ],
      color: 'secondary'
    },
    {
      number: 2,
      title: 'The Mandatory Legal Interview',
      icon: MessageSquare,
      description: 'To provide accurate guidance within the Pakistani legal context, users complete a 10-question guided interview. The chatbot feature remains locked until this step is finalized, ensuring all necessary data is securely stored for your case.',
      features: [
        'Comprehensive 10-question assessment',
        'Safety check prioritization',
        'Province-specific legal context',
        'Secure data collection'
      ],
      color: 'primary'
    },
    {
      number: 3,
      title: 'AI-Powered Intelligence',
      icon: Brain,
      description: 'Our advanced AI (RAG) processes your query and interview summary to retrieve relevant legal context and rules.',
      features: [
        'Smart Support: AI generates concise case summary',
        'Safety First: System blocks illegal requests',
        'Professional environment maintained',
        'Pakistani law trained responses'
      ],
      color: 'secondary'
    },
    {
      number: 4,
      title: 'Smart Decision Support',
      icon: Sliders,
      description: 'Refine your preferences to find the right help. You can filter potential legal matches based on your specific needs.',
      features: [
        'Sector & Urgency: Family, property, or harassment law',
        'Location & Budget: Province-specific within your range',
        'Gender Preference: Choose your comfort level',
        'Experience & Rating filters'
      ],
      color: 'primary'
    },
    {
      number: 5,
      title: 'Professional Consultation',
      icon: Users,
      description: 'Connect with qualified counsel through our Vetted Marketplace.',
      features: [
        'Qualified Leads: Pre-screened, high-intent matches',
        '40% reduction in basic consultation time',
        'Trial chat or direct paid access options',
        'Continuous case tracking post-selection'
      ],
      color: 'secondary'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/90 text-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[800px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-[14px] font-medium">Your Journey to Justice</span>
            </div>
            <h1 className="text-[48px] font-semibold mb-6">
              How RAAH Works
            </h1>
            <p className="text-[18px] opacity-90 leading-relaxed">
              RAAH provides a comprehensive, secure, and AI-driven journey from your initial query to a professional lawyer consultation.
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={step.number} className="relative">
                  {/* Connector Line - only show between steps */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[47px] top-[120px] w-[2px] h-[calc(100%+48px)] bg-gradient-to-b from-border to-transparent hidden md:block" />
                  )}

                  <div className={`flex flex-col md:flex-row gap-8 items-start ${isEven ? '' : 'md:flex-row-reverse'}`}>
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className={`w-24 h-24 rounded-full ${
                          step.color === 'secondary' ? 'bg-secondary' : 'bg-primary'
                        } flex items-center justify-center shadow-[0px_8px_24px_rgba(15,23,42,0.15)]`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white border-2 border-border flex items-center justify-center shadow-md">
                          <span className="text-[16px] font-bold text-foreground">{step.number}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1">
                      <div className={`bg-white border-2 ${
                        step.color === 'secondary' ? 'border-secondary/20' : 'border-primary/20'
                      } rounded-[10px] p-8 shadow-[0px_8px_24px_rgba(15,23,42,0.08)] hover:shadow-[0px_12px_32px_rgba(15,23,42,0.12)] transition-all`}>
                        <div className="flex items-start gap-3 mb-4">
                          <h3 className="text-[28px] font-semibold text-foreground">
                            {step.title}
                          </h3>
                        </div>

                        <p className="text-[16px] text-foreground leading-relaxed mb-6">
                          {step.description}
                        </p>

                        {/* Features List */}
                        <div className="space-y-3">
                          {step.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                step.color === 'secondary' ? 'text-secondary' : 'text-primary'
                              }`} />
                              <span className="text-[14px] text-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="py-16 bg-accent">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-semibold text-foreground mb-4">
              Why Choose RAAH?
            </h2>
            <p className="text-[16px] text-muted-foreground max-w-[700px] mx-auto">
              Our platform combines cutting-edge AI with verified legal expertise to provide you with a secure, efficient, and compassionate legal journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Benefit 1 */}
            <div className="bg-white border border-border rounded-[10px] p-6 shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="text-[18px] font-semibold text-foreground mb-2">
                Privacy First
              </h4>
              <p className="text-[14px] text-muted-foreground leading-relaxed">
                End-to-end encryption and strict confidentiality protocols ensure your case details remain completely private and secure.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white border border-border rounded-[10px] p-6 shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-[18px] font-semibold text-foreground mb-2">
                AI-Powered Precision
              </h4>
              <p className="text-[14px] text-muted-foreground leading-relaxed">
                Advanced AI trained on Pakistani law provides instant, accurate guidance tailored to your specific legal situation.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white border border-border rounded-[10px] p-6 shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="text-[18px] font-semibold text-foreground mb-2">
                Verified Lawyers Only
              </h4>
              <p className="text-[14px] text-muted-foreground leading-relaxed">
                All lawyers are Bar Council verified and pre-screened to ensure you receive quality legal representation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-gradient-to-br from-primary to-primary/90 rounded-[10px] p-12 text-center text-white">
            <h2 className="text-[32px] font-semibold mb-4">
              Ready to Begin Your Legal Journey?
            </h2>
            <p className="text-[16px] opacity-90 mb-8 max-w-[600px] mx-auto">
              Take the first step towards understanding your legal rights and connecting with qualified legal professionals.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/signup">
                <Button className="bg-white text-primary hover:bg-white/90 h-12 px-8 text-[15px] font-semibold rounded-[10px]">
                  Start Your Confidential Check
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 h-12 px-8 text-[15px] font-semibold rounded-[10px]">
                  Learn More About RAAH
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Notice */}
      <div className="py-12 bg-accent border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[14px] text-muted-foreground">
            Have questions about the process? Contact us at{' '}
            <a href="mailto:help@raah.pk" className="text-primary font-medium hover:underline">
              help@raah.pk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}