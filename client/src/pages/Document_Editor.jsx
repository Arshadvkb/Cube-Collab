import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Sidebar from '../components/Sidebar';
import { useDocumentStore } from '../store/useDocumentStore';
import { useAuthStore } from '../store/useAuthStore';
import { ArrowLeft, Save } from 'lucide-react';

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image', 'code-block'],
    ['clean']
  ],
};

const Document_Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const { checkAuth } = useAuthStore();
  const { addDocument, updateDocument, getDocumentById, fetchDocuments } = useDocumentStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
    
    // If editing, populate the fields
    if (isEditing) {
      const loadDoc = async () => {
        // Ensure documents are loaded
        await fetchDocuments();
        const doc = getDocumentById(id);
        
        if (doc) {
          setTitle(doc.title);
          setContent(typeof doc.content === 'object' ? '' : (doc.content || ''));
          setIsPublic(doc.isPublic || false);
        } else {
          setError('Document not found or you don\'t have access.');
        }
      };
      loadDoc();
    }
  }, [checkAuth, id, isEditing, getDocumentById, fetchDocuments]);

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    setIsSaving(true);
    setError('');
    
    try {
      if (isEditing) {
        await updateDocument(id, { title, content, isPublic });
      } else {
        await addDocument({ title, content, isPublic });
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'Failed to save document');
    } finally {
      setIsSaving(false);
    }
  };



  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden font-sans">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white dark:bg-gray-900 px-8 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              {isEditing ? 'Edit Document' : 'Create New Document'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {isSaving ? 'Saving...' : 'Save Document'}
            </button>
          </div>
        </header>

        <section className="p-8 max-w-5xl mx-auto w-full flex-1 flex flex-col">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 flex-1 flex flex-col">
            <div className="mb-6 flex gap-6 items-start">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Document Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a descriptive title..."
                  className="w-full text-2xl font-bold px-4 py-3 bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:font-normal placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
              <div className="pt-7">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 dark:border-gray-700 bg-transparent focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Make Public</span>
                </label>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col h-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-white dark-quill">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                modules={quillModules}
                className="flex-1 h-full flex flex-col document-editor"
                placeholder="Start writing your document here..."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Document_Editor;
