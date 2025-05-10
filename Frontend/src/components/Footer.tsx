
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="blockchain-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-6 w-6 text-blockchain-blue" />
              <span className="font-bold text-xl text-blockchain-dark">CertChain</span>
            </div>
            <p className="text-sm text-blockchain-medium">
              Secure blockchain-based academic credential verification platform for institutions, students, and employers.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-blockchain-dark mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">About</Link></li>
              <li><Link to="/how-it-works" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">How It Works</Link></li>
              <li><Link to="/verify" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">Verify Certificate</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-blockchain-dark mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">FAQ</Link></li>
              <li><a href="#" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">Documentation</a></li>
              <li><a href="#" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">API</a></li>
              <li><a href="#" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">Blockchain Explorer</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-blockchain-dark mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-blockchain-medium">
          <p>© {new Date().getFullYear()} CertChain. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-blockchain-blue transition-colors">Twitter</a>
            <a href="#" className="hover:text-blockchain-blue transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-blockchain-blue transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
