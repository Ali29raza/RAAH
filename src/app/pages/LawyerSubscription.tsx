import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { CheckCircle, Crown, Zap, Rocket, TrendingUp } from 'lucide-react';

export function LawyerSubscription() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      icon: Zap,
      monthlyPrice: 3999,
      annualPrice: 39990,
      description: 'Perfect for solo practitioners starting out',
      features: [
        'Up to 10 qualified leads per month',
        'Basic AI case summaries',
        'Email support',
        'Standard profile listing',
        'Access to legal AI assistant (100 queries/month)',
        'Case update tracking',
      ],
      recommended: false,
      color: 'border-border'
    },
    {
      id: 'professional',
      name: 'Professional',
      icon: Crown,
      monthlyPrice: 7999,
      annualPrice: 79990,
      description: 'Most popular for growing practices',
      features: [
        'Up to 30 qualified leads per month',
        'Advanced AI case summaries with legal citations',
        'Priority email & chat support',
        'Featured profile listing',
        'Access to legal AI assistant (Unlimited queries)',
        'Case update tracking with client notifications',
        'Weekly analytics & insights',
        'Highlighted in search results',
      ],
      recommended: true,
      color: 'border-secondary'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Rocket,
      monthlyPrice: 14999,
      annualPrice: 149990,
      description: 'For established firms and senior advocates',
      features: [
        'Unlimited qualified leads',
        'Premium AI case summaries with full legal research',
        '24/7 dedicated support',
        'Top-tier featured profile with badge',
        'Unlimited legal AI assistant with drafting tools',
        'Advanced case management & CRM',
        'Daily analytics & performance reports',
        'Priority placement in all searches',
        'Custom Urdu translation for client communication',
        'Direct WhatsApp integration',
      ],
      recommended: false,
      color: 'border-primary'
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    // In production, this would process payment
    navigate('/lawyer-dashboard');
  };

  const getSavingsPercentage = () => {
    return '17%'; // Annual plans save ~17%
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-[36px] font-semibold text-foreground mb-3">
            Choose Your Subscription Plan
          </h1>
          <p className="text-[16px] text-muted-foreground mb-6">
            Join RAAH's vetted marketplace and connect with pre-screened clients
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-accent rounded-[10px] p-1 gap-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-[8px] text-[14px] font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-[8px] text-[14px] font-medium transition-colors relative ${
                billingCycle === 'annual'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                Save {getSavingsPercentage()}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative bg-white border-2 rounded-[10px] p-8 transition-all cursor-pointer hover:shadow-[0px_12px_32px_rgba(15,23,42,0.12)] ${
                  isSelected 
                    ? `${plan.color} shadow-[0px_12px_32px_rgba(15,23,42,0.12)]` 
                    : 'border-border'
                } ${plan.recommended ? 'md:-mt-4 md:mb-4' : ''}`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {/* Recommended Badge */}
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-[12px] font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Plan Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`w-14 h-14 rounded-full ${
                    plan.recommended ? 'bg-secondary/10' : 'bg-accent'
                  } flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${
                      plan.recommended ? 'text-secondary' : 'text-primary'
                    }`} />
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-[24px] font-semibold text-foreground text-center mb-2">
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-[13px] text-muted-foreground text-center mb-6">
                  {plan.description}
                </p>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-[12px] text-muted-foreground">PKR</span>
                    <span className="text-[36px] font-bold text-foreground">
                      {price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[13px] text-muted-foreground">
                    {billingCycle === 'monthly' ? 'per month' : 'per year'}
                  </p>
                  {billingCycle === 'annual' && (
                    <p className="text-[12px] text-secondary font-medium mt-1">
                      PKR {Math.round(plan.annualPrice / 12).toLocaleString()}/month billed annually
                    </p>
                  )}
                </div>

                {/* Select Button */}
                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full h-12 rounded-[10px] font-semibold mb-6 ${
                    isSelected
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-white border-2 border-primary text-primary hover:bg-primary/5'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Select Plan'}
                </Button>

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-[13px] text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Benefits Section */}
        <div className="bg-accent rounded-[10px] p-8 mb-8">
          <h3 className="text-[20px] font-semibold text-foreground mb-6 text-center">
            All Plans Include:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-foreground mb-1">
                  Vetted Leads Only
                </h4>
                <p className="text-[12px] text-muted-foreground">
                  All clients complete a 10-question legal assessment
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-foreground mb-1">
                  Pay Per Match
                </h4>
                <p className="text-[12px] text-muted-foreground">
                  Only pay for leads you accept
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-foreground mb-1">
                  Analytics Dashboard
                </h4>
                <p className="text-[12px] text-muted-foreground">
                  Track leads, conversions, and performance
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-foreground mb-1">
                  Secure Platform
                </h4>
                <p className="text-[12px] text-muted-foreground">
                  End-to-end encryption & compliance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedPlan}
            className="bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed h-14 px-12 text-[16px] font-semibold rounded-[10px]"
          >
            {selectedPlan ? 'Continue to Payment' : 'Select a Plan to Continue'}
          </Button>
        </div>

        {/* FAQ Notice */}
        <div className="text-center mt-8">
          <p className="text-[13px] text-muted-foreground">
            Questions about plans? Contact us at{' '}
            <a href="mailto:lawyers@raah.pk" className="text-primary font-medium hover:underline">
              lawyers@raah.pk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
