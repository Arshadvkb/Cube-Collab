import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuthStore } from '../store/useAuthStore';
import { useDocumentStore } from '../store/useDocumentStore';
import { PlusCircle, FileText, Edit, Eye, Delete, Trash, Download, DownloadIcon } from 'lucide-react';

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white dark:bg-gray-900 px-8 py-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Welcome back, {user?.name || "User"}!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Here are your documents.
            </p>
          </div>
          <button
            onClick={() => navigate("/document/new")}
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
                <div
                  key={doc._id}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                      <FileText size={24} />
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${doc.isPublic ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
                    >
                      {doc.isPublic ? "Public" : "Private"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1 mb-2">
                    {doc.title}
                  </h3>
                  <div className="mt-auto pt-4 flex gap-3 border-t border-gray-50 dark:border-gray-800">
                    <button
                      onClick={() => navigate(`/document/view/${doc._id}`)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Eye size={16} /> View
                    </button>
                    <button
                      onClick={() => navigate(`/document/edit/${doc._id}`)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Edit size={16} /> Edit
                    </button>
                   
                    <button className="w-10 flex-1 flex items-center justify-center gap-2 py-2 text-red-500 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium transition-colors">
                      <Trash size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-full text-gray-400 dark:text-gray-500 mb-4">
                <FileText size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                No documents found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
                You haven't created any documents yet. Start by creating a new
                document to organize your ideas.
              </p>
              <button
                onClick={() => navigate("/document/new")}
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
