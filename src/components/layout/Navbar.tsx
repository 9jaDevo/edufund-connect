import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, LogIn } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Button from '../ui/Button';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Students', href: '/students' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary-500" />
            <span className="font-bold text-xl text-primary-500">EduFund Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                    location.pathname === link.href ? 'text-primary-500' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {isAuthenticated ? (
              <UserMenu user={user} />
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <LogIn className="h-4 w-4" />
                    <span>Log in</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-50"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} py-2 space-y-1`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.href 
                ? 'text-primary-500 bg-gray-50' 
                : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <div className="px-3 py-2">
              <Link 
                to="/dashboard" 
                className="block py-2 text-base font-medium text-primary-500 hover:bg-gray-50 hover:text-primary-600 rounded-md"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <button
                className="block w-full text-left py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500 rounded-md"
                onClick={() => {
                  closeMenu();
                  useAuthStore.getState().logout();
                }}
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="px-3 py-3 space-y-2">
              <Link 
                to="/login" 
                className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={closeMenu}
              >
                Log in
              </Link>
              <Link 
                to="/register"
                className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-500 hover:bg-primary-600"
                onClick={closeMenu}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;