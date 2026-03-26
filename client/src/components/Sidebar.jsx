import React from 'react';
import { Home, Settings, Users, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';

// Sidebar component is reusable and strictly handles its own isolated UI and basic logic
const Sidebar = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: Home, route: '/dashboard' },
    { label: 'Profile', icon: User, route: '/profile' },
    { label: 'Team', icon: Users, route: '/team' },
    { label: 'Settings', icon: Settings, route: '/settings' },
  ];

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white flex flex-col justify-between border-r border-gray-800 transition-all duration-300">
      <div>
        {/* App Logo/Header */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold tracking-tight text-blue-400">
            CUBE<span className="text-white">COLLAB</span>
          </h2>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.route}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors group cursor-pointer"
              >
                <Icon className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile / Logout Section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shrink-0 overflow-hidden">
            {user?.profileImage || user?.profilePic || user?.avatar ? (
              <img src={user.profileImage || user.profilePic || user.avatar} alt="User" className="w-full h-full object-cover" />
            ) : (
              user?.name?.charAt(0)?.toUpperCase() || 'U'
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{user?.name || 'Guest User'}</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
