import React, { useState, useEffect, useRef } from 'react';

const ForgotPasswordFlow = ({ onComplete, initialEmail = '' }) => {
  const [step, setStep] = useState(1); // 1: Email, 2: Reset Password
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const codeInputRefs = useRef([]);

  // Initialize input refs for code verification inputs
  useEffect(() => {
    codeInputRefs.current = Array(6).fill(0).map((_, i) => codeInputRefs.current[i] || React.createRef());
  }, []);

  // Focus on first input of verification code when step changes to 2
  useEffect(() => {
    if (step === 2 && codeInputRefs.current[0]?.current) {
      setTimeout(() => {
        codeInputRefs.current[0].current.focus();
      }, 300);
    }
  }, [step]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Simulate API call to send verification code
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1500);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setError('');

    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Password strength validation
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Simulate API call to reset password
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    // Only allow numbers
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input after typing
    if (value && index < 5 && codeInputRefs.current[index + 1]) {
      codeInputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to navigate to previous field
    if (e.key === 'Backspace' && !code[index] && index > 0 && codeInputRefs.current[index - 1]) {
      codeInputRefs.current[index - 1].current.focus();
    }
  };

  // Handle paste event for verification code
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    // Check if pasted content is numeric and has appropriate length
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.slice(0, 6).split('');
      const newCode = [...code];

      digits.forEach((digit, index) => {
        if (index < 6) {
          newCode[index] = digit;
        }
      });

      setCode(newCode);

      // Focus on the next empty field or the last field
      const nextEmptyIndex = newCode.findIndex(d => d === '');
      if (nextEmptyIndex !== -1 && codeInputRefs.current[nextEmptyIndex]) {
        codeInputRefs.current[nextEmptyIndex].current.focus();
      } else if (codeInputRefs.current[5]) {
        codeInputRefs.current[5].current.focus();
      }
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {step === 1 && (
        <div className="card p-8 animate-pop bg-white rounded-2xl shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-heading text-neutral-800 mb-2 font-bold">Forgot Password</h2>
            <p className="text-neutral-600">Enter your email to reset your password</p>
          </div>

          <form onSubmit={handleEmailSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl text-neutral-800 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && (
              <div className="mb-4 py-2 px-3 bg-red-100 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 px-6 text-base font-medium bg-pink-500 text-white border border-transparent rounded-xl shadow-md hover:shadow-lg hover:bg-pink-600 transition-all duration-300 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Code...
                </span>
              ) : (
                'Send Verification Code'
              )}
            </button>
          </form>
        </div>
      )}

      {step === 2 && !success && (
        <div className="card p-8 animate-pop bg-white rounded-2xl shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-heading text-neutral-800 mb-2">Reset Password</h2>
            <p className="text-neutral-600">Enter the 6-digit code sent to <span className="font-medium">{email}</span></p>
          </div>

          <form onSubmit={handlePasswordReset}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Verification Code
              </label>
              <div className="flex gap-2 justify-between mb-1" onPaste={handlePaste}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={codeInputRefs.current[index]}
                    type="text"
                    maxLength="1"
                    className="input text-sm"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    aria-label={`Digit ${index + 1}`}
                  />
                ))}
              </div>
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-pink-600 hover:text-pink-800 transition-colors mt-1"
                  onClick={() => {
                    setIsSubmitting(true);
                    setTimeout(() => setIsSubmitting(false), 1000);
                  }}
                >
                  Resend Code
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl text-neutral-800 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl text-neutral-800 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="mb-4 py-2 px-3 bg-red-100 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 px-6 text-base font-medium bg-pink-500 text-white border border-transparent rounded-xl shadow-md hover:shadow-lg hover:bg-pink-600 transition-all duration-300 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting Password...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-sm text-pink-600 hover:text-pink-700"
                onClick={() => setStep(1)}
              >
                Back to Email Verification
              </button>
            </div>
          </form>
        </div>
      )}

      {success && (
        <div className="card p-8 animate-pop bg-white rounded-2xl shadow-lg">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 animate-float">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-heading text-neutral-800 mb-2 font-bold">Password Updated</h2>
            <p className="text-neutral-600">Your password has been successfully reset.</p>
          </div>

          <button
            className="w-full py-3 px-6 text-base font-medium bg-pink-500 text-white border border-transparent rounded-xl shadow-md hover:shadow-lg hover:bg-pink-600 transition-all duration-300"
            onClick={handleComplete}
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordFlow;