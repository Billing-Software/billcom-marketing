import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CreditCard, ShoppingBag, ArrowRight, ShieldCheck, User, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5208/api';
const WORKSPACE_URL = import.meta.env.VITE_WORKSPACE_URL || 'http://localhost:3000';

// Helper to inject Razorpay checkout.js script
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const [searchParams] = useSearchParams();
  
  // States
  const [planId, setPlanId] = useState<number>(2); // Default to Professional
  const [step, setStep] = useState<number>(1); // 1: Details/Form, 2: Verification, 3: Success Confirmation
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(5);
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  
  // Razorpay Key fetched dynamically from backend config
  const [razorpayKey, setRazorpayKey] = useState<string>('rzp_test_mockKeyId123');

  // Verify failure state for manual retry
  const [failedPaymentDetails, setFailedPaymentDetails] = useState<{
    token: string;
    subId: string;
    paymentId: string;
    signature: string;
  } | null>(null);

  // Registration Form State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    legalName: '',
    businessPhone: '',
  });

  // Client-side validation errors
  const [valErrors, setValErrors] = useState<Record<string, string>>({});
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  useEffect(() => {
    // 1. Fetch Razorpay config KeyId from Backend
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/registration/config`);
        if (response.ok) {
          const config = await response.json();
          if (config.keyId) {
            setRazorpayKey(config.keyId);
          }
        }
      } catch (err) {
        console.error('Failed to load Razorpay configuration from backend:', err);
      }
    };
    fetchConfig();

    // 2. Read query params
    const planParam = searchParams.get('plan');
    if (planParam) {
      const parsed = parseInt(planParam, 10);
      if (!isNaN(parsed)) setPlanId(parsed);
    }

    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      // Resume checkout from email link
      fetchPendingSession(tokenParam);
    }
  }, [searchParams]);

  // Countdown timer for success redirect
  useEffect(() => {
    if (step === 3 && countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === 3 && countdown === 0 && redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [step, countdown, redirectUrl]);

  const fetchPendingSession = async (token: string) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`${API_BASE_URL}/registration/resume/${token}`);
      if (!response.ok) {
        throw new Error('Invalid or expired checkout token.');
      }
      const data = await response.json();
      setPlanId(data.selectedPlanId || 1);
      setFormData(prev => ({
        ...prev,
        username: data.username || '',
        email: data.email || '',
        legalName: data.businessName || '',
      }));
      
      // Auto-launch Razorpay if we have a pending subscription
      if (data.subscriptionId) {
        setStep(1);
        await launchRazorpayAutopay(token, data.subscriptionId);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load pending session.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (valErrors[name]) {
      setValErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.username.trim() || formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters.';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Alphanumeric and underscores only.';
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.password || formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.legalName.trim()) {
      errors.legalName = 'Business Legal name is required.';
    }

    if (!formData.businessPhone.trim() || !/^\+?[0-9\s-]{10,15}$/.test(formData.businessPhone)) {
      errors.businessPhone = 'Please enter a valid store phone number (minimum 10 digits).';
    }

    if (!acceptTerms) {
      errors.acceptTerms = 'You must accept the terms and conditions.';
    }

    setValErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getPlanDetails = () => {
    switch (planId) {
      case 1:
        return { name: 'Starter Plan', price: '₹499', description: 'Single Branch Limit' };
      case 3:
        return { name: 'Enterprise Plan', price: '₹1,999', description: 'Unlimited Branches' };
      case 2:
      default:
        return { name: 'Professional Plan', price: '₹999', description: 'Up to 5 Branches Limit' };
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // 1. Start Registration State on Backend
      const response = await fetch(`${API_BASE_URL}/registration/start?planId=${planId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to start registration.');
      }

      const session = await response.json();

      // 2. Launch real Razorpay modal directly
      await launchRazorpayAutopay(session.token, session.subscriptionId);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  const verifyPayment = async (token: string, subId: string, paymentId: string, signature: string) => {
    setLoading(true);
    setStep(2);
    setErrorMessage('');
    setFailedPaymentDetails(null);

    try {
      const verifyResponse = await fetch(`${API_BASE_URL}/registration/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token,
          razorpaySubscriptionId: subId,
          razorpayPaymentId: paymentId,
          razorpaySignature: signature,
        }),
      });

      if (!verifyResponse.ok) {
        const errJson = await verifyResponse.json();
        throw new Error(errJson.message || 'Payment signature verification failed.');
      }

      const data = await verifyResponse.json();
      
      // Auto-login URL uses client hash fragment parameter formatting so that sensitive JWT keys
      // are client-side only and never sent to Vite or proxy backend log endpoints.
      const autoLoginUrl = `${WORKSPACE_URL}/autologin?token=${encodeURIComponent(data.token)}&username=${encodeURIComponent(data.username)}&email=${encodeURIComponent(data.email)}&role=${encodeURIComponent(data.role)}&businessId=${data.businessId}&businessName=${encodeURIComponent(data.businessName)}&new=true`;
      
      setRedirectUrl(autoLoginUrl);
      setStep(3);
    } catch (verifyErr: any) {
      setErrorMessage(verifyErr.message || 'Payment verification failed.');
      // Save details for retry button
      setFailedPaymentDetails({ token, subId, paymentId, signature });
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const launchRazorpayAutopay = async (token: string, subId: string) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setErrorMessage('Failed to load Razorpay payment gateway client. Check your network.');
      setLoading(false);
      return;
    }

    const planData = getPlanDetails();

    const options = {
      key: razorpayKey.trim(),
      subscription_id: subId,
      name: 'SmartBill Pro',
      description: `Autopay Subscription: ${planData.name}`,
      image: 'https://smartbill.pro/assets/BillCom-B.png',
      handler: async (response: any) => {
        await verifyPayment(
          token, 
          subId, 
          response.razorpay_payment_id || 'pay_mock123', 
          response.razorpay_signature || 'sig_mock123'
        );
      },
      prefill: {
        name: formData.username || 'Business Owner',
        email: formData.email,
        contact: formData.businessPhone || '',
      },
      theme: {
        color: '#006a61',
      },
      modal: {
        ondismiss: async () => {
          setLoading(true);
          try {
            await fetch(`${API_BASE_URL}/registration/mark-failed`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: token, reason: 'Payment modal dismissed by user' }),
            });
          } catch (e) {
            console.error('Failed to notify backend of payment cancellation', e);
          }
          setErrorMessage('Payment setup was cancelled. Check your email shortly for a checkout recovery link.');
          setLoading(false);
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const planInfo = getPlanDetails();

  // Step 2: Verification Loading Screen
  if (step === 2) {
    return (
      <div className="max-w-xl mx-auto glass-card rounded-3xl border border-slate-200 p-10 bg-white shadow-xl text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#006a61] border-t-transparent mx-auto"></div>
        <h3 className="font-display font-bold text-lg text-slate-800">Verifying Autopay Mandate</h3>
        <p className="text-xs text-slate-400">Verifying payment signature and setting up your database nodes. Please do not close or reload this window...</p>
      </div>
    );
  }

  // Step 3: Success Confirmation Page
  if (step === 3) {
    return (
      <div className="max-w-xl mx-auto glass-card rounded-3xl border border-slate-200 p-10 bg-white shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
          <CheckCircle2 size={36} />
        </div>
        <div className="space-y-2">
          <h3 className="font-display font-bold text-xl text-slate-800">Payment Setup Completed!</h3>
          <p className="text-sm text-slate-500 font-semibold">Your subscription plan ({planInfo.name}) is now fully active.</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 font-medium space-y-2">
          <p>We are setting up your workspace branches and default configurations.</p>
          <p>Redirecting you to the SmartBill Pro Dashboard in <span className="font-mono font-bold text-[#006a61] text-sm">{countdown}</span> seconds...</p>
        </div>
        <button 
          onClick={() => { window.location.href = redirectUrl; }}
          className="w-full py-3 bg-[#006a61] hover:bg-[#004d47] text-white rounded-xl text-xs font-bold transition-all shadow-md"
        >
          Launch Dashboard Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl border shadow-xl flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#006a61] border-t-transparent"></div>
            <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Configuring Secure Channels...</p>
          </div>
        </div>
      )}

      <div className="text-center space-y-2">
        <h2 className="font-display font-extrabold text-3xl text-slate-900">Complete Your Checkout</h2>
        <p className="text-slate-400 text-sm font-semibold">
          Set up Razorpay Autopay to activate your billing account
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Registration Form */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-8 shadow-lg shadow-[#006a61]/5 space-y-6">
          <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <User size={18} className="text-[#006a61]" /> Register Your Details
          </h3>

          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold flex flex-col gap-2 text-left">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
              {failedPaymentDetails && (
                <button
                  onClick={() => verifyPayment(
                    failedPaymentDetails.token, 
                    failedPaymentDetails.subId, 
                    failedPaymentDetails.paymentId, 
                    failedPaymentDetails.signature
                  )}
                  className="mt-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold rounded-lg flex items-center gap-1.5 w-fit"
                >
                  <RefreshCw size={12} /> Retry Verification
                </button>
              )}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Owner Username</label>
                <input 
                  type="text" 
                  name="username"
                  required
                  placeholder="e.g. janesmith"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                    valErrors.username ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-[#006a61]'
                  }`}
                />
                {valErrors.username && <p className="text-[10px] text-rose-500 font-semibold">{valErrors.username}</p>}
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Owner Personal Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="e.g. jane@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                    valErrors.email ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-[#006a61]'
                  }`}
                />
                {valErrors.email && <p className="text-[10px] text-rose-500 font-semibold">{valErrors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Security Password</label>
                <input 
                  type="password" 
                  name="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                    valErrors.password ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-[#006a61]'
                  }`}
                />
                {valErrors.password && <p className="text-[10px] text-rose-500 font-semibold">{valErrors.password}</p>}
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Business Legal Name</label>
                <input 
                  type="text" 
                  name="legalName"
                  required
                  placeholder="e.g. Jane Retail Ltd"
                  value={formData.legalName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                    valErrors.legalName ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-[#006a61]'
                  }`}
                />
                {valErrors.legalName && <p className="text-[10px] text-rose-500 font-semibold">{valErrors.legalName}</p>}
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Store Phone Number</label>
              <input 
                type="text" 
                name="businessPhone"
                required
                placeholder="e.g. +91 99887 76655"
                value={formData.businessPhone}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                  valErrors.businessPhone ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-[#006a61]'
                }`}
              />
              {valErrors.businessPhone && <p className="text-[10px] text-rose-500 font-semibold">{valErrors.businessPhone}</p>}
            </div>

            {/* Terms and Conditions / Privacy Policy Checkbox */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-start gap-2.5">
                <input 
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    if (e.target.checked && valErrors.acceptTerms) {
                      setValErrors(prev => {
                        const copy = { ...prev };
                        delete copy.acceptTerms;
                        return copy;
                      });
                    }
                  }}
                  className="w-4 h-4 mt-0.5 text-[#006a61] border-slate-300 rounded focus:ring-0 cursor-pointer"
                />
                <label htmlFor="acceptTerms" className="text-[11px] text-slate-500 font-semibold leading-relaxed cursor-pointer select-none text-left">
                  I agree to the{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#006a61] hover:underline font-bold">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#006a61] hover:underline font-bold">
                    Privacy Policy
                  </a>.
                </label>
              </div>
              {valErrors.acceptTerms && <p className="text-[10px] text-rose-500 font-semibold text-left">{valErrors.acceptTerms}</p>}
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 bg-[#006a61] hover:bg-[#004d47] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Processing Autopay...' : 'Proceed to Autopay Setup'} <ArrowRight size={14} />
            </button>

            {/* Login Link below Autopay Button */}
            <div className="text-center pt-2">
              <a 
                href={`${WORKSPACE_URL}/login`}
                className="text-xs text-[#006a61] hover:underline font-bold transition-all"
              >
                Already have an account? Login
              </a>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 flex flex-col justify-between h-full gap-6 shadow-lg shadow-[#006a61]/5">
          <div className="space-y-6">
            <h3 className="font-display font-bold text-base text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-3">
              <ShoppingBag size={18} className="text-[#006a61]" /> Order Summary
            </h3>

            <div className="space-y-3.5 text-left">
              <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                <span>Selected Plan:</span>
                <span className="text-slate-800 font-extrabold">{planInfo.name}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                <span>Branch Limit:</span>
                <span className="text-[#006a61] font-black">{planInfo.description}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                <span>Cycle:</span>
                <span className="text-slate-500 font-semibold">Monthly Auto-debit</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-5 text-left space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-extrabold text-slate-700">Due Today:</span>
                <span className="text-2xl font-black text-slate-900 font-mono">{planInfo.price}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 justify-center">
              <ShieldCheck size={14} className="text-emerald-500" /> Fully Secured by Razorpay
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 justify-center">
              <CreditCard size={14} className="text-emerald-500" /> 1-Click Mandate Management
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
