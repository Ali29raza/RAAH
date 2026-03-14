import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { 
  Scale, 
  CheckCircle, 
  Clock, 
  BarChart, 
  Eye, 
  FileText, 
  Shield, 
  TrendingUp,
  Sparkles,
  ArrowRight,
  Users,
  Brain,
  Target
} from 'lucide-react';

export function WhyJoinRaah() {
  const benefits = [
    {
      icon: Users,
      title: 'Qualified, Pre-Screened Leads',
      description: 'Stop wasting time on casual queries. Our Mandatory Legal Interview ensures you only receive high-intent, pre-informed clients who have already been screened for jurisdiction and case maturity.',
      color: 'secondary'
    },
    {
      icon: Clock,
      title: 'Drastically Reduced Consultation Time',
      description: 'Our AI generates a concise case summary for every lead, allowing you to skip the "basic procedural education" that typically consumes 40% of your initial consultation.',
      highlight: '40% Time Saved',
      color: 'primary'
    },
    {
      icon: BarChart,
      title: 'Professional AI Dashboard',
      description: 'Gain access to a dedicated dashboard featuring AI-Automated Lead Ops to manage your caseload, track potential matches, and simplify complex legal interpretations into accessible language.',
      color: 'secondary'
    },
    {
      icon: Eye,
      title: 'Enhanced Digital Visibility',
      description: 'Stand out as a Recommended Lawyer. Our subscription-based tiering system boosts your visibility to potential clients based on your specific expertise, location, and gender preferences.',
      color: 'primary'
    },
    {
      icon: FileText,
      title: 'Seamless Case Tracking',
      description: 'Maintain professional continuity with tools for continuous case tracking post-lawyer selection, ensuring transparency and building trust with your clients.',
      color: 'secondary'
    },
    {
      icon: Shield,
      title: 'Verified Network',
      description: 'Join an elite group of practitioners. Our rigorous one-time verification and onboarding process ensures that the marketplace remains a high-quality environment for both lawyers and seekers of justice.',
      color: 'primary'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/90 text-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[900px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <Scale className="w-4 h-4" />
              <span className="text-[14px] font-medium">For Legal Professionals</span>
            </div>
            <h1 className="text-[48px] font-semibold mb-6">
              Why Join RAAH?
            </h1>
            <p className="text-[20px] opacity-90 leading-relaxed mb-4">
              Empowering Your Practice with AI-Driven Efficiency
            </p>
            <p className="text-[16px] opacity-80 leading-relaxed max-w-[800px] mx-auto">
              RAAH is more than just a directory; it is a SaaS-based scalable revenue ecosystem designed to bridge the gap between qualified legal counsel and underserved users in Pakistan. By joining our Vetted Marketplace, you move away from fragmented digital marketing and into a professional hub built for growth.
            </p>
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[36px] font-semibold text-foreground mb-4">
              Key Benefits for Legal Professionals
            </h2>
            <p className="text-[16px] text-muted-foreground max-w-[700px] mx-auto">
              Transform your legal practice with cutting-edge technology and pre-qualified client connections
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className={`bg-white border-2 ${
                    benefit.color === 'secondary' ? 'border-secondary/20' : 'border-primary/20'
                  } rounded-[10px] p-8 shadow-[0px_8px_24px_rgba(15,23,42,0.08)] hover:shadow-[0px_12px_32px_rgba(15,23,42,0.12)] transition-all`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-full ${
                      benefit.color === 'secondary' ? 'bg-secondary/10' : 'bg-primary/10'
                    } flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-7 h-7 ${
                        benefit.color === 'secondary' ? 'text-secondary' : 'text-primary'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-[20px] font-semibold text-foreground">
                          {benefit.title}
                        </h3>
                        {benefit.highlight && (
                          <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[12px] font-semibold">
                            {benefit.highlight}
                          </span>
                        )}
                      </div>
                      <p className="text-[15px] text-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Nationwide Impact Section */}
      <div className="py-16 bg-accent">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-[32px] font-semibold text-foreground mb-4">
                  Take Your Practice Nationwide
                </h2>
                <p className="text-[16px] text-foreground leading-relaxed mb-6">
                  RAAH solves the problem of low digital marketing reach by providing you with a scalable nationwide infrastructure to connect with women navigating family, marriage, or harassment disputes who need your specific expertise.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-border rounded-[10px] p-6 text-center shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
                <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-3" />
                <div className="text-[32px] font-bold text-primary mb-1">Nationwide</div>
                <p className="text-[14px] text-muted-foreground">Reach across Pakistan</p>
              </div>

              <div className="bg-white border border-border rounded-[10px] p-6 text-center shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
                <Brain className="w-8 h-8 text-secondary mx-auto mb-3" />
                <div className="text-[32px] font-bold text-primary mb-1">AI-Powered</div>
                <p className="text-[14px] text-muted-foreground">Smart lead qualification</p>
              </div>

              <div className="bg-white border border-border rounded-[10px] p-6 text-center shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
                <Shield className="w-8 h-8 text-secondary mx-auto mb-3" />
                <div className="text-[32px] font-bold text-primary mb-1">Verified</div>
                <p className="text-[14px] text-muted-foreground">Trusted marketplace</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Quote Section */}
      <div className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-gradient-to-br from-secondary to-secondary/90 rounded-[10px] p-12 text-center text-white relative overflow-hidden">
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
            
            <div className="relative z-10">
              <Sparkles className="w-12 h-12 mx-auto mb-6 opacity-80" />
              <blockquote className="text-[24px] font-medium leading-relaxed max-w-[800px] mx-auto italic">
                "Empowering the next generation of lawyers with the sword of technology to redefine legal access in Pakistan."
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Preview */}
      <div className="py-16 bg-accent">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-semibold text-foreground mb-4">
              Simple Onboarding Process
            </h2>
            <p className="text-[16px] text-muted-foreground">
              Join RAAH in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-[24px] font-bold">1</span>
              </div>
              <h3 className="text-[18px] font-semibold text-foreground mb-2">
                Verification & Onboarding
              </h3>
              <p className="text-[14px] text-muted-foreground">
                Submit Bar Council credentials and pay one-time setup fee
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-[24px] font-bold">2</span>
              </div>
              <h3 className="text-[18px] font-semibold text-foreground mb-2">
                Select Subscription
              </h3>
              <p className="text-[14px] text-muted-foreground">
                Choose from Starter, Professional, or Enterprise plans
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-[24px] font-bold">3</span>
              </div>
              <h3 className="text-[18px] font-semibold text-foreground mb-2">
                Start Receiving Leads
              </h3>
              <p className="text-[14px] text-muted-foreground">
                Access your AI dashboard and connect with qualified clients
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
              Ready to Transform Your Practice?
            </h2>
            <p className="text-[16px] opacity-90 mb-8 max-w-[600px] mx-auto">
              Join RAAH's vetted marketplace today and start connecting with pre-screened, high-intent clients across Pakistan.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/lawyer-onboarding">
                <Button className="bg-white text-primary hover:bg-white/90 h-12 px-8 text-[15px] font-semibold rounded-[10px]">
                  Start Verification Process
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/lawyer-dashboard">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 h-12 px-8 text-[15px] font-semibold rounded-[10px]">
                  View Dashboard Demo
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 opacity-90" />
                  <p className="text-[13px] opacity-80">One-time PKR 5,000 verification</p>
                </div>
                <div>
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 opacity-90" />
                  <p className="text-[13px] opacity-80">Cancel subscription anytime</p>
                </div>
                <div>
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 opacity-90" />
                  <p className="text-[13px] opacity-80">24-48 hour approval process</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Notice */}
      <div className="py-12 bg-accent border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[14px] text-muted-foreground">
            Questions about joining RAAH? Contact our lawyer success team at{' '}
            <a href="mailto:lawyers@raah.pk" className="text-primary font-medium hover:underline">
              lawyers@raah.pk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
