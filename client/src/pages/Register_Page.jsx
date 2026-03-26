import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Mail, Lock, User, ArrowRight, AlertCircle, Loader2, Camera } from 'lucide-react';

const Register_Page = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', file: null });
  const [preview, setPreview] = useState(null);
  
  const { register, isAuthenticated, isLoading, error, user } = useAuthStore();
  const navigate = useNavigate();

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('password', formData.password);
    if (formData.file) {
      submitData.append('file', formData.file);
    }
    await register(submitData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 font-sans relative overflow-hidden py-10">
      {/* Background decorations */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/20 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md p-8 bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl relative z-10 transition-all duration-300 hover:border-gray-700">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Create Account
          </h2>
          <p className="text-gray-400">Join Cube Collab today</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-2">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-800 border border-gray-600 group-hover:border-blue-500 transition-colors flex items-center justify-center relative shadow-inner">
                {preview ? (
                  <img src={preview} alt="Profile preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-gray-500 group-hover:text-blue-400 transition-colors" />
                )}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <input 
                type="file" 
                name="file"
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={handleFileChange}
              />
            </div>
            <p className="text-xs text-gray-500 mt-3 font-medium">Upload profile picture (optional)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                <User className="h-5 w-5" />
              </div>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register_Page;