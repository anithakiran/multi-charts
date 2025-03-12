"use client";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-gray-800 text-white">
      {/* Logo */}
      <div className="text-xl font-semibold">My Portfolio</div>

      {/* Search Bar */}
      <div className="flex-grow mx-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full bg-gray-700 text-gray-200 px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zm-5.293 8.707a1 1 0 011.414-1.414L6 11.414A6 6 0 1111.414 6l-.707-.707a1 1 0 111.414-1.414l1.414 1.414a8 8 0 10-9.9 9.9l-1.414 1.414a1 1 0 01-1.414-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <button className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
