import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">CEPA</div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded">Home</a>
          <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded">About</a>
          <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded">Services</a>
          <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded">Contact</a>
        </div>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;