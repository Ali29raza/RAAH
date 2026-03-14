import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { CheckCircle, Shield, FileText, CreditCard, Building2, Scale } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export function LawyerOnboarding() {
  const navigate = useNavigate();
  const { setLawyerOnboardingCompleted, setLawyerProfile } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    barCouncilNumber: '',
    barCouncilName: '',
    chamberAddress: '',
    city: '',
    practiceAreas: [] as string[],
    yearsOfExperience: '',
    email: '',
    phone: '',
    cnic: '',
    acceptedTerms: false,
  });

  const TOTAL_STEPS = 3;
  const practiceAreaOptions = [
    'Family Law (Marriage, Divorce, Khula)',
    'Domestic Violence & Safety',
    'Inheritance & Property Rights',
    'Workplace Harassment',
    'Criminal Law',
    'Civil Litigation',
    'Corporate Law',
    'Constitutional Law'
  ];

  const handlePracticeAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      practiceAreas: prev.practiceAreas.includes(area)
        ? prev.practiceAreas.filter(a => a !== area)
        : [...prev.practiceAreas, area]
    }));
  };

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      setError(null);
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) throw new Error("Authentication required");

        const response = await fetch('/api/lawyer-onboarding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data?.error || 'Failed to submit onboarding data');
        }

        const data = await response.json();

        setLawyerOnboardingCompleted(true);
        if (data.lawyer_profile) {
          setLawyerProfile(data.lawyer_profile);
        }
        // Navigate to subscription selection
        navigate('/lawyer-subscription');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.fullName && formData.barCouncilNumber && formData.barCouncilName;
    }
    if (currentStep === 2) {
      return formData.chamberAddress && formData.city && formData.practiceAreas.length > 0;
    }
    if (currentStep === 3) {
      return formData.email && formData.phone && formData.acceptedTerms;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[900px] mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
              <Scale className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-[32px] font-semibold text-foreground mb-2">
            Lawyer Verification & Onboarding
          </h1>
          <p className="text-[16px] text-muted-foreground">
            Join RAAH's vetted marketplace to connect with pre-screened clients
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12 max-w-[600px] mx-auto">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  currentStep >= step 
                    ? 'bg-primary border-primary text-white' 
                    : 'bg-white border-border text-muted-foreground'
                }`}>
                  {currentStep > step ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-[14px] font-semibold">{step}</span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground mt-2 text-center">
                  {step === 1 && 'Bar Details'}
                  {step === 2 && 'Practice Info'}
                  {step === 3 && 'Contact & Fee'}
                </p>
              </div>
              {step < 3 && (
                <div className={`h-[2px] flex-1 mx-2 ${
                  currentStep > step ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white border border-border rounded-[10px] p-8 shadow-[0px_8px_24px_rgba(15,23,42,0.08)]">
          {/* Step 1: Bar Council Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <Building2 className="w-6 h-6 text-secondary mt-1" />
                <div>
                  <h3 className="text-[20px] font-semibold text-foreground mb-1">
                    Bar Council & Chamber Details
                  </h3>
                  <p className="text-[14px] text-muted-foreground">
                    We verify all credentials to maintain a trusted marketplace
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Legal Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="As registered with Bar Council"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="h-12 rounded-[10px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="barCouncilNumber">Bar Council Enrollment Number *</Label>
                  <Input
                    id="barCouncilNumber"
                    placeholder="e.g., LHC/1234/2015"
                    value={formData.barCouncilNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, barCouncilNumber: e.target.value }))}
                    className="h-12 rounded-[10px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="barCouncilName">Bar Council Name *</Label>
                  <Select 
                    value={formData.barCouncilName}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, barCouncilName: value }))}
                  >
                    <SelectTrigger className="h-12 rounded-[10px]">
                      <SelectValue placeholder="Select your Bar Council" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="punjab">Punjab Bar Council</SelectItem>
                      <SelectItem value="sindh">Sindh Bar Council</SelectItem>
                      <SelectItem value="kpk">Khyber Pakhtunkhwa Bar Council</SelectItem>
                      <SelectItem value="balochistan">Balochistan Bar Council</SelectItem>
                      <SelectItem value="islamabad">Islamabad Bar Council</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnic">CNIC Number *</Label>
                  <Input
                    id="cnic"
                    placeholder="12345-1234567-1"
                    value={formData.cnic}
                    onChange={(e) => setFormData(prev => ({ ...prev, cnic: e.target.value }))}
                    className="h-12 rounded-[10px]"
                    required
                  />
                </div>
              </div>

              <div className="bg-accent border border-secondary/20 rounded-[10px] p-4 mt-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-[13px] font-semibold text-foreground mb-1">
                      Verification Process
                    </h4>
                    <p className="text-[12px] text-muted-foreground">
                      Our team will verify your credentials with the Bar Council within 24-48 hours. You'll receive an email confirmation once approved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Practice Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <FileText className="w-6 h-6 text-secondary mt-1" />
                <div>
                  <h3 className="text-[20px] font-semibold text-foreground mb-1">
                    Practice Areas & Experience
                  </h3>
                  <p className="text-[14px] text-muted-foreground">
                    Help us match you with relevant clients
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="chamberAddress">Chamber Address *</Label>
                  <Textarea
                    id="chamberAddress"
                    placeholder="Complete chamber/office address"
                    value={formData.chamberAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, chamberAddress: e.target.value }))}
                    className="min-h-[80px] rounded-[10px] resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Select 
                    value={formData.city}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
                  >
                    <SelectTrigger className="h-12 rounded-[10px]">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lahore">Lahore</SelectItem>
                      <SelectItem value="karachi">Karachi</SelectItem>
                      <SelectItem value="islamabad">Islamabad</SelectItem>
                      <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
                      <SelectItem value="faisalabad">Faisalabad</SelectItem>
                      <SelectItem value="multan">Multan</SelectItem>
                      <SelectItem value="peshawar">Peshawar</SelectItem>
                      <SelectItem value="quetta">Quetta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearsOfExperience">Years of Practice Experience</Label>
                  <Select 
                    value={formData.yearsOfExperience}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, yearsOfExperience: value }))}
                  >
                    <SelectTrigger className="h-12 rounded-[10px]">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11-15">11-15 years</SelectItem>
                      <SelectItem value="15+">15+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Specialized Practice Areas * (Select all that apply)</Label>
                  <div className="space-y-2">
                    {practiceAreaOptions.map((area) => (
                      <div 
                        key={area}
                        className="flex items-center space-x-3 border border-border rounded-[10px] p-3 hover:border-secondary transition-colors cursor-pointer"
                        onClick={() => handlePracticeAreaToggle(area)}
                      >
                        <Checkbox
                          id={area}
                          checked={formData.practiceAreas.includes(area)}
                          onCheckedChange={() => handlePracticeAreaToggle(area)}
                        />
                        <Label htmlFor={area} className="cursor-pointer flex-1 text-[14px]">
                          {area}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-[12px] text-muted-foreground">
                    Selected: {formData.practiceAreas.length} area{formData.practiceAreas.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact & Onboarding Fee */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-secondary mt-1" />
                <div>
                  <h3 className="text-[20px] font-semibold text-foreground mb-1">
                    Contact Information & Onboarding Fee
                  </h3>
                  <p className="text-[14px] text-muted-foreground">
                    Final step to complete your profile setup
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="h-12 rounded-[10px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="h-12 rounded-[10px]"
                    required
                  />
                </div>
              </div>

              {/* Onboarding Fee Section */}
              <div className="bg-accent rounded-[10px] p-6 mt-6">
                <h4 className="text-[16px] font-semibold text-foreground mb-3">
                  One-Time Onboarding Fee
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] text-muted-foreground">Profile Verification & Setup</span>
                    <span className="text-[20px] font-bold text-primary">PKR 5,000</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <ul className="space-y-2 text-[13px] text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Manual credential verification with Bar Council</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Professional digital profile creation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Access to AI-powered lead management dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Professional AI legal assistant for case research</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-3">
                <div 
                  className="flex items-start space-x-3 cursor-pointer"
                  onClick={() => setFormData(prev => ({ ...prev, acceptedTerms: !prev.acceptedTerms }))}
                >
                  <Checkbox
                    id="terms"
                    checked={formData.acceptedTerms}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptedTerms: checked as boolean }))}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="cursor-pointer text-[13px] leading-relaxed">
                    I agree to RAAH's Terms of Service, Privacy Policy, and confirm that all information provided is accurate. I understand that providing false information may result in permanent suspension from the platform.
                  </Label>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-[10px] p-4 mt-4">
                <p className="text-[12px] text-yellow-800">
                  <strong>Note:</strong> After submitting, you'll be redirected to select your monthly subscription plan. Your profile will be activated once both the onboarding fee and first month's subscription are confirmed.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            onClick={handleBack}
            variant="outline"
            disabled={currentStep === 1}
            className="border-border text-foreground hover:bg-accent disabled:opacity-50 h-12 px-6 rounded-[10px]"
          >
            Back
          </Button>
          
            {error && (
              <div className="absolute bottom-full mb-4 right-0 bg-red-50 text-red-600 p-3 rounded-md border border-red-200 text-[13px] max-w-sm">
                {error}
              </div>
            )}
          <Button
            onClick={handleNext}
            disabled={!isStepValid() || isSubmitting}
            className="bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed h-12 px-8 rounded-[10px]"
          >
            {isSubmitting ? 'Submitting...' : currentStep === TOTAL_STEPS ? 'Proceed to Subscription' : 'Next Step'}
          </Button>
        </div>
      </div>
    </div>
  );
}
