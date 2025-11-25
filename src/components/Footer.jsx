import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-text-dark text-gray-400 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center text-2xl font-bold text-white mb-4">
              <Recycle className="text-primary mr-2" />
              <span>ReFlow.AI</span>
            </Link>
            <p className="max-w-sm">Transforming river pollution into measurable environmental and economic outcomes.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/#how-it-works" className="hover:text-white">How It Works</a></li>
              <li><Link to="/modules/partner-dashboard" className="hover:text-white">Partner Dashboard</Link></li>
              <li><Link to="/complaint" className="hover:text-white">Raise Complaint</Link></li>
              <li><a href="/#team" className="hover:text-white">Team</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin /></a>
              <a href="#" aria-label="YouTube" className="hover:text-white"><Youtube /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ReFlow.AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
