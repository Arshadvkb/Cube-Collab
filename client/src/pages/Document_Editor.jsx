import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill';
import QuillCursors from 'quill-cursors';
import 'react-quill/dist/quill.snow.css';
import 'quill-cursors/css';
import socket from '../lib/socket_client';
import { useAuthStore } from '../store/useAuthStore';

// Register the cursors module with Quill safely
if (Quill && !Quill.imports['modules/cursors']) {
  Quill.register('modules/cursors', QuillCursors);
}

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
  cursors: {
    transformOnTextChange: true,
  },
};

// Generate consistent cursor colors based on the username
const stringToColor = (str) => {
  if (!str) return '#10b981'; // default emerald color
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

const Document_Editor = () => {
  const { id } = useParams(); // ✅ dynamic ID
  const quillRef = useRef(null);
  
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  const [value, setValue] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Saved');

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Compute cursor color once based on current user
  const myColor = useMemo(() => stringToColor(user?.name || user?._id || 'Anonymous'), [user]);

  useEffect(() => {
    if (!id) return;

    console.log('Joining doc:', id);

    socket.emit('join-document', id);

    // Load document
    socket.on('load-document', (doc) => {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        editor.setContents(doc);
        editor.enable();
      }
      setLoaded(true);
    });

    // Receive changes
    socket.on('receive-changes', (delta) => {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        editor.updateContents(delta);
      }
    });

    // Receive cursor
    socket.on('receive-cursor', ({ id: cursorId, name, color, range }) => {
      if (!quillRef.current) return;
      
      const editor = quillRef.current.getEditor();
      const cursors = editor.getModule('cursors');
      if (!cursors) return;

      if (!range) {
        try {
           cursors.removeCursor(cursorId);
        } catch (e) {}
      } else {
        try {
            if (!cursors.cursors()[cursorId]) {
              cursors.createCursor(cursorId, name, color);
            }
            cursors.moveCursor(cursorId, range);
            cursors.toggleFlag(cursorId, true); // Keep the name visible
        } catch (e) {}
      }
    });

    return () => {
      socket.off('load-document');
      socket.off('receive-changes');
      socket.off('receive-cursor');
    };
  }, [id]);

  // Helper to sync cursor
  const syncMyCursor = (selection) => {
    if (!selection) return;
    socket.emit('cursor-change', {
      id: user?._id || socket.id,
      name: user?.name || 'Anonymous',
      color: myColor,
      range: selection,
    });
  };

  // Send changes
  const handleChange = (content, delta, source, editor) => {
    setValue(content);

    if (source !== 'user') return;
    
    setSaveStatus('Unsaved modifications...');
    socket.emit('send-changes', delta);
    
    const selection = editor.getSelection();
    if (selection) syncMyCursor(selection);
  };

  // Send cursor position
  const handleSelectionChange = (selection, source, editor) => {
    if (source !== 'user') return;
    syncMyCursor(selection);
  };

  const handleManualSave = () => {
    if (!loaded || !quillRef.current) return;
    setSaveStatus('Saving...');
    const editor = quillRef.current.getEditor();
    socket.emit('save-document', editor.getContents());
    setTimeout(() => setSaveStatus('Saved'), 500); // Small delay for UX feeling
  };

  // Auto save
  useEffect(() => {
    if (!loaded) return;

    const interval = setInterval(() => {
      if (saveStatus !== 'Saved') {
        const editor = quillRef.current.getEditor();
        socket.emit('save-document', editor.getContents());
        setSaveStatus('Saved');
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [loaded, saveStatus]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Cube Collab Editor</span>
          <span className={`text-sm font-medium px-2 py-1 rounded ${
            saveStatus === 'Saved' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
            saveStatus === 'Saving...' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
            'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}>
            {saveStatus}
          </span>
        </div>
        
        <button 
          onClick={handleManualSave}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all flex items-center gap-2"
          disabled={!loaded}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          Save
        </button>
      </div>
      
      <div className="flex-1 p-4 md:p-6 pb-20 items-center justify-center overflow-auto flex max-h-[calc(100vh-60px)]">
         <div className="w-full max-w-5xl h-full bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={value}
              onChange={handleChange}
              onChangeSelection={handleSelectionChange}
              modules={modules}
              className="h-[90%] w-full dark:text-white"
            />
         </div>
      </div>
    </div>
  );
};

export default Document_Editor;
