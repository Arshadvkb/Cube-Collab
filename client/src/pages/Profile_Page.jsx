import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from '../components/Sidebar';
import { User, Mail, Calendar, Settings, CheckCircle, AlertCircle, X, Edit2, Save, Camera } from 'lucide-react';

const Profile_Page = () => {
  const { user, isAuthenticated, isLoading, checkAuth, sendVerificationEmail, verifyEmail, updateProfile } = useAuthStore();
  const navigate = useNavigate();
  
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpMessage, setOtpMessage] = useState('');

  // Edit Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [updateError, setUpdateError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSendVerification = async () => {
    try {
      setOtpError('');
      setOtpMessage('Sending verification email...');
      await sendVerificationEmail(user._id);
      setOtpMessage('Verification email sent. Please check your inbox.');
      setShowOtpModal(true);
    } catch (error) {
       setOtpError(useAuthStore.getState().error || 'Failed to send verification email');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setOtpError('');
      setOtpMessage('Verifying...');
      await verifyEmail(user.email, parseInt(otp));
      setShowOtpModal(false);
      setOtp('');
      checkAuth(); // refresh user data
    } catch (error) {
      setOtpError(useAuthStore.getState().error || 'Invalid OTP');
      setOtpMessage('');
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditForm({ name: user?.name || '', email: user?.email || '' });
    setPreviewImage(user?.profileImage || user?.profilePic || user?.avatar || null);
    setSelectedImage(null);
    setUpdateError('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedImage(null);
    setPreviewImage(null);
    setUpdateError('');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    try {
      setUpdateError('');
      const formData = new FormData();
      formData.append('name', editForm.name);
      formData.append('email', editForm.email);
      if (selectedImage) {
        formData.append('avatar', selectedImage);
      }
      
      await updateProfile(user._id, formData);
      setIsEditing(false);
    } catch (error) {
      setUpdateError(useAuthStore.getState().error || 'Failed to update profile');
    }
  };

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
              <div className="absolute -top-12 left-8 border-4 border-white h-24 w-24 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-md overflow-hidden shrink-0 group">
                {isEditing ? (
                  <>
                    <img 
                      src={previewImage || user?.profileImage || user?.profilePic || user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'U'}`} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                    />
                    <div 
                      className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                    />
                  </>
                ) : (
                  user?.profileImage || user?.profilePic || user?.avatar ? (
                    <img src={user.profileImage || user.profilePic || user.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user?.name?.charAt(0)?.toUpperCase() || 'U'
                  )
                )}
              </div>
              
              <div className="pt-16 sm:pt-14 pb-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-blue-600 outline-none bg-transparent px-1 py-0.5 w-full sm:w-auto"
                        placeholder="Your Name"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-gray-900">{user?.name || 'User Name'}</h2>
                    )}
                    <p className="text-gray-500 flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4" />
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {user?.isVerified ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    ) : (
                      <button
                        onClick={handleSendVerification}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium bg-linear-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 transition-colors shadow-sm cursor-pointer"
                        disabled={isEditing}
                      >
                        <AlertCircle className="w-4 h-4" />
                        Verify Email
                      </button>
                    )}
                    
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                          title="Cancel"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          disabled={isLoading}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm disabled:opacity-70 cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                          <span className="text-sm font-medium">Save</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleEditClick}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors shadow-sm cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Edit Profile</span>
                      </button>
                    )}
                  </div>
                </div>
                {updateError && (
                  <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 w-full">
                    {updateError}
                  </p>
                )}
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
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 font-medium"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900 font-medium">{user?.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 font-medium"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900 font-medium">{user?.email}</p>
                      )}
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

        {/* OTP Modal */}
        {showOtpModal && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Verify Email</h3>
                <button
                  onClick={() => setShowOtpModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-6">
                  {otpMessage || 'Please enter the 6-digit OTP sent to your email address.'}
                </p>
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      OTP Code
                    </label>
                    <input
                      type="number"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="e.g. 123456"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {otpError && (
                    <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                      {otpError}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-blue-600 to-indigo-700 text-white font-medium py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-sm focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 cursor-pointer"
                  >
                    Verify
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile_Page;
