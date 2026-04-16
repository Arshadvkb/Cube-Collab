import React from 'react';
import SEO from '../components/SEO';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing_Page = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 flex flex-col">
      <SEO 
        title="Pricing" 
        description="Check out Cube Collab's pricing. Currently 100% free while in Beta! Get unlimited workspaces and collaborators today." 
      />
      <PublicNavbar />
      <main className="flex-1">

        <section className="container mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto mb-20 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 dark:bg-green-900/30 dark:border-green-800 text-green-600 dark:text-green-400 text-sm font-semibold mb-6 shadow-sm">
              <Sparkles size={16} /> Beta Phase
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-500 to-emerald-600">100% Free</span> right now.
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400">Enjoy all premium features without paying a dime while we are in Beta.</p>
          </div>
          
          <div className="max-w-xl mx-auto">
            <div className="p-8 rounded-3xl border border-green-500 shadow-2xl bg-white dark:bg-gray-900 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
              <h3 className="text-3xl font-bold mb-2">Early Adopter</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">Get full access to all features forever just by joining early.</p>
              
              <div className="text-6xl font-extrabold mb-8 text-gray-900 dark:text-white">$0<span className="text-xl text-gray-500 font-normal">/forever</span></div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  'Unlimited Workspaces', 
                  'Unlimited Collaborators', 
                  'Real-time Live Editing', 
                  'Advanced Version History',
                  'Enterprise-grade Security'
                ].map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-lg">
                    <CheckCircle2 className="text-green-500 shrink-0" size={24}/>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => navigate('/register')}
                className="w-full py-5 rounded-full font-bold text-lg bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30 transition-all hover:-translate-y-1"
              >
                Create your free account
              </button>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
};

export default Pricing_Page;
