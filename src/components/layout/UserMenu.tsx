import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User as UserIcon, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { User, UserRole } from '../../types';

interface UserMenuProps {
  user: User | null;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuthStore();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get dashboard link based on user role
  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    
    switch (user.role) {
      case UserRole.DONOR:
        return '/donor/dashboard';
      case UserRole.STUDENT:
        return '/student/dashboard';
      case UserRole.NGO:
        return '/ngo/dashboard';
      case UserRole.MONITORING_AGENT:
        return '/monitor/dashboard';
      case UserRole.ADMIN:
        return '/admin';
      default:
        return '/dashboard';
    }
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-primary-500 focus:outline-none"
        onClick={toggleMenu}
      >
        <span>{user?.name || 'User'}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          
          <Link
            to={getDashboardLink()}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-500 flex items-center space-x-2"
            onClick={() => setIsOpen(false)}
          >
            <UserIcon className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          
          <Link
            to="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-500 flex items-center space-x-2"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-error-600 flex items-center space-x-2"
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;