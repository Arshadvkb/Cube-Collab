import React from 'react';
import { useNavigate } from 'react-router-dom';

const PublicFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 pt-16 pb-8 text-gray-400">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
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
                <a onClick={() => navigate('/features')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Features
                </a>
              </li>
              <li>
                <a onClick={() => navigate('/pricing')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Pricing
                </a>
              </li>
              <li>
                <a onClick={() => navigate('/security')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a onClick={() => navigate('/about')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  About Us
                </a>
              </li>
              <li>
                <a onClick={() => navigate('/careers')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Careers
                </a>
              </li>
              <li>
                <a onClick={() => navigate('/contact')} className="hover:text-blue-400 transition-colors cursor-pointer">
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
            <a onClick={() => navigate('/privacy')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </a>
            <a onClick={() => navigate('/terms')} className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
