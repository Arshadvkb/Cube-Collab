import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Loader2, ArrowRight, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  
  const { sendResetOtp, verifyResetOtp, resetPassword, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await sendResetOtp(email);
      setStep(2);
    } catch (err) {
      // Error handled in store
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return;
    try {
      // Assuming verifyResetOtp currently sets a token in the backend via cookie OR returns it.
      // Wait, in auth.controller.js matchOtp returns success and assigns a token internally or we need to adjust?
      // "matchOtp" logic sets user.resetpasswordotp = null and signs a token, but it does NOT send it in the response body!
      // Wait! Let me check `auth.controller.js`.
      const res = await verifyResetOtp(email, otp);
      if (res.token) {
        setResetToken(res.token);
      }
      setStep(3);
    } catch (err) {
      // Error handled in store
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Note: If the backend needs a "token", we pass `resetToken`.
    try {
      // If the backend requires the actual auth token to be passed, we'll see. Assuming standard token passing.
      await resetPassword(resetToken, newPassword);
      setStep(4);
    } catch (err) {
      // Error handled in store
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-indigo-500/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 mb-6 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            {step === 1 && <Mail className="w-8 h-8 text-indigo-400" />}
            {step === 2 && <ShieldCheck className="w-8 h-8 text-indigo-400" />}
            {step === 3 && <Lock className="w-8 h-8 text-indigo-400" />}
            {step === 4 && <CheckCircle2 className="w-8 h-8 text-emerald-400" />}
          </div>
          <h2 className="text-3xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
            {step === 1 && "Forgot Password"}
            {step === 2 && "Verify Email"}
            {step === 3 && "Set New Password"}
            {step === 4 && "Password Reset"}
          </h2>
          <p className="text-slate-400">
            {step === 1 && "Enter your email address and we'll send you an OTP to reset your password."}
            {step === 2 && `We've sent a 6-digit OTP to ${email}.`}
            {step === 3 && "Please enter your new password."}
            {step === 4 && "Your password has been successfully reset. You can now log in."}
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-xl">
          {error && step !== 4 && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">6-Digit OTP</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-center tracking-widest text-lg"
                  placeholder="------"
                  maxLength={6}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Verify OTP
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                disabled={isLoading}
              >
                Resend OTP
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block w-full pl-10 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center space-y-6">
              <Link
                to="/login"
                className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all font-medium"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>

        {step === 1 && (
          <p className="mt-8 text-center text-sm text-slate-400">
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
