import React from 'react';
import SEO from '../components/SEO';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const About_Page = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 flex flex-col">
      <SEO 
        title="About Us" 
        description="Learn about Cube Collab's mission to make collaboration frictionless and information beautiful." 
      />
      <PublicNavbar />

      <main className="flex-1">
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white">
              About <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">Cube Collab</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed">
              We started with a simple belief: collaboration should be frictionless. Information is beautiful when it flows easily between minds, unbound by complex interfaces or slow software. Cube Collab was built to be the single hub for your team's collective intelligence.
            </p>
            <div className="rounded-3xl overflow-hidden h-96 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 relative shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-t from-gray-900/40 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-2xl tracking-widest opacity-50 uppercase">Team Workspace</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
};

export default About_Page;
