import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from '../components/Sidebar';
import { User, Mail, Calendar, Settings } from 'lucide-react';

const Profile_Page = () => {
  const { user, isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-500 mt-1">Manage your personal information and settings.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-700"></div>
            
            <div className="px-8 pb-8 relative">
              <div className="absolute -top-12 border-4 border-white h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700 shadow-md">
                {user?.name?.charAt(0) || 'U'}
              </div>
              
              <div className="mt-16 sm:mt-14 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">{user?.name || 'User Name'}</h2>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {user?.email || 'user@example.com'}
                </p>
              </div>

              <div className="py-6 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-400" />
                    Account Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Full Name</label>
                      <p className="mt-1 text-gray-900 font-medium">{user?.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email Address</label>
                      <p className="mt-1 text-gray-900 font-medium">{user?.email}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gray-400" />
                    Preferences
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Account Role</label>
                      <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user?.role || 'Member'}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Joined Date</label>
                      <p className="mt-1 text-gray-900 font-medium flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile_Page;
