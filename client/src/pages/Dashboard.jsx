import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuthStore } from '../store/useAuthStore';

// The Page is a route-level view that composes different UI components
const Dashboard = () => {
  const { user, isAuthenticated, checkAuth, isLoading } = useAuthStore();

  // On page load, verify user auth status
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Component strictly imported and rendered */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white px-8 py-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-500 mt-1">Here is the overview of your workspace.</p>
        </header>

        <section className="p-8">
          {/* Dashboard Widgets/Cards would go here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-700">Total Projects</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-700">Active Tasks</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">24</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-700">Team Members</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">8</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
