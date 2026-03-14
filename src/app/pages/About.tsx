import { Header } from '../components/Header';
import { Shield, Target, Lightbulb, Scale, Lock, Users, CheckCircle } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/90 text-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="text-[48px] font-semibold mb-6">
              About RAAH
            </h1>
            <p className="text-[18px] opacity-90 leading-relaxed">
              Rights Awareness Assistance Hub - Pioneering digital justice in Pakistan through AI-powered legal guidance
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-[32px] font-semibold text-foreground mb-4">
                  Our Vision
                </h2>
                <p className="text-[18px] text-foreground leading-relaxed">
                  To become the standard for digital legal advocacy in Pakistan, empowering the next generation of women with the shield of law and the sword of technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="py-16 bg-accent">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-8 h-8 text-destructive" />
              </div>
              <div>
                <h2 className="text-[32px] font-semibold text-foreground mb-6">
                  The Problem We Solve
                </h2>
                <div className="space-y-4">
                  <p className="text-[16px] text-foreground leading-relaxed">
                    In Pakistan, <strong className="text-primary">80% of women lack basic awareness of their legal protections</strong>, often trapped by a paralyzing fear of social stigma.
                  </p>
                  <p className="text-[16px] text-foreground leading-relaxed">
                    Traditional legal systems are frequently opaque, slow, and expensive, leaving women without a secure or private digital starting point for help.
                  </p>
                  <p className="text-[16px] text-foreground leading-relaxed">
                    Meanwhile, the legal community struggles with inefficient manual screening and difficulty distinguishing genuine cases from casual queries.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white border border-border rounded-[10px] p-6 text-center shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
                <div className="text-[40px] font-bold text-primary mb-2">80%</div>
                <p className="text-[14px] text-muted-foreground">
                  Women lack legal awareness
                </p>
              </div>
              <div className="bg-white border border-border rounded-[10px] p-6 text-center shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
                <div className="text-[40px] font-bold text-primary mb-2">Slow</div>
                <p className="text-[14px] text-muted-foreground">
                  Traditional legal processes
                </p>
              </div>
              <div className="bg-white border border-border rounded-[10px] p-6 text-center shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
                <div className="text-[40px] font-bold text-primary mb-2">High</div>
                <p className="text-[14px] text-muted-foreground">
                  Cost & stigma barriers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="flex items-start gap-6 mb-10">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-[32px] font-semibold text-foreground mb-4">
                  Our Solution
                </h2>
                <p className="text-[18px] text-foreground leading-relaxed mb-2">
                  <strong>RAAH (Rights Awareness Assistance Hub)</strong> is an AI-powered legal guidance ecosystem pioneering digital justice. We provide:
                </p>
              </div>
            </div>

            {/* Solution Cards */}
            <div className="space-y-6">
              {/* Card 1: Intelligent Guidance */}
              <div className="bg-white border-2 border-secondary/20 rounded-[10px] p-8 shadow-[0px_8px_24px_rgba(15,23,42,0.08)] hover:shadow-[0px_12px_32px_rgba(15,23,42,0.12)] transition-shadow">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Scale className="w-7 h-7 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[24px] font-semibold text-foreground mb-3">
                      Intelligent Guidance
                    </h3>
                    <p className="text-[16px] text-foreground leading-relaxed">
                      A multilingual AI trained on local law providing instant, confidential advice tailored to Pakistani legal frameworks and cultural contexts.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-[13px] font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Urdu & English
                      </span>
                      <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-[13px] font-medium">
                        <CheckCircle className="w-4 h-4" />
                        24/7 Available
                      </span>
                      <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-[13px] font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Pakistani Law Trained
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Secured Awareness */}
              <div className="bg-white border-2 border-secondary/20 rounded-[10px] p-8 shadow-[0px_8px_24px_rgba(15,23,42,0.08)] hover:shadow-[0px_12px_32px_rgba(15,23,42,0.12)] transition-shadow">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-7 h-7 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[24px] font-semibold text-foreground mb-3">
                      Secured Awareness
                    </h3>
                    <p className="text-[16px] text-foreground leading-relaxed">
                      Building client confidence by removing the intimidation factor of traditional courts through a safe, private digital environment.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-[13px] font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Complete Privacy
                      </span>
                      <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-[13px] font-medium">
                        <CheckCircle className="w-4 h-4" />
                        No Social Stigma
                      </span>
                      <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-[13px] font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Encrypted Platform
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Vetted Marketplace */}
              <div className="bg-white border-2 border-secondary/20 rounded-[10px] p-8 shadow-[0px_8px_24px_rgba(15,23,42,0.08)] hover:shadow-[0px_12px_32px_rgba(15,23,42,0.12)] transition-shadow">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-7 h-7 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[24px] font-semibold text-foreground mb-3">
                      Vetted Marketplace
                    </h3>
                    <p className="text-[16px] text-foreground leading-relaxed">
                      Connecting pre-informed clients with verified lawyers to drastically reduce time-to-justice and ensure quality legal representation.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-[13px] font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Bar Council Verified
                      </span>
                      <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-[13px] font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Pre-Screened Clients
                      </span>
                      <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-[13px] font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Quality Matches
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-16 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-[800px] mx-auto">
            <h2 className="text-[32px] font-semibold mb-6">
              Empowering Justice Through Technology
            </h2>
            <p className="text-[18px] opacity-90 leading-relaxed mb-10">
              RAAH bridges the gap between legal rights and practical access, creating a safer, more informed Pakistan where every woman knows her protections under the law.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-[36px] font-bold mb-2">Instant</div>
                <p className="text-[14px] opacity-80">AI-powered legal guidance</p>
              </div>
              <div>
                <div className="text-[36px] font-bold mb-2">Verified</div>
                <p className="text-[14px] opacity-80">Bar Council approved lawyers</p>
              </div>
              <div>
                <div className="text-[36px] font-bold mb-2">Confidential</div>
                <p className="text-[14px] opacity-80">Privacy-first platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-12 bg-accent border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[14px] text-muted-foreground">
            Have questions about RAAH? Contact us at{' '}
            <a href="mailto:info@raah.pk" className="text-primary font-medium hover:underline">
              info@raah.pk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
