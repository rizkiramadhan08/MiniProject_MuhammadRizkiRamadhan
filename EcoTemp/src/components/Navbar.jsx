import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-2xl font-bold">EcoTemp</Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/FeedBack" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Umpan Balik
            </Link>
            <Link to="/admin" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-green-600 inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-green-500 focus:outline-none focus:bg-green-500 focus:text-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>
          <Link to="/FeedBack" className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Umpan Balik
          </Link>
          <Link to="/admin" className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;