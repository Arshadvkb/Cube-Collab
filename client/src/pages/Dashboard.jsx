import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuthStore } from '../store/useAuthStore';
import { useDocumentStore } from '../store/useDocumentStore';
import { PlusCircle, FileText, Edit, Eye } from 'lucide-react';

const Dashboard = () => {
  const { user, checkAuth, isLoading: isAuthLoading } = useAuthStore();
  const { documents, fetchDocuments, isLoading: isDocLoading } = useDocumentStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchDocuments();
  }, [checkAuth, fetchDocuments]);

  if (isAuthLoading || isDocLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white px-8 py-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-gray-500 mt-1">Here are your documents.</p>
          </div>
          <button 
            onClick={() => navigate('/document/new')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
          >
            <PlusCircle size={20} />
            Create Document
          </button>
        </header>

        <section className="p-8">
          {documents && documents.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {documents.map((doc) => (
               <div key={doc._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full">
                 <div className="flex items-start justify-between mb-4">
                   <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                     <FileText size={24} />
                   </div>
                   <span className={`text-xs px-2 py-1 rounded-full font-medium ${doc.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                     {doc.isPublic ? 'Public' : 'Private'}
                   </span>
                 </div>
                 <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-2">{doc.title}</h3>
                 <div className="mt-auto pt-4 flex gap-3 border-t border-gray-50">
                   <button 
                     onClick={() => navigate(`/document/view/${doc._id}`)}
                     className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                   >
                     <Eye size={16} /> View
                   </button>
                   <button 
                     onClick={() => navigate(`/document/edit/${doc._id}`)}
                     className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors"
                   >
                     <Edit size={16} /> Edit
                   </button>
                 </div>
               </div>
             ))}
           </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <div className="p-4 bg-gray-50 rounded-full text-gray-400 mb-4">
                <FileText size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No documents found</h3>
              <p className="text-gray-500 mb-6 text-center max-w-md">You haven't created any documents yet. Start by creating a new document to organize your ideas.</p>
              <button 
                onClick={() => navigate('/document/new')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
              >
                <PlusCircle size={20} />
                Create First Document
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
