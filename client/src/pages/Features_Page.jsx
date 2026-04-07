import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import { Layers, FileText, Users, Shield } from 'lucide-react';

const Features_Page = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="container mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto mb-20 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white">
              Powerful <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">Features</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400">Everything you need to boost your team's productivity and collaborate effectively.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FileText size={32} className="text-blue-500" />, title: 'Rich Text', desc: 'Advanced formatting options.' },
              { icon: <Users size={32} className="text-purple-500" />, title: 'Live Collab', desc: 'Edit together in real-time.' },
              { icon: <Layers size={32} className="text-indigo-500" />, title: 'Versioning', desc: 'Never lose your progress.' },
              { icon: <Shield size={32} className="text-green-500" />, title: 'Secure', desc: 'Enterprise-grade security.' }
            ].map((f, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
};

export default Features_Page;
