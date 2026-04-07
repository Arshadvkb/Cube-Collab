import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const Privacy_Page = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto prose dark:prose-invert prose-blue">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-gray-500 mb-8">Last updated: April 7, 2026</p>
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p>
                At Cube Collab, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our service.
              </p>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Information We Collect</h2>
              <p>
                We may collect personal information that you provide to us, including your name, email address, and any content you create or share within our collaborative workspaces.
              </p>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">How We Use Your Information</h2>
              <p>
                We use the information we collect primarily to provide, maintain, and improve our services, as well as to communicate with you, process your transactions, and personalize your experience.
              </p>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
};

export default Privacy_Page;
