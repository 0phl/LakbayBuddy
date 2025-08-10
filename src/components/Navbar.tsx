import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, CalendarIcon, WalletIcon } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      {/* Top header with just the app name */}
      <header className="bg-gradient-to-r from-[#0055CC] via-[#0066CC] to-[#0077DD] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-start md:justify-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center space-x-3">
                <img src="/src/assets/images/logo.svg" alt="LakbayBuddy Logo" className="w-10 h-10" />
                <img 
                  src="/src/assets/images/lakbay-text.svg" 
                  alt="LakbayBuddy" 
                  className="h-10 md:h-12 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom navigation - visible on all screen sizes */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3 z-50 shadow-lg">
        <Link 
          to="/" 
          className={`flex flex-col items-center p-2 transition-colors duration-200 ${
            location.pathname === '/' 
              ? 'text-[#0066CC]' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <HomeIcon className="h-6 w-6" strokeWidth={1.5} />
          <span className="text-xs mt-1 font-medium">Home</span>
        </Link>
        <Link 
          to="/itinerary" 
          className={`flex flex-col items-center p-2 transition-colors duration-200 ${
            location.pathname === '/itinerary' 
              ? 'text-[#0066CC]' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <CalendarIcon className="h-6 w-6" strokeWidth={1.5} />
          <span className="text-xs mt-1 font-medium">Itinerary</span>
        </Link>
        <Link 
          to="/budget" 
          className={`flex flex-col items-center p-2 transition-colors duration-200 ${
            location.pathname === '/budget' 
              ? 'text-[#0066CC]' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <WalletIcon className="h-6 w-6" strokeWidth={1.5} />
          <span className="text-xs mt-1 font-medium">Budget</span>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;