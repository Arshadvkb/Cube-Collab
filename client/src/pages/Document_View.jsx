import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useDocumentStore } from '../store/useDocumentStore';
import { useAuthStore } from '../store/useAuthStore';
import { ArrowLeft, Edit } from 'lucide-react';
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
        setError('Document not found or you don\'t have access.');
      }
      setIsLoading(false);
    };
    
    init();
  }, [checkAuth, id, getDocumentById, fetchDocuments]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading document...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full">
        <header className="bg-white px-8 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${document?.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
              {document?.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
          <button 
            onClick={() => navigate(`/document/edit/${id}`)}
            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-5 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Edit size={18} />
            Edit Document
          </button>
        </header>

        <section className="p-8 mx-auto w-full max-w-4xl">
          {error ? (
            <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 text-center">
              {error}
              <button 
                onClick={() => navigate('/dashboard')}
                className="mt-4 px-4 py-2 bg-white text-red-600 rounded-lg shadow-sm block mx-auto font-medium"
              >
                Return to Dashboard
              </button>
            </div>
          ) : (
            <div className="bg-white p-10 md:p-14 rounded-xl shadow-sm border border-gray-200">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b border-gray-100 pb-6">
                {document?.title}
              </h1>
              <div 
                className="ql-editor p-0 opacity-90 prose prose-blue max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: document?.content || '<p class="text-gray-400 italic">No content</p>' }}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Document_View;
