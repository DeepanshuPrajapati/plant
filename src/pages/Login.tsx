import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, User, Lock, Mail, KeyRound } from 'lucide-react';

function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const { login, verifyOTP, resendOTP, pendingEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!showOTPInput) {
      // Initial login step
      if (!username || !email) {
        setError('Please fill in all fields');
        return;
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }

      login(username, email);
      setShowOTPInput(true);
    } else {
      // OTP verification step
      if (!otp) {
        setError('Please enter the OTP');
        return;
      }

      if (verifyOTP(otp)) {
        navigate('/');
      } else {
        setError('Invalid OTP');
      }
    }
  };

  const handleResendOTP = () => {
    resendOTP();
    setError('New OTP has been sent to your email');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">Welcome Back</h1>
        <p className="text-gray-600">
          {showOTPInput 
            ? `Enter the OTP sent to ${pendingEmail}`
            : 'Sign in to access your AyurLeaf AI account'}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          {!showOTPInput ? (
            <>
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
              </div>
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-sm text-emerald-600 hover:text-emerald-500 mt-2"
              >
                Resend OTP
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <LogIn className="h-5 w-5" />
            <span>{showOTPInput ? 'Verify OTP' : 'Send OTP'}</span>
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>For demo purposes, the OTP will be logged to the console.</p>
      </div>
    </div>
  );
}

export default Login;