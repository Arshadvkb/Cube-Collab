import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const Contact_Page = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white text-center">
              Let's <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">Talk</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 text-center">
              Have questions or want to learn more? Reach out to our team.
            </p>
            
            <form className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input type="text" className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl outline-hidden focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input type="text" className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl outline-hidden focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="Doe" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl outline-hidden focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="john@company.com" />
              </div>
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea rows="5" className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl outline-hidden focus:ring-2 focus:ring-blue-500 transition-shadow resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-500/30">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
};

export default Contact_Page;
