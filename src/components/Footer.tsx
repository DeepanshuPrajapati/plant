import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-emerald-700 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AyurLeaf AI</h3>
            <p className="text-emerald-200">
              Empowering traditional medicine through artificial intelligence.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-emerald-200">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/upload" className="hover:text-white">Upload Plant</a></li>
              <li><a href="/chatbot" className="hover:text-white">AI Chatbot</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-emerald-200 hover:text-white">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-emerald-200 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-emerald-200 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-emerald-600 text-center text-emerald-200">
          <p>© 2024 AyurLeaf AI. All rights reserved.</p>
          <p className="mt-2">Powered by Gemini API</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;