import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  FileText,
  Users,
  Shield,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const Home_Page = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 selection:bg-blue-100 dark:selection:bg-blue-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
            C
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            Cube Collab
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <a
            href="#features"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            How it Works
          </a>
          <a
            href="#testimonials"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Testimonials
          </a>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium px-4 py-2 transition-colors"
          >
            Log in
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Cube Collab 2.0 is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-gray-900 dark:text-white">
            Collaborate on documents <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              at the speed of thought
            </span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The simplest, most powerful way to write, plan, and organize
            together. Build your team's collective brain with beautiful, living
            documents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1"
            >
              Get Started for Free
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:-translate-y-1"
            >
              Log in to Account
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" /> No credit
              card required
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" /> 14-day free
              trial
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" /> Cancel
              anytime
            </span>
          </div>
        </div>
      </section>

      {/* Demo Dashboard Image placeholder area */}
      <section className="container mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-gray-200 bg-white/50 backdrop-blur shadow-2xl overflow-hidden max-w-5xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
          <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="mx-auto w-1/3 h-6 bg-white rounded flex items-center justify-center text-xs text-gray-400 border border-gray-200">
              app.cubecollab.com
            </div>
          </div>
          <div className="h-[400px] md:h-[600px] bg-gray-50 flex">
            {/* Fake Sidebar */}
            <div className="w-64 border-r border-gray-200 hidden md:block p-4">
              <div className="h-8 w-3/4 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
              </div>
            </div>
            {/* Fake Main Content */}
            <div className="flex-1 p-8">
              <div className="h-10 w-1/3 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded mb-12"></div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-32 bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col justify-between"
                  >
                    <div className="h-8 w-8 bg-blue-100 rounded-lg"></div>
                    <div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 dark:bg-gray-900/50 py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to work better
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Powerful features hidden behind a beautiful, minimal interface
              that gets out of your way.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <FileText size={24} className="text-blue-600" />,
                title: 'Rich Document Editing',
                description:
                  'Write beautifully formulated documents with lists, headers, code blocks, and embedded media using our intuitive rich text editor.',
              },
              {
                icon: <Users size={24} className="text-purple-600" />,
                title: 'Real-time Collaboration',
                description:
                  'Work together seamlessly. Share your documents instantly or keep them private to your own workspace as you develop your ideas.',
              },
              {
                icon: <Layers size={24} className="text-indigo-600" />,
                title: 'Organized Workspace',
                description:
                  'Keep all your thoughts, projects, and notes elegantly organized in one dashboard. Never lose track of an important document again.',
              },
              {
                icon: <Shield size={24} className="text-green-600" />,
                title: 'Secure & Private',
                description:
                  'Your data belongs to you. We use industry-standard encryption to ensure your private documents remain exactly that—private.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of teams who are already using Cube Collab to
            centralize their knowledge and collaborate faster.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold transition-transform hover:scale-105 shadow-xl shadow-blue-900/20"
          >
            Create Your Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 pt-16 pb-8 text-gray-400">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  C
                </div>
                <span className="text-xl font-bold text-white">
                  Cube Collab
                </span>
              </div>
              <p className="max-w-sm">
                Empowering teams to create, organize, and collaborate on
                knowledge beautifully.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} Cube Collab. All rights
              reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home_Page;
