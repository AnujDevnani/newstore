import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import Logo from '../UI/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-slate-400 mt-4">
              Premium vintage football jerseys featuring iconic Real Madrid kits and legendary club collections.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/catalog" className="text-slate-400 hover:text-accent transition-colors">All Jerseys</Link></li>
              <li><Link to="/catalog?club=Real Madrid" className="text-slate-400 hover:text-accent transition-colors">Real Madrid</Link></li>
              <li><Link to="/catalog?club=Barcelona" className="text-slate-400 hover:text-accent transition-colors">Barcelona</Link></li>
              <li><Link to="/catalog?club=Manchester United" className="text-slate-400 hover:text-accent transition-colors">Manchester United</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Info</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-slate-400 hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#faq" className="text-slate-400 hover:text-accent transition-colors">FAQ</a></li>
              <li><a href="#shipping" className="text-slate-400 hover:text-accent transition-colors">Shipping</a></li>
              <li><a href="#terms" className="text-slate-400 hover:text-accent transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          <div id="contact">
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-slate-400 mb-2">Have questions or custom requests?</p>
            <a href="mailto:anujdevnani77@gmail.com" className="flex items-center text-accent hover:underline">
              <Mail size={18} className="mr-2" />
              anujdevnani77@gmail.com  
            </a>
            <p className="text-slate-400 mt-4"> Click on order now above Or DM on whatsapp +916269064255 OR DM on Instagram <a href="https://instagram.com/offside1940" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">@offside1940</a> for orders</p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} offside1940. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;