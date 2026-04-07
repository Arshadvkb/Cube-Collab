import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const Terms_Page = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto prose dark:prose-invert prose-blue">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <p className="text-gray-500 mb-8">Last updated: April 7, 2026</p>
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p>
                Please read these Terms of Service completely using the Cube Collab platform. By using the site, you imply that you have read and accepted these terms.
              </p>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Access and Use</h2>
              <p>
                We grant you a limited, non-exclusive, non-transferable license to access and use our platform for your personal or internal business purposes, subject to these Terms.
              </p>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">User Content</h2>
              <p>
                You retain all rights to any content you submit, post or display on or through the platform. By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, and display that content only to provide the service to you.
              </p>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
};

export default Terms_Page;
