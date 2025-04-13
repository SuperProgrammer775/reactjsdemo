import React from 'react';

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <svg
            className="w-10 h-10 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <h1 className="text-3xl font-bold">ReactJS ECommerce</h1>
        </div>

        {/* Navigation Section */}
        <nav className="space-x-6 hidden md:flex">
          <a href="#home" className="hover:text-indigo-200 transition-colors duration-200">Home</a>
          <a href="#shop" className="hover:text-indigo-200 transition-colors duration-200">Shop</a>
          <a href="#about" className="hover:text-indigo-200 transition-colors duration-200">About</a>
          <a href="#contact" className="hover:text-indigo-200 transition-colors duration-200">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white"
            onClick={() => alert('Mobile menu opened')}
          >
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
