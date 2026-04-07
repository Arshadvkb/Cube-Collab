import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const Careers_Page = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white">
              Join our <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">Mission</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-16">
              Help us define the future of written collaboration. We are a passionate remote-first team building tools for collective intelligence.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-12 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl text-gray-500">💼</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">No open positions right now</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                We aren't actively hiring at the moment, but we're always excited to connect with talented people. Feel free to check back later or drop us a line at our contact page!
              </p>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
};

export default Careers_Page;
