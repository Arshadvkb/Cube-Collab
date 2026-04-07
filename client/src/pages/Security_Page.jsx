import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import { Shield } from 'lucide-react';

const Security_Page = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <Shield size={48} className="text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white">
              Enterprise-Grade <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-teal-600">Security</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-12">Your data is yours. We implement industry-leading security practices to ensure your information stays protected at all times.</p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-3">End-to-End Encryption</h3>
                <p className="text-gray-500 dark:text-gray-400">All documents are encrypted in transit and at rest using AES-256 standard encryption.</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-3">Compliance</h3>
                <p className="text-gray-500 dark:text-gray-400">We continuously audit our systems and comply with GDPR, SOC2, and other global frameworks.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
};

export default Security_Page;
