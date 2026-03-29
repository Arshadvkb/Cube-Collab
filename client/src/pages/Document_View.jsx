import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useDocumentStore } from '../store/useDocumentStore';
import { useAuthStore } from '../store/useAuthStore';
import { ArrowLeft, Edit, User } from 'lucide-react';
// Import Quill CSS for block quote, lists rendering accurately
import 'react-quill/dist/quill.snow.css';

const Document_View = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { checkAuth } = useAuthStore();
  const { getDocumentById, fetchDocuments } = useDocumentStore();

  const [document, setDocument] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      await fetchDocuments();

      const doc = getDocumentById(id);
      if (doc) {
        setDocument(doc);
      } else {
        setError("Document not found or you don't have access.");
      }
      setIsLoading(false);
    };

    init();
  }, [checkAuth, id, getDocumentById, fetchDocuments]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">
          Loading document...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full">
        <header className="bg-white dark:bg-gray-900 px-8 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${document?.isPublic ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
            >
              {document?.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 px-5 py-2 rounded-lg font-medium transition-colors shadow-sm">
              <User />
              Add Collaborator
            </button>
            <button
              onClick={() => navigate(`/document/edit/${id}`)}
              className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 px-5 py-2 rounded-lg font-medium transition-colors shadow-sm"
            >
              <Edit size={18} />
              Edit Document
            </button>
          </div>
        </header>

        <section className="p-8 mx-auto w-full max-w-4xl">
          {error ? (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-xl border border-red-100 dark:border-red-900/50 text-center">
              {error}
              <button
                onClick={() => navigate('/dashboard')}
                className="mt-4 px-4 py-2 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 rounded-lg shadow-sm block mx-auto font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 p-10 md:p-14 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
                {document?.title}
              </h1>
              <div
                className="ql-editor p-0 opacity-90 prose prose-blue dark:prose-invert max-w-none text-gray-800 dark:text-gray-200"
                dangerouslySetInnerHTML={{
                  __html:
                    (typeof document?.content === 'string'
                      ? document.content
                      : '') ||
                    '<p class="text-gray-400 dark:text-gray-500 italic">No content</p>',
                }}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Document_View;
