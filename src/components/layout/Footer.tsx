import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-6 w-6 text-primary-500" />
              <span className="font-bold text-xl text-primary-500">EduFund Connect</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Bridging donors, students, NGOs, and schools with transparency and accountability
              at the core of every transaction.
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <span className="text-sm text-gray-600">123 Education Drive, Global City</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <a href="mailto:info@edufundconnect.com" className="text-sm text-gray-600 hover:text-primary-500">
                  info@edufundconnect.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Students', href: '/students' },
                { name: 'Success Stories', href: '/success-stories' },
                { name: 'Contact', href: '/contact' },
                { name: 'FAQ', href: '/faq' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-gray-600 hover:text-primary-500">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { name: 'How It Works', href: '/how-it-works' },
                { name: 'Monitoring Process', href: '/monitoring-process' },
                { name: 'Transparency Report', href: '/transparency-report' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Privacy Policy', href: '/privacy' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-gray-600 hover:text-primary-500">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to our newsletter to receive updates on new students, projects, and success stories.
            </p>
            <form className="space-y-2">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="form-input text-sm w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full btn btn-primary py-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="divider mt-8 mb-6"></div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} EduFund Connect. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
              <a
                key={social}
                href={`https://${social}.com`}
                className="text-gray-400 hover:text-primary-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{social}</span>
                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-semibold uppercase">{social.charAt(0)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;